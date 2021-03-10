<template>
  <div id="app">
    <div>
      <p>远程搜索</p>
      <MultipleSearchInput v-model="firstVal" :list="asyncList" @fetch-data="fetchData" @get-option="getCurOptiton"></MultipleSearchInput>
      <p>已选值： {{firstVal}}, list: {{asyncList}}</p>
    </div>
    <div>
      <p>远程搜索，原本已选值</p>
      <MultipleSearchInput v-model="alreadyVal" :list="asyncList" :options="optitonList" @fetch-data="fetchData"></MultipleSearchInput>
      <p>已选值： {{alreadyVal}}, list: {{asyncList}}</p>
    </div>
    <div>
      <p>远程搜索，可以自由写值，不一定从下拉选择</p>
      <MultipleSearchInput v-model="thirdVal" :list="asyncList" canFreeText @fetch-data="fetchData"></MultipleSearchInput>
      <p>已选值： {{thirdVal}}, list: {{asyncList}}</p>
    </div>
    <div>
      <p>远程拿value默认值，本地搜索</p>
       <MultipleSearchInput v-model="forthVal" :list="asyncDefaultValue"></MultipleSearchInput>
      <p>已选值： {{forthVal}}, list: {{asyncDefaultValue}}</p>
    </div>
    <div>
      <p>远程拿value默认值，远程后拿到值本地搜索</p>
       <MultipleSearchInput v-model="fifthVal" :list="asyncDefaultValue"></MultipleSearchInput>
       <p>已选值： {{fifthVal}}, list: {{asyncDefaultValue}}</p>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import MultipleSearchInput, { SelectOption } from './lib/multiple-search-input.vue'
@Component({
  components: {
    MultipleSearchInput
  }
})
export default class App extends Vue {
  firstVal = []
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
  asyncDefaultValue: SelectOption<string>[] = []
  thirdVal: string[] = []
  forthVal: string[] = []
  fifthVal: string[] = []

  created() {
  setTimeout(() => {
     this.fifthVal = ['a']
    }, 1000)
    setTimeout(() => {
      this.asyncDefaultValue = [...this.list]
    }, 1000)
  }

  getCurOptiton(optiton: SelectOption<string>[]){
    this.curOptiton = optiton
  }

  fetchData(val: string) {
    setTimeout(() => {
      console.log(val)
      this.asyncList = this.list.filter(el => el.text.includes(val))
    }, 1000)
  }

}
</script>


