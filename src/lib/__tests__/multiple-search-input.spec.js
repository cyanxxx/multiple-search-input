import "jest";
import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import MultipleSearchInput, { SelectOption } from '../multiple-search-input.vue'
import { FormTagsPlugin } from 'bootstrap-vue'
import Demo from '../../App.vue'

describe("MultipleSearchInput.vue", () => {
  const localVue  = createLocalVue()
  localVue.use(FormTagsPlugin)
  it("render with local value and local list.", () => {
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
  it("render async value and options.", async () => {
    const value = [];
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
  it("render with async value first and then get the list", async () => {
    const value = ['a'];
    const list = [];
    const options = [];
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list, options },
      localVue
    });
    expect(wrapper.vm.formatValue).toEqual(['a'])
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
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
  });
  it("render with async value first and then get the list, but can freeText", async () => {
    const value = ['a', 'banner'];
    const list = [];
    const options = [];
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list, options, canFreeText: true },
      localVue
    });
    expect(wrapper.vm.formatValue).toEqual(['a', 'banner'])
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
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tags).toEqual(['Apple','banner'])
    expect(wrapper.vm.tagsId).toEqual(['a', 'banner'])
  });
  it("render with list first and then get async value", async () => {
    const value = [];
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
      ]
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list, options },
      localVue
    });
    expect(wrapper.vm.options).toHaveLength(3)
    jest.useFakeTimers();
    setTimeout(() => {
      wrapper.setProps({
        value: ['a']
      })
    }, 1000)
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
  });
  it("render tag with text input", async () => {
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

  it("input free text and props has freeText", async () => {
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

  it("render add by outside value", async () => {
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
    const wrapper = mount(MultipleSearchInput, {
      propsData: { value, list, canFreeText: true },
      localVue
    });
    expect(wrapper.vm.tags).toEqual(['Apple'])
    expect(wrapper.vm.tagsId).toEqual(['a'])
    expect(wrapper.props().value).toEqual(['a'])
    wrapper.setProps({
      value: ['a', 'b']
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.tags).toEqual(['Apple', 'Bear'])
    expect(wrapper.vm.tagsId).toEqual(['a', 'b'])
    expect(wrapper.props().value).toEqual(['a', 'b'])
  });
});

describe('Demo', () => {
  const wrapper = shallowMount(Demo);
  it('render as usual', async () => {
    jest.useFakeTimers();
    setTimeout(() => {
      // 
    }, 2000)
    jest.runTimersToTime(2000)
    await wrapper.vm.$nextTick()
    expect(wrapper.element).toMatchSnapshot()
  })
})