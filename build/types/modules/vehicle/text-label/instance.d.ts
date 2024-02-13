import { TextLabelMp } from "../../text-label";
import { Vector3 } from "../../vector3";
import { VehicleMp } from "../entity";
export declare class VehicleTextLabels {
    private vehicle;
    private labels;
    constructor(vehicle: VehicleMp);
    attach(label: TextLabelMp, offset: Vector3): boolean;
    get all(): Set<TextLabelMp>;
}
