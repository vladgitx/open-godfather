import { PlayerBonesEnum } from "../../../shared/enums"
import { Entity } from "../../entity"
import { Vector3 } from "../../vector3"

export class PlayerAttachedObject extends Entity {
    constructor(
        slot: number,
        readonly model: number,
        readonly bone: PlayerBonesEnum,
        readonly offset: Vector3,
        readonly rotation: Vector3,
        readonly scale: Vector3,
        readonly firstMaterialColor: string,
        readonly secondMaterialColor: string,
    ) {
        super(slot)
    }
}
