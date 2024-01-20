import { TextLabelMp } from "../../text-label";
import { Vector3 } from "../../vector3";
import { PlayerMp } from "../instance";
export declare class PlayerTextLabels {
    private player;
    private labels;
    constructor(player: PlayerMp);
    attach(label: TextLabelMp, offset: Vector3): boolean;
    get all(): Set<TextLabelMp>;
}
