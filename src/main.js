import { createApp } from 'vue';
import store from './store/index.js';

import router from './router.js';
import App from './App.vue';
import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
import PrintLink from './components/Printing/PrintLink.vue';
import BucketItem from './components/BucketList/BucketItem.vue';

const app = createApp(App);

app.use(store);

app.use(router);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('print-link', PrintLink);
app.component('bucket-item', BucketItem);

app.mount('#app');
