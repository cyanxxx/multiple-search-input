<template>
   <div :class="fieldClass" class="_field">
    <div :id="label" v-if="label" class="_label">{{ label }}</div>
    <div class="_data">
      <b-form-tags
        :id="id"
        v-model="tags"
        class="multiple-input _tags"
        :input-id="label"
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
         <search-input v-if="!reachLimit" ref="input" v-model="newTag" :tags-id="id" :disabled="reachLimit" class="d-inline-block" inputClass="border-0" :data="showList"  :serializer="item => item.text" v-bind="$attrs" :minMatchingChars="1" :maxMatches="100" :style="`width: ${oneText ? '100%' : 'auto'}`" 
           @hit="handleHit(addTag, $event)"/>
        </template>
      </b-form-tags>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import SearchInput from './search-input.vue'
import { BFormTags } from 'bootstrap-vue'
export interface SelectOption<T> {text: string; value: T}
@Component({
  name: 'MultipleSearchInput',
  components: {
    BFormTags,
    SearchInput
  }
})
export default class MultipleSearchInput<T> extends Vue {
  @Prop({type: Number}) limit!: number;
  //  每次根据输入内容每次动态调整的下拉list
  @Prop({ type: Array }) list!: SelectOption<T>[]
  //  在下拉list中不存在已经被选的，defaultList
  @Prop({ type: Array }) options!: SelectOption<T>[]
  @Prop({ type: String }) label!: string
  @Prop({ type: String }) fieldClass!: string
  @Prop({ type: Function}) handleValidate!: (val: T) => boolean;
  @Model('change', { type: Array }) readonly value!: T[]
  newTag = ''
  tags: string[] = []
  tagsId: T[] = []
  id = String(+new Date())

  get oneText() {
    return this.limit === 1
  }
  
  @Watch('value', {immediate: true})
  defaultTag(newVal: T[]) {
    //  初始化的时候，本身有值，但没写进tags
    if(newVal && newVal.length > 0 && this.tags.length === 0) {
      const options = this.options || this.list
      if(options.length > 0) {
        const textShowArr: string[] = []
        newVal.forEach(el => {
          const find = options.find(listEl => listEl.value === el)
          if(find){
            textShowArr.push(find.text)
          }
        })
        this.tags = textShowArr
        this.tagsId = this.value.filter(el => {
          if(typeof el === 'string') return !!el
          else if(typeof el === 'undefined') return false
          return true
        })
      }
    }else if(newVal && newVal.length === 0) {
      this.tags = []
      this.tagsId = []
    }
  }

  get reachLimit() {
    return this.limit && this.tagsId.length === this.limit
  }

  //  默认把已选的去除
  get showList() {
    return this.list.filter(el => this.tagsId.indexOf(el.value) === -1)
  }

  removeTagAndRemoveSelect(removeTag: (tag: string) => void, tag: string) {
    const options = this.options || this.list
    removeTag(tag)
    //  为了修复组件自带会被空格消除
    const obj = options.find(el => el.text.trim() === tag)
    const deleteTagId = obj? obj.value : ''
    deleteTagId && (this.tagsId = this.tagsId.filter(el => el !== deleteTagId))
    this.$emit('change', this.tagsId)
    this.newTag = ''
  }

  handleFocus() {
    if(this.$refs.input) {
     ;(this.$refs.input as SearchInput).setFocused()
    }
  }

  handleHit(addTag: (tag: string) => void, item: SelectOption<T>) {
      if(this.handleValidate && !this.handleValidate(item.value))return
      addTag(item.text)
      this.tagsId.push(item.value)
      this.$emit('change', this.tagsId)
  }

}
</script>
