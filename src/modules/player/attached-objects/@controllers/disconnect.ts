import { eventsMp } from "../../../../singletons/events"

eventsMp.on("playerDisconnect", (player) => {
    player.attachedObjects.destroyAll()
})
