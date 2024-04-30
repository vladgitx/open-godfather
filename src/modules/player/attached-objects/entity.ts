import { type PlayerBonesEnum } from "@/common/enums"
import { type Vector3 } from "../../vector3"
import { nativeFunctions } from "@/natives"
import { type Player } from "../entity"

export function setPlayerAttachedObject(player: Player, data: PlayerAttachedObject) {
    nativeFunctions.setPlayerAttachedObject(
        player.id,
        data.slot,
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

export const attachedObjInternalOffset = new WeakMap<PlayerAttachedObject, Vector3>()
export const attachedObjInternalRotation = new WeakMap<PlayerAttachedObject, Vector3>()
export const attachedObjInternalScale = new WeakMap<PlayerAttachedObject, Vector3>()

export class PlayerAttachedObject {
    private _bone: PlayerBonesEnum
    private _firstMaterialColor: string
    private _secondMaterialColor: string

    constructor(
        private player: Player,
        readonly slot: number,
        readonly model: number,
        bone: PlayerBonesEnum,
        offset: Vector3,
        rotation: Vector3,
        scale: Vector3,
        firstMaterialColor: string,
        secondMaterialColor: string,
    ) {
        attachedObjInternalOffset.set(this, offset)
        attachedObjInternalRotation.set(this, rotation)
        attachedObjInternalScale.set(this, scale)

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
        attachedObjInternalOffset.set(this, value)
        setPlayerAttachedObject(this.player, this)
    }

    get offset() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return attachedObjInternalOffset.get(this)!
    }

    set rotation(value: Vector3) {
        attachedObjInternalRotation.set(this, value)
        setPlayerAttachedObject(this.player, this)
    }

    get rotation() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return attachedObjInternalRotation.get(this)!
    }

    set scale(value: Vector3) {
        attachedObjInternalScale.set(this, value)
        setPlayerAttachedObject(this.player, this)
    }

    get scale() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return attachedObjInternalScale.get(this)!
    }
}
