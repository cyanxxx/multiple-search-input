import MultipleSearchInput from './multiple-search-input.vue'
const multipleSearchInput = {
    install(Vue) {
        Vue.component(MultipleSearchInput.name, MultipleSearchInput) 
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(multipleSearchInput);
}
export default MultipleSearchInput