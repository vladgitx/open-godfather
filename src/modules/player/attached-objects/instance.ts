import { CONFIG } from "../../../shared/config"
import { PlayerBonesEnum } from "../../../shared/enums"
import { SampNatives } from "../../../wrapper"
import { Vector3 } from "../../vector3"
import { PlayerMp } from "../instance"
import { PlayerAttachedObject } from "./entity"

export class PlayerAttachedObjects {
    private attachedObjects = new Array<PlayerAttachedObject | undefined>(CONFIG.playerAttachedObjects.limit).fill(undefined)

    constructor(private player: PlayerMp) {}

    new(
        model: number,
        bone: PlayerBonesEnum,
        offset: Vector3,
        rotation: Vector3,
        scale: Vector3,
        firstMaterialColor: string,
        secondMaterialColor: string,
    ) {
        const slot = this.attachedObjects.indexOf(undefined)
        if (slot === -1) {
            return undefined
        }

        const success = SampNatives.setPlayerAttachedObject(
            this.player.id,
            slot,
            model,
            bone,
            offset.x,
            offset.y,
            offset.z,
            rotation.x,
            rotation.y,
            rotation.z,
            scale.x,
            scale.y,
            scale.z,
            firstMaterialColor,
            secondMaterialColor,
        )

        if (success) {
            this.attachedObjects[slot] = new PlayerAttachedObject(
                slot,
                model,
                bone,
                offset,
                rotation,
                scale,
                firstMaterialColor,
                secondMaterialColor,
            )
            return this.attachedObjects[slot]
        }

        return undefined
    }

    destroy(object: PlayerAttachedObject) {
        SampNatives.removePlayerAttachedObject(this.player.id, object.id)

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
