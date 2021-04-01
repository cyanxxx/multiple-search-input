<template>
  <div class="list-group shadow">
    <match-item
      v-for="(item, id) in matchedItems"
      :key="id"
      :data="item.data"
      :html-text="highlight(item.text)"
      :background-variant="backgroundVariant"
      :text-variant="textVariant"
      @click.native="handleHit(item, $event)"
    >
      <template
        v-if="$scopedSlots.suggestion"
        slot="suggestion"
        slot-scope="{ data, htmlText }"
      >
        <slot name="suggestion" v-bind="{ data, htmlText }" />
      </template>
    </match-item>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Inject, Prop } from "vue-property-decorator";
import { sanitize, escapeRegExp } from "./utils/text-util";
import matchItem from "./match-item.vue";
@Component({
  name: "MatchList",
  components: {
    matchItem,
  },
})
export default class MatchList extends Vue {
  @Prop({ type: Array }) data!: { text: string; value: string }[];
  @Prop({ type: String, default: "" }) query!: string;
  @Prop({ type: String, default: "" }) textVariant!: string;
  @Prop({ type: String, default: "" }) backgroundVariant!: string;
  @Prop({ type: Number, default: 10 }) maxMatches!: number;
  @Prop({ type: Number, default: 2 }) minMatchingChars!: number;
  @Inject({ default: false }) asyncMatch!: boolean;

  get highlight() {
    return (text: string) => {
      text = sanitize(text);
      if (this.query.length === 0) {
        return text;
      }
      const re = new RegExp(this.escapedQuery, "gi");
      return text.replace(re, `<strong>$&</strong>`);
    };
  }

  get escapedQuery() {
    return escapeRegExp(sanitize(this.query));
  }

  get matchedItems() {
    if (this.asyncMatch) {
      return this.data;
    }
    if (this.query.length === 0 || this.query.length < this.minMatchingChars) {
      return [];
    }
    const re = new RegExp(this.escapedQuery, "gi");
    // Filter, sort, and concat
    return this.data
      .filter((i) => i.text.match(re) !== null)
      .sort((a, b) => {
        const aIndex = a.text.indexOf(a.text.match(re)![0]);
        const bIndex = b.text.indexOf(b.text.match(re)![0]);
        if (aIndex < bIndex) {
          return -1;
        }
        if (aIndex > bIndex) {
          return 1;
        }
        return 0;
      })
      .slice(0, this.maxMatches);
  }

  handleHit(item: string, evt: any) {
    this.$emit("hit", item);
    evt.preventDefault();
  }
}
</script>
