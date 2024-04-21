import { TextLabelMp } from "./instance";
declare class TextLabelFactory {
    private pool;
    new(id: number, text: string, color: string): TextLabelMp | undefined;
    destroy(label: TextLabelMp): void;
    at(id: number): TextLabelMp | undefined;
}
export declare const textLabelFactory: TextLabelFactory;
export {};
