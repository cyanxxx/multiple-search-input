import "jest";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
// 直接读取打完包后的组件
import { MultipleSearchInput } from "../../../dist/multipleSearchInput.min.js";
import { FormTagsPlugin } from 'bootstrap-vue'

describe("MultipleSearchInput.vue", () => {
  const localVue  = createLocalVue()
  localVue.use(FormTagsPlugin)
  it("MultipleSearchInput have the default value.", () => {
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
  it("MultipleSearchInput have the default value and list is async.", () => {
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
  it("MultipleSearchInput have the async default value and options.", async () => {
    const value = ["a"];
    const list = [];
    const options = [];
    const wrapper = shallowMount(MultipleSearchInput, {
      propsData: { value, options, list },
      localVue
    });
    jest.useFakeTimers();
    setTimeout(() => {
      wrapper.setProps({
      options:  [
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
      ]
      })
    }, 1000)
    setTimeout(() => {
      wrapper.setProps({
      value: ["a"]
      })
    }, 1000)

    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
  });
  it("depend the text input to find list", async () => {
    const value = [];
    const list = [{
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
        }];
    const options = [];
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list },
      localVue
    });
    const $input = wrapper.find('input')
    $input.element.value = 'Apple'
    await $input.trigger('input')
    await $input.trigger('blur')
    expect(wrapper.vm.tags).toEqual(['Apple'])
  });
  it("can freeText", async () => {
    const value = ['a'];
    const list = [{
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
        }];
    const options = [];
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list, canFreeText: true },
      localVue
    });
    const $input = wrapper.find('input')
    $input.element.value = 'Banner'
    await $input.trigger('input')
    await $input.trigger('blur')
    expect(wrapper.vm.tags).toHaveLength(2)
    expect(wrapper.vm.tags).toContain('Banner')
  });
  it("can freeText", async () => {
    const value = ['a'];
    const list = [{
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
        }];
    const options = [];
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list, canFreeText: true },
      localVue
    });
    const $input = wrapper.find('input')
    $input.element.value = 'Banner'
    await $input.trigger('input')
    await $input.trigger('blur')
    expect(wrapper.vm.tags).toHaveLength(2)
    expect(wrapper.vm.tags).toContain('Banner')
  });
});
