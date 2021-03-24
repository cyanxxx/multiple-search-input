<template>
   <div :class="fieldClass" class="_field">
    <div :id="label" v-if="label" class="_label">
      {{ label }}
      <slot name="label-side"></slot>
    </div>
    <div class="_data">
      <b-form-tags
        :id="id"
        v-model="tags"
        class="multiple-input _tags"
        :input-id="label"
        :disabled="disabled"
        tag-class="text-wrap"
        v-bind="$attrs"
        add-on-change
        @focus.native="handleFocus"
      >
        <template
          v-slot="{ tags, addTag, disabled, removeTag }"
        >
          <ul v-if="tags.length > 0" class="b-form-tags-list list-inline d-inline-block mb-0" :style="`${oneText? 'width: 100%' : ''}`">
            <li v-for="tag in tags" :key="tag" class="list-inline-item" :style="`${oneText? 'width: 100%' : ''}`">
              <b-form-tag
                :title="tag"
                :disabled="disabled"
                variant="info"
                class="_tag"
                @remove="removeTagAndRemoveSelect(removeTag, tag)"
                >
                <slot :bind="tag">{{ tag }}</slot>
                </b-form-tag>
            </li>
          </ul>
         <search-input v-if="!reachLimit && !inputDisable" ref="input" v-model="newTag" :tags-id="id" :canFreeText="canFreeText" :disabled="reachLimit" class="d-inline-block" inputClass="border-0" :data="showList"  :serializer="item => item.text" v-bind="$attrs" :minMatchingChars="1" :maxMatches="100" :style="`width: ${oneText ? '100%' : 'auto'}`" @hit="handleHit(addTag, $event)"
           @stop-fetch="handleCancelFetch"/>
        </template>
      </b-form-tags>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import SearchInput from './search-input.vue'
import { debounce } from "lodash";
export interface SelectOption<T> {text: string; value: T}
@Component({
  name: 'MultipleSearchInput',
  components: {
    SearchInput
  },
  watch: {
    newTag: debounce(function fetchList(this: any, newVal: string, preVal: string) {
    if(!this.selectFromList && newVal !== preVal){
      this.$emit('fetch-data', newVal)
    }
  }, 500)
  }
})
export default class MultipleSearchInput<T> extends Vue {
  @Prop({ type: Number }) limit!: number;
  //  每次根据输入内容每次动态调整的下拉list
  @Prop({ type: Array }) list!: SelectOption<T>[]
  //  初始列表（相当于select里面的option），一开始的value会从中初值
  @Prop({ type: Array, default: function() {return[]} }) options!: SelectOption<T>[]
  @Prop({ type: String }) label!: string
  @Prop({ type: String }) fieldClass!: string
  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) canFreeText!: boolean;
  @Prop({ type: Function }) handleValidate!: (val: T) => boolean;
  //  只有一个值的时候
  @Model('change', { type: [Array,String] }) readonly value!: T[] | T

  get formatValue() {
    return (typeof this.value === 'string'? [this.value] : this.value) as T[]
  }

  curOptions: SelectOption<T>[] = []
  newTag = ''
  tags: string[] = []
  tagsId: T[] = []
  id = String(+new Date())
  selectFromList = false

  get oneText () {
    return this.limit === 1
  }

  get isStringValue() {
    return typeof this.value === 'string'
  }

  get inputDisable() {
    return this.disabled
  }

  get dataOptions() {
    return [...this.options, ...this.curOptions]
  }

  @Watch('formatValue', { immediate: true })
  defaultTagByValue (newVal: T[], oldVal: T[]) {
    //  初始化的时候，本身有值，但没写进tags
    if(newVal){
      const list = this.options.length > 0 ? this.options : this.list
      this.setDefaultTag(newVal, list)
    }
  }

  @Watch('options', { immediate: true })
  defaultTagByOption (newVal: SelectOption<T>[], preVal: SelectOption<T>[]) {
    //  初始化的时候，本身有值，但没写进tags
    if(newVal.length > 0) {
      this.setDefaultTag(this.formatValue, newVal)
    }
  }

  @Watch('list', { immediate: true })
  defaultTagByList (newVal: SelectOption<T>[], preVal: SelectOption<T>[]) {
    //  初始化的时候，本身有值，但没写进tags
    if(newVal.length > 0) {
      this.setDefaultTag(this.formatValue, newVal)
    }
  }

  @Watch('curOptions')
  returnOptiton(val: SelectOption<T>[]){
    this.$emit('get-option', val)
  }

  setDefaulOption() {
    if(this.options.length === 0 && this.list.length > 0 && this.curOptions.length === 0) {
      const curValue = this.tagsId
      this.list.forEach(el => {
        if(curValue.includes(el.value)){
          this.curOptions.push(el)
        }
      })
    }
  }

  setDefaultTag(value: T[], list: SelectOption<T>[]){
     if (value && value.length > 0 && this.tags.length === 0) {
      const options = list
      const textShowArr: string[] = []
      value.forEach(el => {
        const find = options.find(listEl => listEl.value === el)
        if (find) {
          textShowArr.push(find.text)
        }else{
          this.canFreeText && textShowArr.push(el as unknown as string)
        }
      })
      this.tags = textShowArr
      // 清洗数据
      this.tagsId = this.formatValue.filter(el => {
        if (typeof el === 'string') return !!el
        else if (typeof el === 'undefined') return false
        return true
      }).map(el => {
        if (typeof el === 'string') return el.trim() as unknown as T
        else return el
      })
      this.setDefaulOption()
    }
    else if (value && value.length === 0) {
      this.tags = []
      this.tagsId = []
    }
    //  针对只有一个值的，如果value被外面置空
    else if(value && value.length > 0 && !value[0]){
      this.tags = []
      this.tagsId = []
      this.newTag = ''
    }
  }

  get reachLimit () {
    return this.limit && this.tagsId.length === this.limit
  }

  //  默认把已选的去除
  get showList () {
    return this.list.filter(el => this.tagsId.indexOf(el.value) === -1)
  }

  removeTagAndRemoveSelect (removeTag: (tag: string) => void, tag: string) {
    const options = this.dataOptions
    removeTag(tag)
    //  为了修复组件自带会被空格消除
    const obj = options.find(el => el.text.trim() === tag)
    //  不存在list的时候直接删除
    const deleteTagId = obj ? obj.value : tag
    deleteTagId && (this.tagsId = this.tagsId.filter(el => el !== deleteTagId))
    this.isStringValue ? this.$emit('change', '') : this.$emit('change', this.tagsId)
    this.newTag = ''
  }

  handleCancelFetch(param: boolean) {
    this.selectFromList = param
  }

  handleFocus () {
    if (this.$refs.input) {
      ;(this.$refs.input as SearchInput).setFocused()
    }
  }

  handleHit (addTag: (tag: string) => void, item: SelectOption<T>) {
    //  去掉blur时为空值的情况
    if(!item.value)return
    if(this.handleValidate && !this.handleValidate(item.value)) return
    // 检查不重复添加已经存在的tag
    if(this.tagsId.find(el => el === item.value))return
    this.options.length === 0 && !(this.curOptions.find(el => el.value === item.value)) && this.curOptions.push(item)
    addTag(item.text)
    this.tagsId.push(item.value)
    this.isStringValue ? this.$emit('change', this.tagsId[0]) : this.$emit('change', this.tagsId)
  }
}
</script>
