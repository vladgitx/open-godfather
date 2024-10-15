import { nativeEvents } from "@/wrapper"
import { playerHandler } from "../../handler"
import { Vector3 } from "@/core/vector3"
import { dispatcher } from "@/core/dispatcher"
import {
    attachedObjInternalOffset,
    attachedObjInternalRotation,
    attachedObjInternalScale,
    setPlayerAttachedObject,
    type PlayerAttachedObject,
} from "../entity"
import { type Player } from "../../entity"
import { editModePromises, editingObject } from "../instance"

function resetEditingObject(player: Player, object: PlayerAttachedObject) {
    setPlayerAttachedObject(player, object)

    editModePromises.resolve(player, undefined)
    editingObject.delete(player)
}

nativeEvents.onPlayerEditAttachedObject(
    (playerid, response, index, model, bone, offX, offY, offZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ) => {
        const player = playerHandler.atSampId(playerid)

        if (!player) {
            return
        }

        const attachedObject = player.attachedObjects.at(index)

        if (!attachedObject) {
            return
        }

        if (response !== 1) {
            resetEditingObject(player, attachedObject)
        } else {
            attachedObjInternalOffset.set(attachedObject, new Vector3(offX, offY, offZ))
            attachedObjInternalRotation.set(attachedObject, new Vector3(rotX, rotY, rotZ))
            attachedObjInternalScale.set(attachedObject, new Vector3(scaleX, scaleY, scaleZ))

            editModePromises.resolve(player, {
                offset: new Vector3(offX, offY, offZ),
                rotation: new Vector3(rotX, rotY, rotZ),
                scale: new Vector3(scaleX, scaleY, scaleZ),
            })

            editingObject.delete(player)
        }
    },
)

dispatcher.on("playerExitObjectEditMode", (player) => {
    const object = editingObject.get(player)

    if (object) {
        resetEditingObject(player, object)
    }
})
