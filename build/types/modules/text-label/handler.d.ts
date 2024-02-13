import { Vector3 } from "../vector3";
import { TextLabelMpFactory } from "./factory";
import { TextLabelMp } from "./instance";
export declare class TextLabelMpHandler {
    constructor();
    new(text: string, color: string, position: Vector3, drawDistance?: number, world?: number, testLos?: boolean): TextLabelMp | undefined;
    destroy(label: TextLabelMp): boolean;
    at: typeof TextLabelMpFactory.at;
}
