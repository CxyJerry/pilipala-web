<script>
import {delete_role, permissions, roles, save_role} from "@/api/permission";
import PButton from "@/components/p-button.vue";
import {Input} from "view-ui-plus";
import {format_date} from "@/utils/unit";
import {user_page} from "@/api/user";

export default {
  name: "user",
  components: {Input, PButton},
  data() {
    return {
      page: {
        no: 1,
        size: 36,
        total: 10,
        data: []
      },
      columns: [

        {
          title: "Avatar",
          key: "avatar",
          slot: "avatar"
        },
        {
          title: 'Nickname',
          key: 'nickName'
        },
        {
          title: 'FansCount',
          key: 'fansCount'
        },
        {
          title: 'FollowCount',
          key: 'followCount'
        },
        {
          title: 'Intro',
          key: 'intro'
        },
      ],
    }
  },
  methods: {
    format_date,
    get_users() {
      user_page(this.page.no, this.page.size)
          .then(res => {
            this.page.total = res.data.total
            this.page.data = res.data.page
          })
    },
    render(item) {
      return item.label
    },
  },
  mounted() {
    this.get_users()
  }
}
</script>

<template>
  <div class="permission-container">
    <Table :columns="columns" :data="page.data">
      <template #avatar="{ row, index }">
        <div style="display: flex;align-items: center">
          <div
              style="width: 50px;height: 50px;border-radius: 50%;display: flex;align-items: center;justify-content: center">
            <img :src="row.avatar" alt="" v-if="row.avatar">
            <div
                style="display: flex;justify-content: center;align-items: center;background-color: white;border-radius: 9999px"
                v-else>
              <svg t="1698170965279" class="icon" viewBox="0 0 1034 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3884" width="38" height="38">
                <path
                    d="M977.92 512.47616C977.92 766.68416 771.59936 972.8 517.0688 972.8 262.57408 972.8 56.32 766.68416 56.32 512.47616c0-195.1232 121.46176-361.8304 292.99712-428.82048C401.14176 62.7456 457.76384 51.2 517.08416 51.2c59.392 0 115.96288 11.53536 167.84384 32.45568C856.448 150.65088 977.92 317.35808 977.92 512.47616zM339.968 415.40096c0 77.57312 39.75168 144.73216 97.536 177.6128 23.9616 13.63456 50.944 21.49376 79.5648 21.49376 27.62752 0 53.66784-7.35232 77.0048-20.06016 59.14624-32.24576 100.17792-100.22912 100.17792-179.03616 0-109.7216-79.4624-199.03488-177.1776-199.03488-97.65376-0.01024-177.1008 89.29792-177.1008 199.01952z m178.97472 527.56992c134.62528 0 254.72-61.90592 333.43488-158.7968-9.29792-76.42624-83.77344-141.48608-189.184-173.93664-39.808 35.80928-90.67008 57.35424-146.13504 57.35424-56.69376 0-108.5952-22.7072-148.79232-60.07296-102.53312 29.2608-177.63328 88.94976-195.24608 160.47104 78.11072 106.10688 204.0064 174.98112 345.92256 174.98112z"
                    fill="#bfbfbf" p-id="3885"></path>
              </svg>
            </div>
          </div>
        </div>


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