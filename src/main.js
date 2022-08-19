import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMeta from "vue-meta";
import VScrollLock from "v-scroll-lock";
import millify from "millify";

Vue.config.productionTip = false

Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})
Vue.use(VScrollLock)

const VueTruncate = require('vue-truncate-filter')
Vue.use(VueTruncate)

import FlagIcon from 'vue-flag-icon'
Vue.use(FlagIcon);

Vue.filter("idLink", function (fullId) {
    if (!fullId) return
    const shortId = fullId.replace("https://openalex.org/", "")
    const shortIdFirstLetter = shortId.substr(0, 1).toUpperCase()
    const entityTypes = {
        "W": "works",
        "I": "institutions",
        "V": "venues",
        "A": "authors",
        "C": "concepts",
    };
    const myEntityType = entityTypes[shortIdFirstLetter]
    return `/${myEntityType}/${shortId}`
})
Vue.filter("idApiUrl", function (fullId) {
    if (!fullId) return
    const shortId = fullId.replace("https://openalex.org/", "")
    return `https://api.openalex.org/${shortId}`
})
Vue.filter("millify", function (number) {
    return millify(
        number,
        {
            precision: 0,
        }
    )
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
