import { PluginObject } from 'vue';
export interface SelectOption<T> {text: string; value: T}
export const MultipleSearchInput: PluginObject<null>;
export const multipleSearchInputPlugin;
export const logger: {
    trace: ILogFunction;
    debug: ILogFunction;
    log: ILogFunction;
    warn: ILogFunction;
    info: ILogFunction;
    error: ILogFunction;
};
interface ILogFunction {
    (message?: any, ...optionalParams: any[]): void;
}