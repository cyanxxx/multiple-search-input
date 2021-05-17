import MultipleSearchInput from './multiple-search-input.vue';
export type { SelectOption } from './multiple-search-input.vue';
import vue from 'vue'
export { enableLogs } from './utils/logger'

import { FormTagsPlugin } from 'bootstrap-vue'
vue.use(FormTagsPlugin)

const multipleSearchInputPlugin = {
    install(Vue: typeof vue) {
        Vue.component('MultipleSearchInput', MultipleSearchInput) 
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(multipleSearchInputPlugin);
}
export {MultipleSearchInput, multipleSearchInputPlugin}