import { type PlayerBonesEnum } from "@/shared/enums";
import { Entity } from "../../entity";
import { type Vector3 } from "../../vector3";
export declare class PlayerAttachedObject extends Entity {
    readonly model: number;
    readonly bone: PlayerBonesEnum;
    readonly offset: Vector3;
    readonly rotation: Vector3;
    readonly scale: Vector3;
    readonly firstMaterialColor: string;
    readonly secondMaterialColor: string;
    constructor(slot: number, model: number, bone: PlayerBonesEnum, offset: Vector3, rotation: Vector3, scale: Vector3, firstMaterialColor: string, secondMaterialColor: string);
}
