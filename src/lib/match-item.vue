<template>
 <a
    tabindex="0"
    href="#"
    :class="textClasses"
    @mouseover="active = true"
    @mouseout="active = false"
  >
    <slot name="suggestion" v-bind="{ data: data, htmlText: htmlText }">
      <span v-html="htmlText"></span>
    </slot>
  </a>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'matchItem'
})
export default class MatchItem extends Vue{
  @Prop({type: Object}) data!: {text: string; value: string};
  @Prop({type: String, default: ''}) query!: string;
  @Prop({type: String, default: ''}) htmlText!: string;
  @Prop({type: String, default: ''}) textVariant!: string
  @Prop({type: String, default: ''}) backgroundVariant!: string

  active = false

  get textClasses() {
    let classes = ''
    classes += this.active ? 'active' : ''
    classes += this.backgroundVariant ? ` bg-${this.backgroundVariant}` : ''
    classes += this.textVariant ? ` text-${this.textVariant}` : ''
    return `vbst-item list-group-item list-group-item-action ${classes}`
  }
  
}
</script>
