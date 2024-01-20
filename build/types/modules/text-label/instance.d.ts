import { Entity } from "../entity";
export declare class TextLabelMp extends Entity {
    private _text;
    private _color;
    attached: boolean;
    constructor(id: number, text: string, color: string);
    set text(text: string);
    get text(): string;
}
