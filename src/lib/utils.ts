export function hexToRgbaInt(hex: string) {
    hex = hex.replace("#", "")

    if (hex.length === 6) {
        return parseInt(hex + "FF", 16)
    }

    if (hex.length === 8) {
        return parseInt(hex, 16)
    }

    return 0
}

export function rgbaIntToHex(rgba: number) {
    return rgba.toString(16).padStart(6, "0")
}

export function validateEnumValue<T extends Record<string, unknown>>(enumObject: T, value: unknown): value is T[keyof T] {
    return Object.values(enumObject).includes(value)
}

export function getEnumKeyByValue<J, T extends Record<string, J>>(
    enumObject: T,
    value: J,
): J extends T[keyof T] ? keyof T : keyof T | undefined {
    return Object.keys(enumObject).find((key) => enumObject[key] === value) as never
}

export function validateEnumKey<T extends Record<string, unknown>>(enumObject: T, key: unknown): key is keyof T {
    return Object.keys(enumObject).includes(String(key))
}

export function typedObjectKeys<T extends Record<string, unknown>>(object: T): (keyof T)[] {
    return Object.keys(object) as (keyof T)[]
}
