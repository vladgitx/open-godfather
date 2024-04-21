import { CONFIG } from "@/shared/config"
import { sampNatives } from "@/wrapper"
import { type Vector3 } from "../vector3"
import { Entity } from "../entity"
import { type PlayerMp } from "../player"
import { VehicleParams } from "./params"
import { VehicleTextLabels } from "./text-label"

export class VehicleMp extends Entity {
    public occupants = new Set<PlayerMp>()

    readonly params = new VehicleParams(this)
    readonly textLabels = new VehicleTextLabels(this)

    private _primaryColor: number
    private _secondaryColor: number
    private _interior = CONFIG.vehicle.interior
    private _plate = CONFIG.vehicle.plate

    constructor(
        id: number,
        readonly model: number,
        primaryColor: number,
        secondaryColor: number,
    ) {
        super(id)

        this._primaryColor = primaryColor
        this._secondaryColor = secondaryColor

        sampNatives.linkVehicleToInterior(this.id, this._interior)
        sampNatives.setVehicleNumberPlate(this.id, this._plate)
    }

    set position(position: Vector3) {
        sampNatives.setPlayerPosition(this.id, position.x, position.y, position.z)
    }

    get position() {
        return sampNatives.getPlayerPosition(this.id)
    }

    set velocity(velocity: Vector3) {
        sampNatives.setVehicleVelocity(this.id, velocity)
    }

    get velocity() {
        return sampNatives.getVehicleVelocity(this.id)
    }

    set rotation(angle: number) {
        sampNatives.setVehicleZAngle(this.id, angle)
    }

    get rotation() {
        return sampNatives.getVehicleZAngle(this.id)
    }

    set world(value: number) {
        sampNatives.setVehicleVirtualWorld(this.id, value)
    }

    get world() {
        return sampNatives.getVehicleVirtualWorld(this.id)
    }

    set interior(interior: number) {
        this._interior = interior
        sampNatives.linkVehicleToInterior(this.id, interior)
    }

    get interior() {
        return this._interior
    }

    set health(health: number) {
        sampNatives.setVehicleHealth(this.id, health)
    }

    get health() {
        return sampNatives.getVehicleHealth(this.id)
    }

    set primaryColor(color: number) {
        this._primaryColor = color
        sampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get primaryColor() {
        return this._primaryColor
    }

    set secondaryColor(color: number) {
        this._secondaryColor = color
        sampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get secondaryColor() {
        return this._secondaryColor
    }

    set plate(plate: string) {
        this._plate = plate
        sampNatives.setVehicleNumberPlate(this.id, plate)
    }

    get plate() {
        return this._plate
    }
}
