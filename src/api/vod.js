import Api from "@/api/net";

function pre_upload(mediainfo) {
    let media = {}
    for (let t of mediainfo.media.track) {
        media[t['@type']] = t
    }
    let data = {
        container: {
            duration: media['General']['Duration'],
            fileSize: media['General']['FileSize'],
            format: media['General']['Format'],
            formatProfile: media['General']['Format_Profile'],
            frameCount: media['General']['FrameCount'],
            frameRate: media['General']['FrameRate'],
            overAllBitRate: media['General']['OverallBitRate']
        },
        video: {
            bitDepth: media['Video']['BitDepth'],
            bitRate: media['Video']['BitRate'],
            colorSpace: media['Video']['ColorSpace'],
            codecId: media['Video']['CodecID'],
            displayAspectRatio: media['Video']['DisplayAspectRatio'],
            duration: media['Video']['Duration'],
            format: media['Video']['Format'],
            formatProfile: media['Video']['Format_Profile'],
            frameCount: media['Video']['FormatCount'],
            frameRate: media['Video']['FrameRate'],
            frameRateMode: media['Video']['FrameRate_Mode'],
            height: media['Video']['Height'],
            width: media['Video']['Width'],
            pixelAspectRatio: media['Video']['PixelAspectRatio'],
            rotation: media['Video']['Rotation'],
            scanType: media['Video']['ScanType'],
            colourPrimaries: media['Video']['colour_primaries'],
            transfer_characteristics: media['Video']['transfer_characteristics'],
        },
        audio: {
            bitRate: media['Audio']['BitRate'],
            bitRateMode: media['Audio']['BitRate_Mode'],
            channelLayout: media['Audio']['ChannelLayout'],
            channelPositions: media['Audio']['ChannelPositions'],
            channels: media['Audio']['Channels'],
            codecId: media['Audio']['CodecID'],
            compressionMode: media['Audio']['Compression_Mode'],
            duration: media['Audio']['Duration'],
            format: media['Audio']['Format'],
            formatAdditionalFeatures: media['Audio']['Format_AdditionalFeatures'],
            frameCount: media['Audio']['FrameCount'],
            samplesPerFrame: media['Audio']['SamplesPerFrame'],
            samplingCount: media['Audio']['SamplingCount'],
            samplingRate: media['Audio']['SamplingRate'],
        }
    }
    return new Promise((resolve, reject) => {
        Api.post('/vod/pre-upload', data)
            .then(res => {
                console.log(res)
                resolve(res)
            }).catch(err => {
            reject(err)
        })
    })
}

function upload(cid, file, on_upload_callback) {
    let form = new FormData()
    form.append('video', file)
    form.append('cid', cid)
    return Api.post('/file/upload', form, {
        onUploadProgress: e => {
            console.log('enter progress event')
            on_upload_callback(e)
        }
    });
}

function upload_cover(cover) {
    let form = new FormData()
    form.append('cover', cover, "cover.png")
    return Api.post('/file/upload-cover', form)
}

function post_vod(bvid, cid, form_data) {
    let data = {
        bvId: bvid,
        cid: cid,
        coverUrl: form_data.cover_url,
        title: form_data.title,
        gcType: form_data.gc_type,
        partition: form_data.partition,
        subPartition: form_data.sub_partition,
        labels: form_data.labels,
        desc: form_data.desc
    }
    return Api.post('/vod/post', data)
}

function content_page(page_no, page_size, type, uid) {
    return Api.get('/vod/content/page', {
        params: {
            uid: uid,
            page_no: page_no,
            page_size: page_size,
            status: type
        }
    })
}

function review_page(page_no, page_size, type, uid) {
    return Api.get('/vod/review/page', {
        params: {
            page_no: page_no,
            page_size: page_size,
            status: type
        }
    })
}

function get_video(bvid) {
    return Api.get('vod/vod/' + bvid)
}

function time_update(bvid, cid, time) {
    return Api.put(`/vod/time/${bvid}/${cid}?time=${time}`)
}

function play_count_submit(bvid) {
    return Api.put('/vod/vod/play/' + bvid)
}

function thumbnails(cid) {
    return Api.get(`/vod/thumbnails/${cid}`)
}

function interactive(action, cid) {
    return Api.put(`/vod/vod/interactive/put/${action}`, {}, {
        params: {
            cid: cid
        }
    })
}

function interactive_info(cid) {
    return Api.get(`/vod/vod/interaction/info/${cid}`)
}

function sd_video(cid) {
    return Api.get(`/vod/vod/sd/${cid}`)
}

function review(cid, status) {
    return Api.put("/vod/content/review", {}, {
        params: {
            cid: cid,
            status: status
        }
    })
}

export {
    pre_upload,
    upload,
    upload_cover,
    post_vod,
    content_page,
    review_page,
    get_video,
    time_update,
    play_count_submit,
    thumbnails,
    interactive,
    interactive_info,
    sd_video,
    review
}