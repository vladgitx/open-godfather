import { Entity } from "@/lib/entity"
import { type Player } from "../entity"
import { PLAYER_BONES, type PlayerBone } from "@/wrapper/game/enums.public"
import { type Position3 } from "@/lib/vector3"
import { gameNatives } from "@/wrapper/game"
import { type PlayerAttachedObjectSlot } from "./handler"

export class PlayerAttachedObject extends Entity {
    private _model: number
    private _bone: PlayerBone
    private _offset: Position3
    private _rotation: Position3
    private _scale: Position3
    private _firstMaterialColor: string
    private _secondMaterialColor: string

    constructor(
        private player: Player,
        readonly slot: PlayerAttachedObjectSlot,
        model: number,
        bone: PlayerBone,
        offset: Position3,
        rotation: Position3,
        scale: Position3,
        firstMaterialColor: string,
        secondMaterialColor: string,
    ) {
        super()

        this._model = model
        this._bone = bone
        this._offset = offset
        this._rotation = rotation
        this._scale = scale
        this._firstMaterialColor = firstMaterialColor
        this._secondMaterialColor = secondMaterialColor
    }

    static refreshVisuals(attachedObject: PlayerAttachedObject) {
        gameNatives.setPlayerAttachedObject(
            attachedObject.player.id,
            attachedObject.slot,
            attachedObject._model,
            PLAYER_BONES[attachedObject._bone],
            attachedObject._offset.x,
            attachedObject._offset.y,
            attachedObject._offset.z,
            attachedObject._rotation.x,
            attachedObject._rotation.y,
            attachedObject._rotation.z,
            attachedObject._scale.x,
            attachedObject._scale.y,
            attachedObject._scale.z,
            attachedObject._firstMaterialColor,
            attachedObject._secondMaterialColor,
        )
    }

    set model(value: number) {
        this._model = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get model() {
        return this._model
    }

    set firstMaterialColor(value: string) {
        this._firstMaterialColor = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get firstMaterialColor() {
        return this._firstMaterialColor
    }

    set secondMaterialColor(value: string) {
        this._secondMaterialColor = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get secondMaterialColor() {
        return this._secondMaterialColor
    }

    set bone(value: PlayerBone) {
        this._bone = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get bone() {
        return this._bone
    }

    set offset(value: Position3) {
        this._offset = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get offset() {
        return this._offset
    }

    set rotation(value: Position3) {
        this._rotation = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get rotation() {
        return this._rotation
    }

    set scale(value: Position3) {
        this._scale = value
        PlayerAttachedObject.refreshVisuals(this)
    }

    get scale() {
        return this._scale
    }
}
