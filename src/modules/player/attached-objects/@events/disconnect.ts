import { dispatcher } from "@/modules/dispatcher"

dispatcher.on("playerDisconnect", (player) => {
    player.attachedObjects.destroyAll()
})
