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

export function validateEnumValue<T extends Record<string, any>>(enumObject: T, value: any): value is T[keyof T] {
    return Object.values(enumObject).includes(value)
}

export function getEnumKeyByValue<T extends Record<string, any>>(enumObject: T, value: any): keyof T | undefined {
    return Object.keys(enumObject).find((key) => enumObject[key] === value)
}

export function typedObjectKeys<T extends Record<string, any>>(object: T): (keyof T)[] {
    return Object.keys(object) as (keyof T)[]
}
