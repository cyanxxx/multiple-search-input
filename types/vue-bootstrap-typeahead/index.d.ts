declare module 'vue-bootstrap-typeahead' {
 import Vue from 'vue'
 class VueBootstrapTypeahead extends Vue {
   // Simple catch-all to allow any prop/type
   [key: string]: any
 }
 export default VueBootstrapTypeahead
}