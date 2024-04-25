import { type PlayerBonesEnum } from "@/common/enums"
import { nativeFunctions } from "@/natives"
import { Vector3 } from "../../vector3"
import { type Player } from "../entity"
import { PlayerAttachedObject } from "./entity"

const MAX_PLAYER_ATTACHED_OBJECTS = 10

export class PlayerAttachedObjects {
    private attachedObjects = new Array<PlayerAttachedObject | undefined>(MAX_PLAYER_ATTACHED_OBJECTS).fill(undefined)

    constructor(private player: Player) {}

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
        nativeFunctions.removePlayerAttachedObject(this.player.id, object.id)

        this.attachedObjects[object.id] = undefined

        object.exists = false
    }

    destroyAll() {
        for (const object of this.attachedObjects) {
            if (object) {
                this.destroy(object)
            }
        }
    }
}
