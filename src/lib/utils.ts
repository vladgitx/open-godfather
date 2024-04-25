export function hexToRgbaInt(hex: string) {
    hex = hex.replace("#", "")

    if (hex.length === 6) {
        return parseInt(hex + "FF", 16)
    }

    if (hex.length === 8) {
        return parseInt(hex, 16)
    }

    return 0xffffffff
}
