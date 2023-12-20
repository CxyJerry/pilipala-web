<script>
import {delete_template, save_template, templates} from "@/api/msg";
import {Button} from "view-ui-plus";
import Editor from "@tinymce/tinymce-vue";

export default {
  name: "message-template",
  components: {Editor, Button},
  methods: {
    request_templates() {
      templates().then(res => {
        this.template_list = res.data
      })
    },
    create() {
      this.modal = {
        show: true,
        edit_template: {
          name: '',
          content: '',
        },
        edit: false
      }
    },
    edit(t) {
      this.modal.edit_template = t
      this.modal.edit = true
      this.modal.show = true
    },
    cancel_edit() {
      this.modal = {
        show: false,
        edit_template: {
          name: '',
          content: ''
        },
        edit: false
      }
    },
    submit() {
      save_template(this.modal.edit_template.name, this.modal.edit_template.content)
          .then(res => {
            this.cancel_edit()
            this.request_templates()
          })
    },
    _delete(t) {
      delete_template(t.name)
      this.request_templates()
    },
  },
  data() {
    return {
      template_list: [],
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Template',
          slot: 'tpl'
        },
        {
          title: 'AuthorId',
          key: 'authorId'
        },
        {
          title: 'Time',
          key: 'ctime'
        },
        {
          title: 'Action',
          slot: 'action'
        }
      ],
      modal: {
        show: false,
        edit_template: {
          name: '',
          content: ''
        },
      },
      editor: {
        api_key: '2mqqfzeeczt390m2uvqt6ax3y6vanw6ubj0uof58rn8ttrvo',
        init: {
          menubar: false,
          plugins: 'lists link image emoticons code',
          toolbar: 'code | forecolor | backcolor | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image emoticons',
        }
      }
    }

  },
  mounted() {
    this.request_templates()
  }

}
</script>

<template>
  <div style="height: 100%;width: 100%">
    <Button type="primary" @click="create">新增模板</Button>
    <Table :columns="columns" :data="template_list">
      <template #tpl="{ row }">
        <div v-html="row.content"></div>
      </template>
      <template #action="{ row, index }">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row)">编辑</Button>
        <Button type="error" size="small" style="margin-right: 5px" @click="_delete(row)">删除</Button>
      </template>
    </Table>
  </div>
  <Modal
      v-model="modal.show"
      title="编辑模板"
      width="50%"
      @on-ok="submit"
      @on-cancel="cancel_edit">
    <Input v-model="modal.edit_template.name" :disabled="modal.edit" placeholder="模板名"/>
    <div style="width: 100%">
      <div class="tinymce-box">
        <editor
            v-model="modal.edit_template.content"
            :api-key="editor.api_key"
            :init="editor.init"
        />
      </div>
    </div>
  </Modal>
</template>

<style scoped lang="less">

</style>