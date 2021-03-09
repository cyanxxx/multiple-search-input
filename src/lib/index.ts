import MultipleSearchInput from './multiple-search-input.vue';
export type { SelectOption } from './multiple-search-input.vue';
import vue from 'vue'
const multipleSearchInputPlugin = {
    install(Vue: typeof vue) {
        Vue.component(MultipleSearchInput.name, MultipleSearchInput) 
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(multipleSearchInputPlugin);
}
export {MultipleSearchInput, multipleSearchInputPlugin}