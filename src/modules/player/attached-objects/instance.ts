import { type PlayerBonesEnum } from "@/common/enums"
import { nativeFunctions } from "@/natives"
import { Vector3 } from "../../vector3"
import { type Player } from "../entity"
import { PlayerAttachedObject } from "./entity"
import { editPromiseFactory } from "./edit-promises"

const MAX_PLAYER_ATTACHED_OBJECTS = 10

export class PlayerAttachedObjects {
    private attachedObjects = new Array<PlayerAttachedObject | undefined>(MAX_PLAYER_ATTACHED_OBJECTS).fill(undefined)

    constructor(private player: Player) {
        player.onCleanup(() => {
            for (const object of this.attachedObjects) {
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
        const slot = this.attachedObjects.indexOf(undefined)

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
            this.attachedObjects[slot] = new PlayerAttachedObject(
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
            return this.attachedObjects[slot]
        }

        return undefined
    }

    destroy(object: PlayerAttachedObject) {
        if (object.exists) {
            nativeFunctions.removePlayerAttachedObject(this.player.id, object.id)

            this.attachedObjects[object.id] = undefined

            object.exists = false
        }
    }

    at(slot: number) {
        return this.attachedObjects[slot]
    }

    enterEditMode(object: PlayerAttachedObject) {
        this.player.exitObjectEditMode()

        this.player.setVariable("playerAttObj::internal::editObject", object)
        nativeFunctions.editAttachedObject(this.player.id, object.id)

        return editPromiseFactory.new(this.player)
    }
}
