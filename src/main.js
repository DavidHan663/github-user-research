import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');

// 注册 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/dist/sw.js')
      .then(registration => {
        console.log('Service Worker 注册成功:', registration);
      })
      .catch(error => {
        console.log('Service Worker 注册失败:', error);
      });
  });
}