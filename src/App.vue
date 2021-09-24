<template>
  <div id="app" style="padding: 10px">
    <div>
      <p>远程搜索, 取决于输入的字符，去服务器拿匹配数据</p>
      <MultipleSearchInput v-model="firstVal" :list="asyncList" :isLoading="isLoading" @fetch-data="fetchData" @get-option="getCurOptiton"></MultipleSearchInput>
      <p>已选值： {{firstVal}}, list: {{asyncList}}</p>
     
    </div>
    <div>
      <p>远程搜索，原本已选值，有初定数据和服务器拿取的数据</p>
      <MultipleSearchInput v-model="alreadyVal" :list="asyncList" :options="optitonList" @fetch-data="fetchData"></MultipleSearchInput>
      <p>已选值： {{alreadyVal}}, list: {{asyncList}}, option: {{optitonList}} </p>
    </div>
    <div>
      <p>远程搜索，可以自由写值，不一定从下拉选择, 没有初定数据</p>
      <MultipleSearchInput v-model="thirdVal" :list="asyncList" canFreeText @fetch-data="fetchData"></MultipleSearchInput>
      <p>已选值： {{thirdVal}}, list: {{asyncList}}</p>
    </div>
    <div>
      <p>远程拿value，下拉默认值（此时list，option功能一致），本地搜索</p>
       <MultipleSearchInput v-model="forthVal" :list="asyncDefaultValue"></MultipleSearchInput>
      <p>已选值： {{forthVal}}, list: {{asyncDefaultValue}}</p>
       <button @click="handleAdd">外部加值</button>
    </div>
    <div>
      <p>处理前缀后缀空白值， 会重新修改value的值</p>
       <MultipleSearchInput v-model="withTrimVal" :list="withTrimList" canFreeText></MultipleSearchInput>
      <p>已选值： {{withTrimVal}}, list: {{withTrimList}}</p>
    </div>
    <div>
      <p>value默认值，远程拿list到值本地搜索</p>
       <MultipleSearchInput v-model="fifthVal" :list="asyncDefaultValue"></MultipleSearchInput>
       <p>已选值： {{fifthVal}}, list: {{asyncDefaultValue}}</p>
    </div>
    <div>
      <p>没有选值，disabled状态</p>
       <MultipleSearchInput v-model="thirdVal" :list="list" disabled></MultipleSearchInput>
    </div>
    <div>
      <p>远程拿value默认值，翻页管理, 使用最好加多一层抽象，来集中管理pageNum，busy, loadedAll, total</p>
       <MultipleSearchInput v-model="longVal" :list="longList" infinite  :busy="busy" @fetch-data="fetchOtherData" @fetch-more-data="fetchMoreData"></MultipleSearchInput>
       <p>已选值： {{longVal}}, list: {{longList}}</p>
       <code>
         listConfig = {
            page: 1,
            total: 0,
            perPage: 10,
            busy: false,
            loadedAll: false
          }
          详细参照lib/multiple-async-input
       </code>
    </div>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import MultipleSearchInput, { SelectOption } from './lib/multiple-search-input.vue'
import {enableLogs} from './lib/index'
enableLogs(true)
@Component({
  components: {
    MultipleSearchInput
  }
})
export default class App extends Vue {
  firstVal = []
  curOptiton: SelectOption<string>[] = []
  isLoading = false
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
  longList: SelectOption<string>[] = []
  withTrimVal = [' a ']
  withTrimList = [' a ']
  asyncList: SelectOption<string>[] = []
  asyncDefaultValue: SelectOption<string>[] = []
  thirdVal: string[] = []
  forthVal: string[] = []
  fifthVal: string[] = ['a']
  longVal: string[] = []
  page = 1
  total = 200
  loadedAll = false
  busy = false

  created() {
  setTimeout(() => {
     this.forthVal = ['a']
    }, 1000)
    setTimeout(() => {
      this.asyncDefaultValue = [...this.list]
    }, 1000)
    for(let i = 0; i< 50;i++) {
      this.longList.push({
        text: "" + i,
        value: "" + i
      })
    }
  }

  getCurOptiton(optiton: SelectOption<string>[]){
    this.curOptiton = optiton
  }

  fetchData(val: string) {
    console.log('fetch', val)
    this.isLoading = true
    setTimeout(() => {
      console.log(val)
      this.asyncList = this.list.filter(el => el.text.includes(val))
       this.isLoading = false
    }, 5000)
  }

  fetchOtherData(val: string) {
    this.busy = true
     setTimeout(() => {
      this.longList = this.getFakeData(val)
      this.page = 1
      this.total = 100
      this.loadedAll = false
    }, 1000)
  }

  getFakeData(val: string) {
    let list = []
    for(let i = 0; i<50;i++) {
      list.push({
        text: i + val,
        value: i + val
      })
    }
    return list
  }

  fetchMoreData(val: string) {
    console.log('load')
    if(!this.loadedAll) {
      this.busy = true
      setTimeout(() => {
        const page = this.page
         for(let i = page * 50; i< page * 50 + 50; i++) {
          this.longList.push({
          text: val + i,
          value: val + i
          })
        }
        this.busy = false
        this.page ++
        this.loadedAll = this.page * 50 === this.total
      }, 1000)
    }
  }
  handleAdd(){
    this.forthVal.push('c')
  }
}
</script>


