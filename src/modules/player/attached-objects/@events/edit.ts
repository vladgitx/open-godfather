import { nativeEvents, nativeFunctions } from "@/natives"
import { playerHandler } from "../../handler"
import { editPromiseFactory } from "../edit-promises"
import { Vector3 } from "@/modules/vector3"
import { dispatcher } from "@/modules/dispatcher"
import { type PlayerAttachedObject } from "../entity"
import { type Player } from "../../entity"

function resetEditingObject(player: Player, object: PlayerAttachedObject) {
    nativeFunctions.setPlayerAttachedObject(
        player.id,
        object.id,
        object.model,
        object.bone,
        object.offset.x,
        object.offset.y,
        object.offset.z,
        object.rotation.x,
        object.rotation.y,
        object.rotation.z,
        object.scale.x,
        object.scale.y,
        object.scale.z,
        object.firstMaterialColor,
        object.secondMaterialColor,
    )

    editPromiseFactory.destroy(player, {
        changes: false,
        offset: object.offset,
        rotation: object.rotation,
        scale: object.scale,
    })

    player.setVariable("playerAttObj::internal::editObject", undefined)
}

nativeEvents.onPlayerEditAttachedObject(
    (playerid, response, index, model, bone, offX, offY, offZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ) => {
        const player = playerHandler.at(playerid)

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
            attachedObject.setVariable("playerAttObj::internal::offset", new Vector3(offX, offY, offZ))
            attachedObject.setVariable("playerAttObj::internal::rotation", new Vector3(rotX, rotY, rotZ))
            attachedObject.setVariable("playerAttObj::internal::scale", new Vector3(scaleX, scaleY, scaleZ))

            editPromiseFactory.destroy(player, {
                changes: true,
                offset: new Vector3(offX, offY, offZ),
                rotation: new Vector3(rotX, rotY, rotZ),
                scale: new Vector3(scaleX, scaleY, scaleZ),
            })

            player.setVariable("playerAttObj::internal::editObject", undefined)
        }
    },
)

dispatcher.on("playerExitObjectEditMode", (player) => {
    const attachedObject = player.getVariable("playerAttObj::internal::editObject") as PlayerAttachedObject | undefined

    if (attachedObject) {
        resetEditingObject(player, attachedObject)
    }

    player.setVariable("playerAttObj::internal::editObject", undefined)
})

dispatcher.on("playerDisconnect", (player) => {
    editPromiseFactory.destroy(player, undefined)
})
