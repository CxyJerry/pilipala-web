<script>
import {create_permission, delete_permission, permissions} from "@/api/permission";
import PButton from "@/components/p-button.vue";
import {Input} from "view-ui-plus";
import {format_date} from "../../../utils/unit";

export default {
  name: "permission",
  components: {Input, PButton},
  data() {
    return {
      permission_list: [],
      columns: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Value',
          key: 'value'
        },
        {
          title: 'Time',
          key: 'ctime',
          slot: 'time'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      modal: {
        show: false,
        name: '',
        val: ''
      }
    }
  },
  methods: {
    format_date,
    get_permissions() {
      permissions()
          .then(res => {
            this.permission_list = res.data
            console.log(this.permission_list)
          })
    },
    create_permission() {
      create_permission(this.modal.name, this.modal.val)
          .then(res => {
            this.cancel()
            this.get_permissions()
          })
    },
    cancel() {
      this.modal = {
        show: false,
        name: '',
        val: ''
      }
    },
    delete_permission(row) {
      delete_permission(row.id).then(res => {
        this.permission_list = this.permission_list.filter(p => p.id !== row.id)
      })
    }
  },
  mounted() {
    this.get_permissions()
  }
}
</script>

<template>
  <div class="permission-container">
    <div style="padding: 10px;width: 200px">
      <p-button type="primary" @click="modal.show = true">
        <template v-slot:content>
          创建新权限
        </template>
      </p-button>
    </div>

    <Modal
        v-model="modal.show"
        title="创建新权限"
        ok-text="创建"
        @on-ok="create_permission"
        @on-cancel="cancel">
      <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
        <div style="padding: 10px;width: 100%">
          <Input v-model="modal.name" placeholder="请输入权限名"/>
        </div>
        <div style="padding: 10px;width: 100%">
          <Input v-model="modal.val" placeholder="请输入权限值"/>
        </div>


      </div>
    </Modal>
    <Table :columns="columns" :data="permission_list">
      <template #time="{row,index}">
        {{ format_date(row.ctime) }}
      </template>
      <template #action="{ row, index }">
        <Button type="error" size="small" @click="delete_permission(row)">Delete</Button>
      </template>
    </Table>
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