import MultipleSearchInput from './multiple-search-input.vue';
export { SelectOption } from './multiple-search-input.vue';
const multipleSearchInputPlugin = {
    install(Vue) {
        Vue.component(MultipleSearchInput.name, MultipleSearchInput) 
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(multipleSearchInputPlugin);
}
export {MultipleSearchInput, multipleSearchInputPlugin}