<template>
  <multiple-search-input
    :list="list"
    infinite
    :busy="listConfig.busy"
    v-bind="$attrs"
    v-on="$listeners"
    @fetch-data="fetchData"
    @fetch-more-data="fetchMoreData"
  ></multiple-search-input>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'MultipleAsyncInput',
})
export default class MultipleAsyncInput extends Vue {
   @Prop({type: Function}) fetchList!: ((searchName: string, pageNum: number, perPage: number) => Promise<{ list: []; total: number; pageNum: number}>)
   @Prop({type: Object}) config!: {
      page: number;
      total: number;
      perPage: number;
      busy: boolean;
      loadedAll: boolean;
   }

   list: { text: string; value: string }[] = [];
   listConfig = {
    page: 1,
    total: 0,
    perPage: 10,
    busy: false,
    loadedAll: false,
  }
  
   async fetchData(searchName: string){
    console.log('fetch')
    this.listConfig.page = 1
	  const { list, total } = await this.fetchList(searchName, this.listConfig.page, this.listConfig.perPage) || {list: []}
    this.list = list
    this.listConfig.total = total || 0
    this.listConfig.loadedAll = total === this.list.length
  }

 async fetchMoreData(searchName: string){
    if(!this.listConfig.loadedAll) {
      console.log('fetched more')
      this.listConfig.busy = true
      const { list, total, pageNum } = await this.fetchList(searchName, this.listConfig.page +1, this.listConfig.perPage) || {list: []}
      const preList = [...this.list]
      this.listConfig.page = pageNum || 1
      this.listConfig.total = total || 0
      this.list = preList.concat(list)
      this.listConfig.busy = false
      this.listConfig.loadedAll = total === this.list.length
    }
  }
}
</script>