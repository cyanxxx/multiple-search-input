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
        v-bind="$attrs"
        add-on-change
        @focus.native="handleFocus"
      >
        <template
          v-slot="{ tags, addTag, disabled, removeTag }"
        >
          <ul v-if="tags.length > 0" class="b-form-tags-list list-inline d-inline-block mb-0">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
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
import { debounce } from "lodash-es";
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
  @Model('change', { type: Array }) readonly value!: T[]

  curOptions: SelectOption<T>[] = []
  newTag = ''
  tags: string[] = []
  tagsId: T[] = []
  id = String(+new Date())
  selectFromList = false

  get oneText () {
    return this.limit === 1
  }

  get inputDisable() {
    return this.disabled
  }

  get dataOptions() {
    return [...this.options, ...this.curOptions]
  }

  @Watch('value', { immediate: true })
  defaultTagByValue (newVal: T[], oldVal: T[]) {
    //  初始化的时候，本身有值，但没写进tags
    if(newVal){
      this.setDefaultTag(newVal, this.list)
    }
  }

  @Watch('options', { immediate: true })
  defaultTagByList (newVal: SelectOption<T>[], preVal: SelectOption<T>[]) {
    //  初始化的时候，本身有值，但没写进tags
    if(newVal.length > 0) {
      this.setDefaultTag(this.value, newVal)
    }
  }

  @Watch('curOptions')
  returnOptiton(val: SelectOption<T>[]){
    this.$emit('get-option', val)
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
      this.tagsId = this.value.filter(el => {
        if (typeof el === 'string') return !!el
        else if (typeof el === 'undefined') return false
        return true
      })
    }
    else if (value && value.length === 0) {
      this.tags = []
      this.tagsId = []
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
    this.$emit('change', this.tagsId)
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
    if(this.handleValidate && !this.handleValidate(item.value)) return
    // 检查不重复添加已经存在的tag
    if(this.tagsId.find(el => el === item.value))return
    !(this.curOptions.find(el => el.value === item.value)) && this.curOptions.push(item)
    addTag(item.text)
    this.tagsId.push(item.value)
    this.$emit('change', this.tagsId)
  }
}
</script>