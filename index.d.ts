import { PluginObject } from 'vue';
export interface SelectOption<T> {text: string; value: T}
export const MultipleSearchInput: PluginObject<null>;
export const multipleSearchInputPlugin;
export function enableLogs(debugConfig: boolean | ILogger): void