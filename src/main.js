import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import {store} from "@/store";
import VueCropper from 'vue-cropper'

const app = createApp(App)
app.use(router)
app.use(ViewUIPlus)
app.use(store)
app.use(VueCropper)

app.config.errorHandler = (err, vm, info) => {
    console.log('====== 有报错了兄弟!!! ======');
    if (err instanceof Error) {
        console.log('❌ 提示:', err);
    }
}
app.mount('#app')
