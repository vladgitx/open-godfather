import { CONFIG } from "../../shared/config"
import { SampNatives } from "../../wrapper"
import { Vector3 } from "../vector3"
import { Entity } from "../entity"
import { PlayerMp } from "../player"
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

        SampNatives.linkVehicleToInterior(this.id, this._interior)
        SampNatives.setVehicleNumberPlate(this.id, this._plate)
    }

    set position(position: Vector3) {
        SampNatives.setPlayerPosition(this.id, position.x, position.y, position.z)
    }

    get position() {
        return SampNatives.getPlayerPosition(this.id)
    }

    set velocity(velocity: Vector3) {
        SampNatives.setVehicleVelocity(this.id, velocity)
    }

    get velocity() {
        return SampNatives.getVehicleVelocity(this.id)
    }

    set rotation(angle: number) {
        SampNatives.setVehicleZAngle(this.id, angle)
    }

    get rotation() {
        return SampNatives.getVehicleZAngle(this.id)
    }

    set world(value: number) {
        SampNatives.setVehicleVirtualWorld(this.id, value)
    }

    get world() {
        return SampNatives.getVehicleVirtualWorld(this.id)
    }

    set interior(interior: number) {
        this._interior = interior
        SampNatives.linkVehicleToInterior(this.id, interior)
    }

    get interior() {
        return this._interior
    }

    set health(health: number) {
        SampNatives.setVehicleHealth(this.id, health)
    }

    get health() {
        return SampNatives.getVehicleHealth(this.id)
    }

    set primaryColor(color: number) {
        this._primaryColor = color
        SampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get primaryColor() {
        return this._primaryColor
    }

    set secondaryColor(color: number) {
        this._secondaryColor = color
        SampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get secondaryColor() {
        return this._secondaryColor
    }

    set plate(plate: string) {
        this._plate = plate
        SampNatives.setVehicleNumberPlate(this.id, plate)
    }

    get plate() {
        return this._plate
    }
}
