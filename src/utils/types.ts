export type Constructible<T> = new (...args: never[]) => T
export type EnumValue<T extends Record<string, unknown>> = T[keyof T]
