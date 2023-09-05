export function shadeColor(hexColor: string, percentage: number): string {
    // Parse the hex color string into its red, green, and blue components
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);

    // Calculate the delta for each component
    const delta = Math.floor(255 * (percentage / 100));

    // Calculate the new color values
    const newRed = Math.max(0, Math.min(255, red + delta));
    const newGreen = Math.max(0, Math.min(255, green + delta));
    const newBlue = Math.max(0, Math.min(255, blue + delta));

    // Convert the new color values back to a hex string
    const newHexColor = (
        (newRed << 16 | newGreen << 8 | newBlue) // RGB components
        .toString(16) // Convert to hexadecimal string
        .padStart(6, '0') // Ensure 6 digits in the string
    );

    return newHexColor
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