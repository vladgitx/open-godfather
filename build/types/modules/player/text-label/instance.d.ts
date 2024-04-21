import { type TextLabelMp } from "../../text-label";
import { type Vector3 } from "../../vector3";
import { type PlayerMp } from "../instance";
export declare class PlayerTextLabels {
    private player;
    private labels;
    constructor(player: PlayerMp);
    attach(label: TextLabelMp, offset: Vector3): boolean;
    get all(): Set<TextLabelMp>;
}
