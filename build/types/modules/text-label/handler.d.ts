import { type Vector3 } from "../vector3";
import { type TextLabelMp } from "./instance";
declare class TextLabelHandler {
    new(text: string, color: string, position: Vector3, drawDistance?: number, world?: number, testLos?: boolean): TextLabelMp | undefined;
    destroy(label: TextLabelMp): void;
    at(id: number): TextLabelMp | undefined;
}
export declare const textLabelHandler: TextLabelHandler;
export {};
