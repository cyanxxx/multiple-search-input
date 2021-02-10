<template>
  <div>
    <div :class="sizeClasses">
      <div v-if="$slots.prepend || prepend" ref="prependDiv" class="input-group-prepend">
        <slot name="prepend">
          <span class="input-group-text">{{ prepend }}</span>
        </slot>
      </div>
      <input
        ref="input"
        type="search"
        :class="`${inputClass}`"
        class="inputClass"
        :placeholder="placeholder"
        :aria-label="placeholder"
        :value="inputValue"
        autocomplete="off"
        v-bind="$attrs"
        @focus="isFocused = true"
        @blur="handleBlur"
        @input="handleInput($event.target.value)"
      />
      <div v-if="$slots.append || append" class="input-group-append">
        <slot name="append">
          <span class="input-group-text">{{ append }}</span>
        </slot>
      </div>
    </div>
    <vue-bootstrap-typeahead-list
      v-show="isFocused && data.length > 0"
      ref="list"
      :style="`max-height:${height}px`"
      class="vbt-autcomplete-list"
      :query="inputValue"
      :data="formattedData"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      :maxMatches="maxMatches"
      :minMatchingChars="minMatchingChars"
      @hit="handleHit"
    >
      <!-- pass down all scoped slots -->
      <template v-for="(slot, slotName) in $scopedSlots" :slot="slotName" slot-scope="{ data, htmlText }">
        <slot :name="slotName" v-bind="{ data, htmlText }"></slot>
      </template>
      <!-- below is the right solution, however if the user does not provide a scoped slot, vue will still set $scopedSlots.suggestion to a blank scope
      <template v-if="$scopedSlots.suggestion" slot="suggestion" slot-scope="{ data, htmlText }">
        <slot name="suggestion" v-bind="{ data, htmlText }" />
      </template>-->
    </vue-bootstrap-typeahead-list>
  </div>
</template>
<style>
.inputClass{
  width: 100%;
  display: inline-block;
  font-weight: 300;
  display: block;
  width: 100%;
  height: calc(38px - 0.375rem * 2 - 2px);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.inputClass:focus{
  outline: 0;
}
</style>
<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import { mixins } from 'vue-class-component';

@Component({
  name: 'SearchInput'
})
export default class SearchInput extends mixins (VueBootstrapTypeahead) {
  @Prop({type: String}) tagsId!: string 
  height = 250
  firstCalu = false

  @Watch('isFocused')
  setHeight(newVal: boolean) {
    if(newVal){
      this.calcuHeight()
    }
  }

  calcuHeight() {
    const el = this.$refs.input as Element
    const {top: inputTop, height: inputHeight} = el.getBoundingClientRect()
    const height = window.innerHeight;
    //  50为padding和跟页面底端保持一定距离
    this.height = height - inputTop - inputHeight - 50
  }

    handleHit(evt: {data: string; text: string}) {
      if (typeof this.value !== 'undefined') {
        this.$emit('input', evt.text)
      }
      this.inputValue = evt.text
      this.$emit('hit', evt.data)
      ;(this.$refs.input as HTMLInputElement).blur()
      this.inputValue = ''
      this.isFocused = false
    }

     handleBlur(evt: {relatedTarget: Element}) {
      // relatedTarget: 进入到哪个元素，仅对可以focus的元素有效
      const tgt = evt.relatedTarget
      if (tgt && tgt.classList.contains('vbst-item')) {
        return
      }
      //  当点自己内部的菜单滚动条不关闭，别的tags会关闭
      if (tgt && tgt.classList.contains('_tags') && tgt.id === "" + this.tagsId) {
        return
      }
      this.inputValue = ''
      this.isFocused = false
    }

    setFocused() {
       ;(this.$refs.input as HTMLInputElement).focus()
    }
}
</script>
