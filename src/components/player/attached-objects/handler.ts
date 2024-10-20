import { EntityPromises } from "@/lib/entity"
import { type Player } from "../entity"
import { PLAYER_BONES, type PlayerBone } from "@/wrapper/game/enums.public"
import { type Vector3, type Position3 } from "@/lib/vector3"
import { type NumberRange } from "@/lib/types"
import { gameNatives } from "@/wrapper/game"
import { PlayerAttachedObject } from "./entity"
import { EntityPool } from "@/lib/pool"

const MAX_PLAYER_ATTACHED_OBJECTS = 10

export type PlayerAttachedObjectSlot = NumberRange<0, typeof MAX_PLAYER_ATTACHED_OBJECTS>

export interface AttachedObjectEditResult {
    offset: Vector3
    rotation: Vector3
    scale: Vector3
}

const editPromise = new EntityPromises<Player, AttachedObjectEditResult | undefined>()

export class PlayerAttachedObjectHandler {
    private editingObject?: PlayerAttachedObject
    readonly pool = new EntityPool<PlayerAttachedObjectSlot, PlayerAttachedObject>()

    constructor(private player: Player) {
        player.onCleanup(() => {
            for (const attachedObject of this.pool.all) {
                attachedObject.destroy()
            }
        })
    }

    new(
        model: number,
        bone: PlayerBone,
        offset?: Partial<Position3>,
        rotation?: Partial<Position3>,
        scale?: Partial<Position3>,
        firstMaterialColor?: string,
        secondMaterialColor?: string,
        slot?: PlayerAttachedObjectSlot,
    ) {
        let usingSlot: PlayerAttachedObjectSlot | undefined = undefined

        if (slot !== undefined) {
            this.pool.at(slot)?.destroy()
            usingSlot = slot
        } else {
            usingSlot = this.getAvailableSlot()
        }

        if (usingSlot === undefined) {
            return undefined
        }

        const success = gameNatives.setPlayerAttachedObject(
            this.player.id,
            usingSlot,
            model,
            PLAYER_BONES[bone],
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

        if (!success) {
            return undefined
        }

        const attachedObject = new PlayerAttachedObject(
            this.player,
            usingSlot,
            model,
            bone,
            { x: offset?.x ?? 0.0, y: offset?.y ?? 0.0, z: offset?.z ?? 0.0 },
            { x: rotation?.x ?? 0.0, y: rotation?.y ?? 0.0, z: rotation?.z ?? 0.0 },
            { x: scale?.x ?? 1.0, y: scale?.y ?? 1.0, z: scale?.z ?? 1.0 },
            firstMaterialColor ?? "",
            secondMaterialColor ?? "",
        )

        EntityPool.add(this.pool, usingSlot, attachedObject)

        attachedObject.onCleanup(() => {
            EntityPool.remove(this.pool, usingSlot!, attachedObject) && gameNatives.removePlayerAttachedObject(this.player.id, usingSlot!)
        })

        return attachedObject
    }

    private getAvailableSlot() {
        for (let slot = 0; slot < MAX_PLAYER_ATTACHED_OBJECTS; slot++) {
            if (!this.pool.at(slot)) {
                return slot as PlayerAttachedObjectSlot
            }
        }

        return undefined
    }

    enterEditMode(attachedObject: PlayerAttachedObject) {
        this.player.cancelObjectEditMode()

        this.editingObject = attachedObject

        this.editingObject.onCleanup(() => {
            if (this.editingObject === attachedObject) {
                this.editingObject = undefined
                editPromise.reject(this.player, new Error("Player attached object was destroyed"))
            }
        })

        this.player.events.on("cancelObjectEditMode", () => {
            if (this.editingObject === attachedObject) {
                PlayerAttachedObject.refreshVisuals(attachedObject)

                this.editingObject = undefined
                editPromise.resolve(this.player, undefined)
            }
        })

        this.player.events.on("editAttachedObject", (slot, model, bone, offset, rotation, scale) => {
            if (this.editingObject !== attachedObject) {
                return
            }

            this.editingObject.offset = offset
            this.editingObject.rotation = rotation
            this.editingObject.scale = scale

            this.editingObject = undefined
            editPromise.resolve(this.player, { offset, rotation, scale })
        })

        gameNatives.editAttachedObject(this.player.id, attachedObject.slot)

        return editPromise.new(this.player)
    }
}
