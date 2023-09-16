import { SampNode } from "../scripting-api"
import { Commands } from "./commands"
import { Events } from "./events"
import { Players } from "./players"
import { SampServer } from "./samp-server"
import { Vehicles } from "./vehicles"

export type OpenConfig = {
    name?: string
    language?: string
    website?: string
    map?: string
    mode?: string
    stuntBonuses?: boolean
    nametagDrawDistance?: number
    hour?: number
    weather?: number
}

export class OpenGf {
    readonly events: Events
    readonly server: SampServer
    readonly players: Players
    readonly vehicles: Vehicles
    readonly commands: Commands

    constructor(config?: OpenConfig) {
        this.events = new Events()
        this.server = new SampServer(config)
        this.players = new Players()
        this.vehicles = new Vehicles()
        this.commands = new Commands()

        SampNode.on("OnGameModeInit", () => {
            this.events.emit("init")
        })
        
        SampNode.on("OnGameModeExit", () => {
            this.events.emit("exit")
        })
    }
}