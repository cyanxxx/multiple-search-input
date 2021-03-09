declare module '*.vue' {
  import Vue from 'vue'
  export interface SelectOption<T> {
    text: string;
    value: T;
  }
  
  export default Vue
}

