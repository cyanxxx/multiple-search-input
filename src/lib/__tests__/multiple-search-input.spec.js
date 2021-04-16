import "jest";
import { shallowMount, createLocalVue } from "@vue/test-utils";
// 直接读取打完包后的组件
import { MultipleSearchInput } from "../../../dist/multipleSearchInput.min.js";
import { FormTagsPlugin } from 'bootstrap-vue'

describe("MultipleSearchInput.vue", () => {
  const localVue  = createLocalVue()
  localVue.use(FormTagsPlugin)
  test("MultipleSearchInput have the default value.", () => {
    const value = ["a"];
    const list = [
      {
        text: "Apple",
        value: "a",
      },
      {
        text: "Bear",
        value: "b",
      },
      {
        text: "Cat",
        value: "c",
      },
    ];
    const wrapper = shallowMount(MultipleSearchInput, {
      propsData: { value, list },
      localVue
    });
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
  });
  test("MultipleSearchInput have the default value and list is async.", () => {
    const value = ["a"];
    const list = [];
    const options = [
      {
        text: "Apple",
        value: "a",
      },
      {
        text: "Bear",
        value: "b",
      },
      {
        text: "Cat",
        value: "c",
      },
    ];
    const wrapper = shallowMount(MultipleSearchInput, {
      propsData: { value, options, list },
      localVue
    });
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
  });
  test("MultipleSearchInput have the async default value and options.", async () => {
    const value = ["a"];
    const list = [];
    const options = [];
    const wrapper = shallowMount(MultipleSearchInput, {
      propsData: { value, options, list },
      localVue
    });
    await wrapper.setProps({
      value: ["a"]
    })
    await wrapper.setProps({
      options: [ {
        text: "Apple",
        value: "a",
      },
      {
        text: "Bear",
        value: "b",
      },
      {
        text: "Cat",
        value: "c",
      },]
    })
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
  });
});
