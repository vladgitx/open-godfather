import { PlayerBonesEnum } from "@/shared/enums";
import { Vector3 } from "../../vector3";
import { PlayerMp } from "../instance";
import { PlayerAttachedObject } from "./entity";
export declare class PlayerAttachedObjects {
    private player;
    private attachedObjects;
    constructor(player: PlayerMp);
    new(model: number, bone: PlayerBonesEnum, offset?: Vector3, rotation?: Vector3, scale?: Vector3, firstMaterialColor?: string, secondMaterialColor?: string): PlayerAttachedObject | undefined;
    destroy(object: PlayerAttachedObject): void;
    destroyAll(): void;
}
