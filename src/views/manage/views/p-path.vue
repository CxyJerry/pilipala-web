<script>
import {delete_path, permissions, paths, save_path} from "@/api/permission";
import PButton from "@/components/p-button.vue";
import {Input} from "view-ui-plus";
import {format_date} from "@/utils/unit";

export default {
  name: "path",
  components: {Input, PButton},
  data() {
    return {
      path_list: [],
      permission_list: [],
      selected_permission_list: [],
      columns: [
        {
          title: 'Path',
          key: 'path'
        },
        {
          title: 'Permission',
          key: 'permissionName'
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
        path: '',
        permission_id: ''
      }
    }
  },
  methods: {
    format_date,
    get_paths() {
      paths()
          .then(res => {
            this.path_list = res.data
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
    create_path() {
      save_path(this.modal.path, this.modal.permission_id)
          .then(res => {
            this.path_list.push(res.data)
            this.cancel()
          })
    },
    cancel() {
      this.modal = {
        show: false,
        id: '',
        path: '',
        permission_id: ''
      }
    },
    delete_path(row) {
      delete_path(row.id).then(res => {
        this.path_list = this.path_list.filter(e => e.id !== row.id)
      })
    }
  },
  mounted() {
    this.get_paths()
    this.get_permissions()
  }
}
</script>

<template>
  <div class="permission-container">
    <div style="padding: 10px;width: 200px">
      <p-button type="primary" @click="modal.show = true">
        <template v-slot:content>
          创建新路径
        </template>
      </p-button>
    </div>
    <Modal
        v-model="modal.show"
        title="创建新路径"
        ok-text="创建"
        @on-ok="create_path"
        @on-cancel="cancel">
      <div style="display: flex;align-items: center;justify-content: center;flex-direction: column">
        <div style="padding: 10px;width: 100%">
          <Input v-model="modal.path" placeholder="请输入路径"/>
        </div>
        <div style="padding: 10px;width: 100%;display: flex;align-items: center">
          <span style="padding-right: 10px;padding-top: 10px;padding-bottom: 10px">
            权限绑定
          </span>
          <div style="flex: 1">
            <Select v-model="modal.permission_id">
              <Option v-for="item in permission_list" :value="item.key" :key="item.id">{{ item.label }}</Option>
            </Select>
          </div>


        </div>
      </div>
    </Modal>
    <Table :columns="columns" :data="path_list">
      <template #time="{row,index}">
        {{ format_date(row.ctime) }}
      </template>
      <template #action="{ row, index }">
        <Button type="error" size="small" @click="delete_path(row)">Delete</Button>
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