<template>
  <div id="app">
      <MultipleSearchInput v-model="firstVal" :list="asyncList" @fetch-data="fetchData" @get-option="getCurOptiton"></MultipleSearchInput>
      <MultipleSearchInput v-model="alreadyVal" :list="asyncList" :options="optitonList" @fetch-data="fetchData"></MultipleSearchInput>
      <MultipleSearchInput v-model="thirdVal" :list="asyncList" canFreeText @fetch-data="fetchData"></MultipleSearchInput>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import MultipleSearchInput, { SelectOption } from './components/multiple-search-input.vue'
@Component({
  components: {
    MultipleSearchInput
  }
})
export default class App extends Vue {
  firstVal = ['']
  curOptiton: SelectOption<string>[] = []
  list = [
    {
      text:'Apple' , value: 'a'
    },
    {
      text:'Bear' , value: 'b'
    },
    {
      text:'Cat' , value: 'c'
    }
  ]

  alreadyVal = ['a', 'b']
  optitonList = [
    {
      text:'Apple' , value: 'a'
    },
    {
      text:'Bear' , value: 'b'
    },
  ]
  asyncList: SelectOption<string>[] = []
  thirdVal = []

  getCurOptiton(optiton: SelectOption<string>[]){
    this.curOptiton = optiton
  }

  fetchData(val: string) {
    setTimeout(() => {
      console.log(val)
      this.asyncList = this.list.filter(el => el.text.includes(val))
    }, 500)
  }  
}
</script>


