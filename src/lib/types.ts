export type Constructible<T> = new (...args: never[]) => T

export type EnumValue<T extends Record<string, unknown>> = T[keyof T]

export type ExcludeFirstParam<K extends (...args: never) => unknown> = Parameters<K> extends [unknown, ...infer Rest] ? Rest : never

export type NumberRange<X extends number, Y extends number, A extends number[] = []> = A["length"] extends Y
    ? A[number]
    : NumberRange<X, Y, [...A, A["length"]]>
