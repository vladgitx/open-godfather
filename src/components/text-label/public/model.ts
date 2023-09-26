import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { Entity } from "../../entity"
import { Player } from "../../player"
import { Vehicle } from "../../vehicle"
import { attachLabelToPlayer } from "../domain/attach-to-player"
import { attachLabelToVehicle } from "../domain/attach-to-vehicle"
import { labelsPool } from "../domain/pool"

export class TextLabel extends Entity {
    #text: string
    private color: string
    private attachedToPlayer: boolean
    private attachedToVehicle: boolean

    constructor(id: number, text: string, color: string) {
        super(id, labelsPool)

        this.#text = text
        this.color = color
        this.attachedToPlayer = false
        this.attachedToVehicle = false
    }

    attachToPlayer(player: Player, offset: WorldPosition) {
        if (this.attachedToPlayer || this.attachedToVehicle) {
            return false
        }
        this.attachedToPlayer = true
        return attachLabelToPlayer(this, player, offset)
    }

    attachToVehicle(vehicle: Vehicle, offset: WorldPosition) {
        if (this.attachedToPlayer || this.attachedToVehicle) {
            return false
        }
        this.attachedToVehicle = true
        return attachLabelToVehicle(this, vehicle, offset)
    }

    setText(text: string, color?: string) {
        const newColor = color || this.color
        if (SampNatives.update3DTextLabelText(this.id, newColor, text)) {
            this.#text = text
            this.color = newColor
        }
    }

    getText() {
        return this.#text
    }
}