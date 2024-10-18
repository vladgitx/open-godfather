import { dispatcher } from "@/lib/dispatcher"
import { type Vehicle } from "../entity"
import { gameNatives } from "@/wrapper/game"
import { VEHICLE_WINDOW_STATE, type VehicleWindowState } from "@/wrapper/game/enums.public"

function updateVehicleParamsCarWindows(vehicle: Vehicle, windows: VehicleWindows) {
    gameNatives.setVehicleParamsCarWindows(
        vehicle.id,
        VEHICLE_WINDOW_STATE[windows.driver],
        VEHICLE_WINDOW_STATE[windows.passenger],
        VEHICLE_WINDOW_STATE[windows.backLeft],
        VEHICLE_WINDOW_STATE[windows.backRight],
    )
}

class VehicleWindows {
    private _driver: VehicleWindowState = "closed"
    private _passenger: VehicleWindowState = "closed"
    private _backLeft: VehicleWindowState = "closed"
    private _backRight: VehicleWindowState = "closed"

    constructor(private vehicle: Vehicle) {
        this.reset()
    }

    reset() {
        this._driver = "closed"
        this._passenger = "closed"
        this._backLeft = "closed"
        this._backRight = "closed"

        updateVehicleParamsCarWindows(this.vehicle, this)
    }

    set driver(value: VehicleWindowState) {
        this._driver = value
        updateVehicleParamsCarWindows(this.vehicle, this)
    }

    get driver() {
        return this._driver
    }

    set passenger(value: VehicleWindowState) {
        this._passenger = value
        updateVehicleParamsCarWindows(this.vehicle, this)
    }

    get passenger() {
        return this._passenger
    }

    set backLeft(value: VehicleWindowState) {
        this._backLeft = value
        updateVehicleParamsCarWindows(this.vehicle, this)
    }

    get backLeft() {
        return this._backLeft
    }

    set backRight(value: VehicleWindowState) {
        this._backRight = value
        updateVehicleParamsCarWindows(this.vehicle, this)
    }

    get backRight() {
        return this._backRight
    }
}

function updateVehicleParams(vehicle: Vehicle, params: VehicleParams) {
    gameNatives.setVehicleParamsEx(
        vehicle.id,
        params.engine === "on",
        params.lights === "on",
        params.alarm === "on",
        params.doors === "locked",
        params.hood === "open",
        params.trunk === "open",
        params.objective === "on",
    )
}

export class VehicleParams {
    readonly windows = new VehicleWindows(this.vehicle)

    private _engine: "on" | "off" = "off"
    private _lights: "on" | "off" = "off"
    private _alarm: "on" | "off" = "off"
    private _doors: "locked" | "unlocked" = "unlocked"
    private _bonnet: "closed" | "open" = "closed"
    private _boot: "closed" | "open" = "closed"
    private _objective: "on" | "off" = "off"

    constructor(private vehicle: Vehicle) {
        this.reset()
    }

    reset() {
        this._engine = "off"
        this._lights = "off"
        this._alarm = "off"
        this._doors = "unlocked"
        this._bonnet = "closed"
        this._boot = "closed"
        this._objective = "off"

        updateVehicleParams(this.vehicle, this)
    }

    set engine(value: "on" | "off") {
        const stateChanged = this._engine !== value

        this._engine = value
        updateVehicleParams(this.vehicle, this)

        stateChanged && dispatcher.emit("vehicleEngineStateChange", this.vehicle, value)
    }

    get engine() {
        return this._engine
    }

    set lights(value: "on" | "off") {
        this._lights = value
        updateVehicleParams(this.vehicle, this)
    }

    get lights() {
        return this._lights
    }

    set alarm(value: "on" | "off") {
        this._alarm = value
        updateVehicleParams(this.vehicle, this)
    }

    get alarm() {
        return this._alarm
    }

    set doors(value: "locked" | "unlocked") {
        this._doors = value
        updateVehicleParams(this.vehicle, this)
    }

    get doors() {
        return this._doors
    }

    set hood(value: "closed" | "open") {
        this._bonnet = value
        updateVehicleParams(this.vehicle, this)
    }

    get hood() {
        return this._bonnet
    }

    set trunk(value: "closed" | "open") {
        this._boot = value
        updateVehicleParams(this.vehicle, this)
    }

    get trunk() {
        return this._boot
    }

    set objective(value: "on" | "off") {
        this._objective = value
        updateVehicleParams(this.vehicle, this)
    }

    get objective() {
        return this._objective
    }
}
