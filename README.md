## Tag-Input
![示例](./examples.png)
### 基于vue-bootstrap-typeahead二次开发组件，支持输入多个tag和tag的远程搜索组件。

### 特别注意
- 需要vue-property-decorator, vue-class-component, bootstrap的b-form-tags全局注册


### usage
#### 组件方式

```javascript
import { MultipleSearchInput } from 'multiple-search-input' 
Vue.component('MultipleSearchInput', MultipleSearchInput) 
````
#### 插件方式

```javascript
import { multipleSearchInputPlugin } from 'multiple-search-input'
Vue.use(multipleSearchInputPlugin);
```
### Prop
|  prop   | type  |  description |
| :----   | :----   | :----  |
| limit  | Number | 限制tag的个数 |
| list  | {text: string; value: T}<T> | 下拉选择 |
| options  | {text: string; value: T}<T> | 初始下拉（当是远程搜索没有初始下拉选择时需要提供，不然value找不到对应显示的text值,当options和list同时有优先选options里面的值） |
| label  | string | label |
| fieldClass  | string | 设置整体div的class |
| disabled  | boolean | disabled |
| canFreeText  | boolean | 不检查是否在下拉内，可以直接新建tag |
| busy| boolean | 使用无限滚动时翻页设置成true,load数据后改成false|
| infinite| boolean | 是否采用无限滚动 |
| handleValidate  | (val: T) => boolean | 控制能否加入tag内
| value [v-model] | T[] | tag的value

### Event
|  event   | type  |  description |
| :----   | :----   | :----  |
| fetch-data  | (val: string) => void; | 输入之后得到的值（可以在此调用远程搜索api） |
| fetch-more-data | (val: string) => void; | 触发滚动到底部的时候触发 | 
| get-option | (val: {text: string; value: T}<T>[]) => void; | 获取当前已被选中的tag option(对于得不到初始option,在页面返回的时候可以在option中传入) |
| blur | () => void; | 当输入后没有匹配或者选择list里面的value,触发失去焦点时(对于远程搜的时候，可以利用这个钩子来清空list) |
| change[v-model] | (val: string[]) => void; |  |

### 如何链接到别的包本地调试
- 运行`npm run dev`,将`package.json`中的main改为`dist/multipleSearchInput.js`, 并运行`npm link`将包链接到本地全局，再在需要调试的项目运行`npm link multiple-search-input`。需要调试的项目还需要`npm install source-map-loader`配置webpack.config

### 启动命令详解：
- `npm run start`: 本地demo启本地服务器
- `nom run dev`: 打一个dev环境的js包
- `nom run start:demo`: 打一个prod环境的包但不抽离vue,vue-class-component,vue-property-decorator,方便直接引入js，而不是通过npm本地引入
- `nom run build`: 打prod包发布新版本
- `pre-publish`: 打包并改版本号

### 组件数据同步流程图
![示例](./multiple-search-input.png)