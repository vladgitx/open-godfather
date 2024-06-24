import { nativeFunctions } from "@/natives"
import { Vector3 } from "../vector3"
import { Entity } from "../entity"
import { type Player } from "../player"
import { VehicleParams } from "./params"

const REMOVE_PAINTJOB_ID = 3

export const vehicleInternalPaintjobId = new WeakMap<Vehicle, number>()

export class Vehicle extends Entity {
    public occupants = new Set<Player>()

    readonly params = new VehicleParams(this)

    private _primaryColor: number
    private _secondaryColor: number
    private _interior = 0
    private _plate = ""

    constructor(
        id: number,
        readonly model: number,
        primaryColor: number,
        secondaryColor: number,
    ) {
        super(id)

        this._primaryColor = primaryColor
        this._secondaryColor = secondaryColor

        nativeFunctions.linkVehicleToInterior(this.id, this._interior)
        nativeFunctions.setVehicleNumberPlate(this.id, this._plate)
    }

    getSpawnInfo() {
        const info = nativeFunctions.getVehicleSpawnInfo(this.id)
        return { position: new Vector3(info.spawnX, info.spawnY, info.spawnZ), angle: info.spawnAngle }
    }

    repair() {
        nativeFunctions.repairVehicle(this.id)
    }

    set position(position: Vector3) {
        nativeFunctions.setVehiclePosition(this.id, position.x, position.y, position.z)
    }

    get position() {
        return nativeFunctions.getVehiclePosition(this.id)
    }

    set velocity(velocity: Vector3) {
        nativeFunctions.setVehicleVelocity(this.id, velocity)
    }

    get velocity() {
        return nativeFunctions.getVehicleVelocity(this.id)
    }

    set rotation(angle: number) {
        nativeFunctions.setVehicleZAngle(this.id, angle)
    }

    get rotation() {
        return nativeFunctions.getVehicleZAngle(this.id)
    }

    set world(value: number) {
        nativeFunctions.setVehicleVirtualWorld(this.id, value)
    }

    get world() {
        return nativeFunctions.getVehicleVirtualWorld(this.id)
    }

    set interior(interior: number) {
        this._interior = interior
        nativeFunctions.linkVehicleToInterior(this.id, interior)
    }

    get interior() {
        return this._interior
    }

    set health(health: number) {
        nativeFunctions.setVehicleHealth(this.id, health)
    }

    get health() {
        return nativeFunctions.getVehicleHealth(this.id)
    }

    set primaryColor(color: number) {
        this._primaryColor = color
        nativeFunctions.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get primaryColor() {
        return this._primaryColor
    }

    set secondaryColor(color: number) {
        this._secondaryColor = color
        nativeFunctions.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get secondaryColor() {
        return this._secondaryColor
    }

    set plate(plate: string) {
        this._plate = plate
        nativeFunctions.setVehicleNumberPlate(this.id, plate)
    }

    get plate() {
        return this._plate
    }

    set paintjob(id: number | undefined) {
        if (id === undefined) {
            vehicleInternalPaintjobId.delete(this)
        } else {
            vehicleInternalPaintjobId.set(this, id)
        }

        nativeFunctions.changeVehiclePaintjob(this.id, id ?? REMOVE_PAINTJOB_ID)
    }

    get paintjob() {
        const paintjobId = vehicleInternalPaintjobId.get(this)
        return paintjobId === REMOVE_PAINTJOB_ID ? undefined : paintjobId
    }
}
