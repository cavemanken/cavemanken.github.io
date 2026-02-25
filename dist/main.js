import { createApp } from 'vue';

import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseDialog from './components/UI/BaseDialog.vue';
import LinkItem from './components/UI/LinkItem.vue';
import LinkMenu from './components/UI/LinkMenu.vue';
import MainMenu from './components/MainMenu.vue';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('link-item', LinkItem);
app.component('link-menu', LinkMenu);
app.component('main-menu', MainMenu);
app.component('base-button', BaseButton);
app.component('base-dialog', BaseDialog);
app.mount('#app');
