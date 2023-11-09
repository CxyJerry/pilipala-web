<script>
import {delete_role, permissions, roles, save_role} from "@/api/permission";
import PButton from "@/components/p-button.vue";
import {Input} from "view-ui-plus";
import {format_date} from "@/utils/unit";

export default {
  name: "role",
  components: {Input, PButton},
  data() {
    return {
      role_list: [],
      permission_list: [],
      selected_permission_list: [],
      columns: [
        {
          title: 'Name',
          key: 'name'
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
        id: '',
        name: '',
        val: ''
      }
    }
  },
  methods: {
    format_date,
    get_roles() {
      roles()
          .then(res => {
            this.role_list = res.data
          })
    },
    get_permissions() {
      permissions()
          .then(res => {
            let transfer_data = []
            for (let p of res.data) {
              transfer_data.push({
                key: p.id,
                label: p.name,
                description: p.val,
                disabled: false
              })
            }
            this.permission_list = transfer_data
          })
    },
    render(item) {
      return item.label
    },
    handle_change(new_target_keys, direction, move_keys) {
      this.selected_permission_list = new_target_keys
      console.log(this.selected_permission_list)
    },
    create_role() {
      save_role(this.modal.id, this.modal.name, this.selected_permission_list)
          .then(res => {
            this.role_list.push(res.data)
            this.cancel()
          })
    },
    cancel() {
      this.modal = {
        show: false,
        id: '',
        name: '',
        val: ''
      }
    },
    delete_role(row) {
      delete_role(row.id).then(res => {
        this.role_list = this.role_list.filter(e => e.id !== row.id)
      })
    }
  },
  mounted() {
    this.get_roles()
    this.get_permissions()
  }
}
</script>

<template>
  <div class="permission-container">
    <div style="padding: 10px;width: 200px">
      <p-button type="primary" @click="modal.show = true">
        <template v-slot:content>
          创建新角色
        </template>
      </p-button>
    </div>
    <Modal
        v-model="modal.show"
        title="创建新角色"
        ok-text="创建"
        @on-ok="create_role"
        @on-cancel="cancel">
      <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
        <div style="padding: 10px;width: 100%">
          <Input disabled v-model="modal.id" placeholder="角色ID" v-if="modal.id"/>
        </div>
        <div style="padding: 10px;width: 100%">
          <Input v-model="modal.name" placeholder="请输入角色名"/>
        </div>
        <div style="padding: 10px;width: 100%">
          <Transfer
              :data="permission_list"
              :target-keys="selected_permission_list"
              :render-format="render"
              @on-change="handle_change"></Transfer>
        </div>
      </div>
    </Modal>
    <Table :columns="columns" :data="role_list">
      <template #time="{row,index}">
        {{ format_date(row.ctime) }}
      </template>
      <template #action="{ row, index }">
        <Button type="error" size="small" @click="delete_role(row)">Delete</Button>
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