import { type PlayerBonesEnum } from "@/common/enums"
import { Entity } from "../../entity"
import { type Vector3 } from "../../vector3"
import { nativeFunctions } from "@/natives"
import { type Player } from "../entity"

function setPlayerAttachedObject(player: Player, data: PlayerAttachedObject) {
    nativeFunctions.setPlayerAttachedObject(
        player.id,
        data.id,
        data.model,
        data.bone,
        data.offset.x,
        data.offset.y,
        data.offset.z,
        data.rotation.x,
        data.rotation.y,
        data.rotation.z,
        data.scale.x,
        data.scale.y,
        data.scale.z,
        data.firstMaterialColor,
        data.secondMaterialColor,
    )
}

export class PlayerAttachedObject extends Entity {
    private _bone: PlayerBonesEnum
    private _firstMaterialColor: string
    private _secondMaterialColor: string

    constructor(
        private player: Player,
        slot: number,
        readonly model: number,
        bone: PlayerBonesEnum,
        offset: Vector3,
        rotation: Vector3,
        scale: Vector3,
        firstMaterialColor: string,
        secondMaterialColor: string,
    ) {
        super(slot)

        this.setVariable("playerAttObj::internal::offset", offset)
        this.setVariable("playerAttObj::internal::rotation", rotation)
        this.setVariable("playerAttObj::internal::scale", scale)

        this._bone = bone
        this._firstMaterialColor = firstMaterialColor
        this._secondMaterialColor = secondMaterialColor
    }

    set firstMaterialColor(value: string) {
        this._firstMaterialColor = value
        setPlayerAttachedObject(this.player, this)
    }

    get firstMaterialColor() {
        return this._firstMaterialColor
    }

    set secondMaterialColor(value: string) {
        this._secondMaterialColor = value
        setPlayerAttachedObject(this.player, this)
    }

    get secondMaterialColor() {
        return this._secondMaterialColor
    }

    set bone(value: PlayerBonesEnum) {
        this._bone = value
        setPlayerAttachedObject(this.player, this)
    }

    get bone() {
        return this._bone
    }

    set offset(value: Vector3) {
        this.setVariable("playerAttObj::internal::offset", value)
        setPlayerAttachedObject(this.player, this)
    }

    get offset() {
        return this.getVariable("playerAttObj::internal::offset") as Vector3
    }

    set rotation(value: Vector3) {
        this.setVariable("playerAttObj::internal::rotation", value)
        setPlayerAttachedObject(this.player, this)
    }

    get rotation() {
        return this.getVariable("playerAttObj::internal::rotation") as Vector3
    }

    set scale(value: Vector3) {
        this.setVariable("playerAttObj::internal::scale", value)
        setPlayerAttachedObject(this.player, this)
    }

    get scale() {
        return this.getVariable("playerAttObj::internal::scale") as Vector3
    }
}
