import { nativeFunctions } from "@/wrapper"
import { Vector3 } from "../../core/vector3"
import { VehicleParams } from "./params"
import { getVehicleOccupants } from "./@events/occupants"
import { INVALID_VEHICLE_ID } from "@/wrapper/functions"
import { SampEntity } from "@/core/samp-entity"

const REMOVE_PAINTJOB_ID = 3

export const vehicleInternalPaintjobId = new WeakMap<Vehicle, number>()

export class Vehicle extends SampEntity {
    readonly params = new VehicleParams(this)

    private _primaryColor: number
    private _secondaryColor: number
    private _interior = 0
    private _plate = ""

    constructor(
        sampId: number,
        readonly model: number,
        primaryColor: number,
        secondaryColor: number,
    ) {
        super(sampId, INVALID_VEHICLE_ID)

        this._primaryColor = primaryColor
        this._secondaryColor = secondaryColor

        nativeFunctions.linkVehicleToInterior(this.sampId, this._interior)
        nativeFunctions.setVehicleNumberPlate(this.sampId, this._plate)
    }

    getDamageStatus() {
        return nativeFunctions.getVehicleDamageStatus(this.sampId)
    }

    setDamageStatus(status: Partial<{ panels: number; doors: number; lights: number; tires: number }>) {
        const currentStatus = this.getDamageStatus()

        nativeFunctions.updateVehicleDamageStatus(
            this.sampId,
            status.panels ?? currentStatus.panels,
            status.doors ?? currentStatus.doors,
            status.lights ?? currentStatus.lights,
            status.tires ?? currentStatus.tires,
        )
    }

    getSpawnInfo() {
        const info = nativeFunctions.getVehicleSpawnInfo(this.sampId)
        return { position: new Vector3(info.spawnX, info.spawnY, info.spawnZ), angle: info.spawnAngle }
    }

    repair() {
        nativeFunctions.repairVehicle(this.sampId)
    }

    set position(position: Vector3) {
        nativeFunctions.setVehiclePosition(this.sampId, position.x, position.y, position.z)
    }

    get position() {
        return nativeFunctions.getVehiclePosition(this.sampId)
    }

    set velocity(velocity: Vector3) {
        nativeFunctions.setVehicleVelocity(this.sampId, velocity)
    }

    get velocity() {
        return nativeFunctions.getVehicleVelocity(this.sampId)
    }

    set rotation(angle: number) {
        nativeFunctions.setVehicleZAngle(this.sampId, angle)
    }

    get rotation() {
        return nativeFunctions.getVehicleZAngle(this.sampId)
    }

    set world(value: number) {
        nativeFunctions.setVehicleVirtualWorld(this.sampId, value)
    }

    get world() {
        return nativeFunctions.getVehicleVirtualWorld(this.sampId)
    }

    set interior(interior: number) {
        this._interior = interior
        nativeFunctions.linkVehicleToInterior(this.sampId, interior)
    }

    get interior() {
        return this._interior
    }

    set health(health: number) {
        nativeFunctions.setVehicleHealth(this.sampId, health)
    }

    get health() {
        return nativeFunctions.getVehicleHealth(this.sampId)
    }

    set primaryColor(color: number) {
        this._primaryColor = color
        nativeFunctions.changeVehicleColor(this.sampId, this._primaryColor, this._secondaryColor)
    }

    get primaryColor() {
        return this._primaryColor
    }

    set secondaryColor(color: number) {
        this._secondaryColor = color
        nativeFunctions.changeVehicleColor(this.sampId, this._primaryColor, this._secondaryColor)
    }

    get secondaryColor() {
        return this._secondaryColor
    }

    set plate(plate: string) {
        this._plate = plate
        nativeFunctions.setVehicleNumberPlate(this.sampId, plate)
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

        nativeFunctions.changeVehiclePaintjob(this.sampId, id ?? REMOVE_PAINTJOB_ID)
    }

    get paintjob() {
        const paintjobId = vehicleInternalPaintjobId.get(this)
        return paintjobId === REMOVE_PAINTJOB_ID ? undefined : paintjobId
    }

    get occupants() {
        return getVehicleOccupants(this)
    }
}
