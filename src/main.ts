import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus'

import "uno.css";
const app = createApp(App);
app.use(ElementPlus);
app.use(router);


router.isReady().then(() => {
  app.mount('#app');
});
