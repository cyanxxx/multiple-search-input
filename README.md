## Tag-Input
### 基于vue-bootstrap-typeahead二次开发组件，支持输入多个tag和tag的远程搜索组件。
### Prop
|  prop   | type  |  description |
| :----   | :----   | :----  |
| limit  | Number | 限制tag的个数 |
| list  | {text: string; value: T}<T> | 下拉选择 |
| options  | {text: string; value: T}<T> | 初始下拉（当是远程搜索没有初始下拉选择时需要提供，不然value找不到对应显示的text值） |
| label  | string | label |
| fieldClass  | string | 设置整体div的class |
| disabled  | boolean | disabled |
| canFreeText  | boolean | 不检查是否在下拉内，可以直接新建tag |
| handleValidate  | (val: T) => boolean | 控制能否加入tag内
| value [v-model] | T[] | tag的value

### Event
|  event   | type  |  description |
| :----   | :----   | :----  |
| fetch-data  | (val: string) => void; | 输入之后得到的值（可以在此调用远程搜索api） |
| get-option | (val: {text: string; value: T}<T>[]) => void; | 获取当前已被选中的tag option(对于得不到初始option,在页面返回的时候可以在option中传入) |
| change[v-model] | (val: string[]) => void; |  |