import { nativeEvents, nativeFunctions } from "@/natives"
import { playerHandler } from "../../handler"
import { editPromiseFactory } from "../edit-promises"
import { Vector3 } from "@/modules/vector3"
import { dispatcher } from "@/modules/dispatcher"

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
            nativeFunctions.setPlayerAttachedObject(
                player.id,
                attachedObject.id,
                attachedObject.model,
                attachedObject.bone,
                attachedObject.offset.x,
                attachedObject.offset.y,
                attachedObject.offset.z,
                attachedObject.rotation.x,
                attachedObject.rotation.y,
                attachedObject.rotation.z,
                attachedObject.scale.x,
                attachedObject.scale.y,
                attachedObject.scale.z,
                attachedObject.firstMaterialColor,
                attachedObject.secondMaterialColor,
            )

            editPromiseFactory.destroy(player, undefined)
        } else {
            attachedObject.setVariable("playerAttObj::internal::offset", new Vector3(offX, offY, offZ))
            attachedObject.setVariable("playerAttObj::internal::rotation", new Vector3(rotX, rotY, rotZ))
            attachedObject.setVariable("playerAttObj::internal::scale", new Vector3(scaleX, scaleY, scaleZ))

            editPromiseFactory.destroy(player, {
                offset: new Vector3(offX, offY, offZ),
                rotation: new Vector3(rotX, rotY, rotZ),
                scale: new Vector3(scaleX, scaleY, scaleZ),
            })
        }
    },
)

dispatcher.on("playerDisconnect", (player) => {
    editPromiseFactory.destroy(player, undefined)
})
