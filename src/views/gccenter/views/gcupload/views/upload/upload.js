import mediainfo from "mediainfo.js";
import {post_vod, pre_upload, upload} from "@/api/vod";
import Tabs from "@/views/gccenter/views/components/tabs.vue";
import {convert_to_file_unit} from "@/utils/unit";
import Label_input from "@/views/gccenter/views/components/label_input.vue";
import Textarea_input from "@/views/gccenter/views/components/textarea_input.vue";
import {Form, Modal} from "view-ui-plus";
import TreeSelector from "@/components/tree-selector.vue";
import {partitions} from "@/api/recommend";
import PCoverUpload from "@/views/gccenter/views/gcupload/views/upload/components/p-cover-upload.vue";

export default {
    components: {PCoverUpload, Modal, TreeSelector, Form, Textarea_input, Label_input, Tabs},
    data() {
        return {
            tabs: [
                {
                    name: '视频投稿',
                    path: '/gccenter/gcupload/upload'
                },
                {
                    name: '专栏投稿',
                    path: '/gccenter/gcupload/text'
                },
                {
                    name: '音频投稿',
                    path: '/gccenter/gcupload/#'
                },
            ],
            start_upload: false,
            file: null,
            upload_percent: 0,
            upload_status: 'completed',
            uploading_text: '上传中',
            origin_filename: '视频文件',
            cid: 0,
            bvid: '',
            form_data: {
                cover_url: '',
                title: '',
                gc_type: '自制',
                partition: '',
                sub_partition: '',
                labels: [],
                desc: ''
            },
            partition_tree: [],
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'jpeg', // 裁剪生成图片的格式
                canScale: false, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 672, // 默认生成截图框宽度
                autoCropHeight: 378, // 默认生成截图框高度
                fixedBox: true, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [4, 3], // 截图框的宽高比例
                full: true, // 是否输出原图比例的截图
                canMoveBox: false, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            show_cut: false,
            rules: {
                cover_url: [{required: true, message: '请上传视频封面', trigger: 'blur'}],
                title: [{required: true, message: '请填写合适的标题内容', trigger: 'blur'}],
                gc_type: [{required: true, message: '请选择一个生产类型', trigger: 'blur'}],
                partition: [{required: true, message: '请选择分区', trigger: 'blur'}],
            }
        }
    },
    methods: {
        before_auto_upload(file) {
            this.file = file
            this.upload()
            return false
        },
        partition_selected(item) {
            let parent_node = null
            for (let node of this.partition_tree) {
                for (let sub_node of node.children) {
                    if (sub_node.nodeKey === item.nodeKey) {
                        parent_node = node
                        break
                    }
                }
            }
            this.form_data.partition = parent_node.title
            this.form_data.sub_partition = item.title
        },
        request_partition() {
            this.partition_tree = []
            partitions().then(res => {
                let partitions = res.data
                console.log(partitions)
                for (let p in partitions) {
                    let children = []
                    for (let sub of partitions[p]) {
                        children.push({
                            title: sub.subPartition,
                            expand: false,
                            value: sub.subPartition,
                            selected: false,
                            checked: false,
                        })

                    }
                    this.partition_tree.push({
                        title: p,
                        expand: false,
                        value: p,
                        selected: false,
                        checked: false,
                        children: children
                    })
                }
            })
        },
        upload() {
            this.upload_status = 'uploading'
            let file = this.file
            this.uploading_text = `上传中，文件大小：${convert_to_file_unit(file)}`
            let that = this
            this.origin_filename = file.name
            const getSize = () => file.size
            const readChunk = (chunkSize, offset) =>
                new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    reader.onload = (event) => {
                        if (event.target.error) {
                            reject(event.target.error)
                        }
                        resolve(new Uint8Array(event.target.result))
                    }
                    reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
                })
            mediainfo().then(mediainfo => {
                mediainfo.analyzeData(getSize, readChunk)
                    .then(res => {
                        pre_upload(res).then(res => {
                            this.cid = res.data.cid
                            this.bvid = res.data.bvId
                            that.change_start_upload(true)
                            let on_upload_callback = e => {
                                let percent = (e.loaded / e.total) * 100
                                this.upload_percent = percent + '%'
                            }
                            upload(this.cid, file, on_upload_callback).then(res => {
                                this.upload_status = 'completed'
                            })
                        })
                    })
            }).catch(err => {
                this.upload_status = 'fail'
                console.log(err)
            })
        },
        change_start_upload(value) {
            this.start_upload = value
            this.$emit('upload-status-change', value)
        },
        refresh_file() {
            let input = document.createElement('input')
            input.type = 'file'
            input.accept = 'video/*'
            input.onchange = event => {
                this.file = event.target.files[0]
                this.upload()
            }
            input.click()
        },
        post() {
            this.$refs['post-form'].validate(valid => {
                if (!this.cid) {
                    this.$Message.error('请先上传视频')
                    return;
                }
                console.log(this.form_data)
                if (valid) {
                    if (this.form_data.labels.length <= 0) {
                        this.$Message.error('请填写视频标签')
                        return
                    }
                    post_vod(this.bvid, this.cid, this.form_data).then(res => {
                        this.$Message.success('投稿完成')
                        this.$router.replace('/gccenter/cmanager')
                    })

                } else {
                    this.$Message.error('请按要求填写表单')
                }
            })

        }
    }
    ,
    created() {
        this.request_partition()
    }
}