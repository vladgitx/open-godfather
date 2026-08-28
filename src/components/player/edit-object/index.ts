import { type GameObject } from "@/components/game-object"
import { type Player } from "../entity"
import { dispatcher } from "@/lib/dispatcher"
import { EntityPromises } from "@/lib/entity"
import { streamerNatives } from "@/wrapper/streamer"
import { type Vector3 } from "@/lib/vector3"

const EDITING_OBJECT_UUID_KEY = "internal:::editing-object-uuid"
const editPromise = new EntityPromises<Player, { position: Vector3; rotation: Vector3 } | undefined>()

dispatcher.on("playerEditObject", (player, object, response, position, rotation) => {
    const expectedUuid = player.variables.get(EDITING_OBJECT_UUID_KEY) as string | undefined

    if (expectedUuid === object.uuid) {
        if (response === "cancel") {
            editPromise.resolve(player, undefined)
        } else if (response === "final") {
            editPromise.resolve(player, { position, rotation })
        }
    } else if (response !== "update") {
        editPromise.reject(
            player,
            new Error(
                `[Warning] Player ${player.name} (${player.id}) triggered an edit response for an untracked object (Expected: ${expectedUuid}, Got: ${object.uuid}).`,
            ),
        )
    }
})

export async function beginObjectEditing(
    player: Player,
    object: GameObject,
): Promise<{ position: Vector3; rotation: Vector3 } | undefined> {
    if (!streamerNatives.editDynamicObject(player.id, object.id)) {
        return undefined
    }

    player.variables.set(EDITING_OBJECT_UUID_KEY, object.uuid)

    const unsubscribeObjectCleanup = object.onCleanup(() => {
        editPromise.reject(player, new Error(`Object ID ${object.id} was destroyed while being edited by player ${player.name}.`))
    })

    const unsubcribeCancelEdit = player.events.on("cancelObjectEdition", () => {
        editPromise.reject(player, new Error("CancelEdit was called on player while editing an object"))
    })

    return editPromise.new(player).finally(() => {
        player.variables.delete(EDITING_OBJECT_UUID_KEY)

        unsubscribeObjectCleanup()
        unsubcribeCancelEdit()
    })
}
