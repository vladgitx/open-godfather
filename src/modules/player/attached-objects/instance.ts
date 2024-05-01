import { type PlayerBonesEnum } from "@/common/enums"
import { nativeFunctions } from "@/natives"
import { Vector3 } from "../../vector3"
import { type Player } from "../entity"
import { PlayerAttachedObject } from "./entity"
import { EntityPromises } from "@/modules/entity"

const MAX_PLAYER_ATTACHED_OBJECTS = 10

export interface AttachedObjectEditResult {
    offset: Vector3
    rotation: Vector3
    scale: Vector3
}

export const editModePromises = new EntityPromises<Player, AttachedObjectEditResult | undefined>()
export const editingObject = new WeakMap<Player, PlayerAttachedObject>()

export class PlayerAttachedObjects {
    private slots = new Array<PlayerAttachedObject | undefined>(MAX_PLAYER_ATTACHED_OBJECTS).fill(undefined)

    constructor(private player: Player) {
        player.onCleanup(() => {
            for (const object of this.slots) {
                if (object) {
                    this.destroy(object)
                }
            }
        })
    }

    new(
        model: number,
        bone: PlayerBonesEnum,
        offset?: Vector3,
        rotation?: Vector3,
        scale?: Vector3,
        firstMaterialColor?: string,
        secondMaterialColor?: string,
    ) {
        const slot = this.slots.indexOf(undefined)

        if (slot === -1) {
            return undefined
        }

        const success = nativeFunctions.setPlayerAttachedObject(
            this.player.id,
            slot,
            model,
            bone,
            offset?.x,
            offset?.y,
            offset?.z,
            rotation?.x,
            rotation?.y,
            rotation?.z,
            scale?.x,
            scale?.y,
            scale?.z,
            firstMaterialColor,
            secondMaterialColor,
        )

        if (success) {
            this.slots[slot] = new PlayerAttachedObject(
                this.player,
                slot,
                model,
                bone,
                offset ?? new Vector3(0, 0, 0),
                rotation ?? new Vector3(0, 0, 0),
                scale ?? new Vector3(1, 1, 1),
                firstMaterialColor ?? "",
                secondMaterialColor ?? "",
            )
            return this.slots[slot]
        }

        return undefined
    }

    destroy(object: PlayerAttachedObject) {
        if (this.slots[object.slot] === object) {
            nativeFunctions.removePlayerAttachedObject(this.player.id, object.slot)
            this.slots[object.slot] = undefined
        }

        if (editingObject.get(this.player) === object) {
            editingObject.delete(this.player)
            editModePromises.reject(this.player, new Error("Player attached object was destroyed"))
        }
    }

    at(slot: number) {
        return this.slots[slot]
    }

    enterEditMode(object: PlayerAttachedObject) {
        this.player.exitObjectEditMode() // TODO: bug, not the expected behavior. the player can't enter the edit mode after this

        editingObject.set(this.player, object)
        nativeFunctions.editAttachedObject(this.player.id, object.slot)

        return editModePromises.new(this.player)
    }
}
