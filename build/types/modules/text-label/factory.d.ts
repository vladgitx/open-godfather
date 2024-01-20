import { TextLabelMp } from "./instance";
export declare class TextLabelMpFactory {
    private static pool;
    static new(id: number, text: string, color: string): TextLabelMp | undefined;
    static destroy(label: TextLabelMp): boolean;
    static at(id: number): TextLabelMp | undefined;
}
