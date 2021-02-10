<template>
  <div id="app">
      <MultipleSearchInput :list=[]></MultipleSearchInput>
  </div>
</template>
<script lang='ts'>
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import MultipleSearchInput from './components/multiple-search-input.vue'
@Component({
  components: {
    MultipleSearchInput
  }
})
export default class App extends Vue {

}
</script>


