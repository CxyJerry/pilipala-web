<script>
import {apply_page, delete_role, permissions, role_grant, roles, save_role} from "@/api/permission";
import PButton from "@/components/p-button.vue";
import {Button, Input, Option, Select} from "view-ui-plus";
import {format_date} from "@/utils/unit";
import {user_page} from "@/api/user";


export default {
  name: "apply",
  components: {Option, Select, Button, Input, PButton},
  data() {
    return {
      page: {
        no: 1,
        size: 36,
        total: 10,
        status: '等待处理中',
        data: []
      },
      roles: [],
      review_columns: [
        {
          title: "Applicant",
          key: "applicant",
          slot: "applicant"
        },
        {
          title: 'Action',
          key: 'action',
          slot: 'action'
        },
      ],
      review_modal: {
        show: false,
        apply: null,
        role_id: ''
      },
      display_columns: [
        {
          title: "Applicant",
          key: "applicant",
          slot: "applicant"
        },

        {
          title: 'Processor',
          key: 'processor',
          slot: "processor"
        },
        {
          title: 'Status',
          key: 'status',
        },
        {
          title: 'action',
          key: 'action',
          slot: 'action'
        },
      ],
      status_options: [
        {
          value: '等待处理中',
          label: '等待中'
        }, {
          value: '已处理',
          label: '已处理'
        }
      ],
      role_list: []
    }
  },
  methods: {
    format_date,
    get_applys() {
      apply_page(this.page.no, this.page.size, this.page.status)
          .then(res => {
            this.page.total = res.data.total
            this.page.data = res.data.page
          })
    },
    render(item) {
      return item.label
    },
    change_status(name) {
      this.page = {
        no: 1,
        size: 36,
        total: 10,
        status: name,
        data: []
      }
      this.get_applys()
    },
    change_page_no(no) {
      this.page.no = no
      this.get_applys()
    },
    get_roles() {
      roles()
          .then(res => {
            this.role_list = res.data
          })
    },
    open_review_modal(row) {
      this.review_modal.show = true
      this.review_modal.apply = row
    },
    submit_review() {
      console.log('submit')
      role_grant(this.review_modal.apply.id, this.review_modal.apply.applicant.uid, this.review_modal.role_id)
          .then(res => {
            this.$Message.success('审批完成')
            this.cancel_review()
            this.get_applys()
          })

    },
    cancel_review() {
      this.review_modal = {
        show: false,
        apply: null,
        role_id: ''
      }
    }
  },
  mounted() {
    this.get_applys()
    this.get_roles()
  }
}
</script>

<template>
  <div class="permission-container">
    <Select v-model="page.status" style="width:200px" @on-change="change_status">
      <Option v-for="item in status_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Table :columns="page.status==='等待处理中'?review_columns:display_columns" :data="page.data">
      <template #applicant="{ row, index }">
        <span>{{ row.applicant.nickName }}</span>
      </template>
      <template #processor="{ row, index }">
        <span>{{ row.processor.nickName }}</span>
      </template>
      <template #role="{ row, index }">
        <span>{{ row.processor.nickName }}</span>
      </template>

      <template #action="{row,idx}">
        <Button type="primary" @click="open_review_modal(row)">审批</Button>
      </template>
    </Table>
    <Page :total="page.total" @on-prev="change_page_no" @on-next="change_page_no" show-total/>

    <Modal
        v-model="review_modal.show"
        @on-ok="submit_review"
        @on-cancel="cancel_review"
        title="审批权限">
      <div style="padding: 10px">
        <Input disabled
               v-model="review_modal.apply.applicant.nickName"></Input>
      </div>
      <div style="padding: 10px">
        <Select v-model="review_modal.role_id">
          <Option v-for="role in role_list" :value="role.id" :label="role.name"></Option>
        </Select>
      </div>

    </Modal>
  </div>

</template>

<style scoped lang="less">
.permission-container {
  height: 100%;
  width: 100%;
  background: white;
  justify-content: start;
  display: flex;
  flex-direction: column
}
</style>