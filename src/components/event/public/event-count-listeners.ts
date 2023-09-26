import { eventBus } from "../domain/event-bus"

export class EventCountListeners {
    static playerDamage() {
        return eventBus.listenerCount("playerDamage")
    }
}