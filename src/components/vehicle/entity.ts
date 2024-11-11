import { gameNatives, INVALID_VEHICLE_ID } from "@/wrapper/game"
import { type Position3, Vector3 } from "../../lib/vector3"
import { VehicleParams } from "./params"
import { getVehicleOccupants } from "./@events/occupants"
import { GameEntity } from "@/lib/entity/game"
import { type VehicleEventMap } from "./@events/entity-event-bus"
import { type Player } from "../player"
import { vehicles } from "./handler"

const REMOVE_PAINTJOB_ID = 3

export class Vehicle extends GameEntity<VehicleEventMap> {
    readonly params = new VehicleParams(this)

    private _primaryColor: number
    private _secondaryColor: number
    private _interior = 0
    private _plate = ""
    private _paintjobId: number | undefined

    constructor(
        gameId: number,
        readonly model: number,
        primaryColor: number,
        secondaryColor: number,
    ) {
        super(gameId, INVALID_VEHICLE_ID)

        this._primaryColor = primaryColor
        this._secondaryColor = secondaryColor

        gameNatives.linkVehicleToInterior(this.id, this._interior)
        gameNatives.setVehicleNumberPlate(this.id, this._plate)
    }

    getDamageStatus() {
        return gameNatives.getVehicleDamageStatus(this.id)
    }

    setDamageStatus(status: Partial<{ panels: number; doors: number; lights: number; tires: number }>) {
        const currentStatus = this.getDamageStatus()

        gameNatives.updateVehicleDamageStatus(
            this.id,
            status.panels ?? currentStatus.panels,
            status.doors ?? currentStatus.doors,
            status.lights ?? currentStatus.lights,
            status.tires ?? currentStatus.tires,
        )
    }

    getSpawnInfo() {
        const info = gameNatives.getVehicleSpawnInfo(this.id)
        return { position: new Vector3(info.spawnX, info.spawnY, info.spawnZ), angle: info.spawnAngle }
    }

    repair() {
        gameNatives.repairVehicle(this.id)
    }

    isStreamedInFor(player: Player) {
        return gameNatives.isVehicleStreamedIn(this.id, player.id)
    }

    attachTrailer(vehicle: Vehicle) {
        gameNatives.attachTrailerToVehicle(vehicle.id, this.id)
    }

    detachTrailer() {
        gameNatives.detachTrailerFromVehicle(this.id)
    }

    hasAnyTrailerAttached() {
        return gameNatives.isTrailerAttachedToVehicle(this.id)
    }

    getAttachedTrailer() {
        const id = gameNatives.getVehicleTrailer(this.id)
        return id === undefined ? undefined : vehicles.pool.at(id)
    }

    set position(position: Position3) {
        gameNatives.setVehiclePosition(this.id, position.x, position.y, position.z)
    }

    get position(): Vector3 {
        return new Vector3(gameNatives.getVehiclePosition(this.id))
    }

    set velocity(velocity: Position3) {
        gameNatives.setVehicleVelocity(this.id, velocity)
    }

    get velocity() {
        return gameNatives.getVehicleVelocity(this.id)
    }

    set rotation(angle: number) {
        gameNatives.setVehicleZAngle(this.id, angle)
    }

    get rotation() {
        return gameNatives.getVehicleZAngle(this.id)
    }

    set world(value: number) {
        gameNatives.setVehicleVirtualWorld(this.id, value)
    }

    get world() {
        return gameNatives.getVehicleVirtualWorld(this.id)
    }

    set interior(interior: number) {
        this._interior = interior
        gameNatives.linkVehicleToInterior(this.id, interior)
    }

    get interior() {
        return this._interior
    }

    set health(health: number) {
        gameNatives.setVehicleHealth(this.id, health)
    }

    get health() {
        return gameNatives.getVehicleHealth(this.id)
    }

    set primaryColor(color: number) {
        this._primaryColor = color
        gameNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get primaryColor() {
        return this._primaryColor
    }

    set secondaryColor(color: number) {
        this._secondaryColor = color
        gameNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor)
    }

    get secondaryColor() {
        return this._secondaryColor
    }

    set plate(plate: string) {
        this._plate = plate
        gameNatives.setVehicleNumberPlate(this.id, plate)
    }

    get plate() {
        return this._plate
    }

    set paintjob(id: number | undefined) {
        this._paintjobId = id
        gameNatives.changeVehiclePaintjob(this.id, id ?? REMOVE_PAINTJOB_ID)
    }

    get paintjob() {
        return this._paintjobId
    }

    static setInternalPaintjobId(vehicle: Vehicle, id: number) {
        vehicle._paintjobId = id === REMOVE_PAINTJOB_ID ? undefined : id
    }

    get occupants() {
        return getVehicleOccupants(this)
    }
}
