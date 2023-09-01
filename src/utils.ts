export function shadeColor(color: number, percentage: number) {
    const red = (color >> 24) & 0xFF
    const green = (color >> 16) & 0xFF
    const blue = (color >> 8) & 0xFF
    const alpha = color & 0xFF

    const delta = Math.floor(255 * (percentage / 100))

    const newRed = Math.max(0, Math.min(255, red + delta))
    const newGreen = Math.max(0, Math.min(255, green + delta))
    const newBlue = Math.max(0, Math.min(255, blue + delta))

    return (newRed << 24) | (newGreen << 16) | (newBlue << 8) | alpha
}

type NotNill<T> = T extends null | undefined ? never : T
type Primitive = undefined | null | boolean | string | number | Function
export type DeepRequired<T> = T extends Primitive ? NotNill<T> : {
    [P in keyof T]-?: T[P] extends Array<infer U>
        ? Array<DeepRequired<U>>
        : T[P] extends ReadonlyArray<infer U2>
            ? DeepRequired<U2>
            : DeepRequired<T[P]>
}