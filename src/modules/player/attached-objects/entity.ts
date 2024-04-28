import { type PlayerBonesEnum } from "@/common/enums"
import { Entity } from "../../entity"
import { type Vector3 } from "../../vector3"
import { nativeFunctions } from "@/natives"
import { type Player } from "../entity"

export class PlayerAttachedObject extends Entity {
    constructor(
        private player: Player,
        slot: number,
        readonly model: number,
        readonly bone: PlayerBonesEnum,
        offset: Vector3,
        rotation: Vector3,
        scale: Vector3,
        readonly firstMaterialColor: string,
        readonly secondMaterialColor: string,
    ) {
        super(slot)

        this.setVariable("playerAttObj::internal::offset", offset)
        this.setVariable("playerAttObj::internal::rotation", rotation)
        this.setVariable("playerAttObj::internal::scale", scale)
    }

    set offset(value: Vector3) {
        this.setVariable("playerAttObj::internal::offset", value)

        nativeFunctions.setPlayerAttachedObject(
            this.player.id,
            this.id,
            this.model,
            this.bone,
            value.x,
            value.y,
            value.z,
            this.rotation.x,
            this.rotation.y,
            this.rotation.z,
            this.scale.x,
            this.scale.y,
            this.scale.z,
            this.firstMaterialColor,
            this.secondMaterialColor,
        )
    }

    get offset() {
        return this.getVariable("playerAttObj::internal::offset") as Vector3
    }

    set rotation(value: Vector3) {
        this.setVariable("playerAttObj::internal::rotation", value)

        nativeFunctions.setPlayerAttachedObject(
            this.player.id,
            this.id,
            this.model,
            this.bone,
            this.offset.x,
            this.offset.y,
            this.offset.z,
            value.x,
            value.y,
            value.z,
            this.scale.x,
            this.scale.y,
            this.scale.z,
            this.firstMaterialColor,
            this.secondMaterialColor,
        )
    }

    get rotation() {
        return this.getVariable("playerAttObj::internal::rotation") as Vector3
    }

    set scale(value: Vector3) {
        this.setVariable("playerAttObj::internal::scale", value)

        nativeFunctions.setPlayerAttachedObject(
            this.player.id,
            this.id,
            this.model,
            this.bone,
            this.offset.x,
            this.offset.y,
            this.offset.z,
            this.rotation.x,
            this.rotation.y,
            this.rotation.z,
            value.x,
            value.y,
            value.z,
            this.firstMaterialColor,
            this.secondMaterialColor,
        )
    }

    get scale() {
        return this.getVariable("playerAttObj::internal::scale") as Vector3
    }
}
