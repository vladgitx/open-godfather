import { OpenCommands } from "../domain/commands"
import { OpenEvents } from "../domain/events"
import { OpenPlayers } from "../domain/players"
import { SampServer } from "../domain/server"
import { OpenConfig } from "./types"
import { OpenVehicles } from "../domain/vehicles"
import { TextLabels } from "../domain/text-labels"
import SampNatives from "../../shared/samp-natives"

export class OpenGf {
    readonly server: SampServer
    readonly events: OpenEvents
    readonly players: OpenPlayers
    readonly vehicles: OpenVehicles
    readonly commands: OpenCommands
    readonly textLabels: TextLabels
    readonly callNative = SampNatives.callNative

    constructor(config?: Partial<OpenConfig>) {
        this.server = new SampServer(config)
        this.events = new OpenEvents()
        this.players = new OpenPlayers()
        this.vehicles = new OpenVehicles()
        this.commands = new OpenCommands()
        this.textLabels = new TextLabels()
    }
}