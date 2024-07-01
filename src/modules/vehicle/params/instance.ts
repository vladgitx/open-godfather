import { type Vehicle } from "../entity"
import { nativeFunctions } from "@/natives"

class VehicleWindows {
    private _driver: "open" | "closed" = "closed"
    private _passenger: "open" | "closed" = "closed"
    private _backLeft: "open" | "closed" = "closed"
    private _backRight: "open" | "closed" = "closed"

    constructor(private vehicle: Vehicle) {
        this.reset()
    }

    reset() {
        const state = "closed" as "open" | "closed"

        this._driver = state
        this._passenger = state
        this._backLeft = state
        this._backRight = state

        nativeFunctions.setVehicleParamsCarWindows(this.vehicle.id, state !== "open", state !== "open", state !== "open", state !== "open")
    }

    set driver(value: "open" | "closed") {
        this._driver = value

        nativeFunctions.setVehicleParamsCarWindows(
            this.vehicle.id,
            this._driver !== "open",
            this._passenger !== "open",
            this._backLeft !== "open",
            this._backRight !== "open",
        )
    }

    get driver() {
        return this._driver
    }

    set passenger(value: "open" | "closed") {
        this._passenger = value

        nativeFunctions.setVehicleParamsCarWindows(
            this.vehicle.id,
            this._driver !== "open",
            this._passenger !== "open",
            this._backLeft !== "open",
            this._backRight !== "open",
        )
    }

    get passenger() {
        return this._passenger
    }

    set backLeft(value: "open" | "closed") {
        this._backLeft = value

        nativeFunctions.setVehicleParamsCarWindows(
            this.vehicle.id,
            this._driver !== "open",
            this._passenger !== "open",
            this._backLeft !== "open",
            this._backRight !== "open",
        )
    }

    get backLeft() {
        return this._backLeft
    }

    set backRight(value: "open" | "closed") {
        this._backRight = value

        nativeFunctions.setVehicleParamsCarWindows(
            this.vehicle.id,
            this._driver !== "open",
            this._passenger !== "open",
            this._backLeft !== "open",
            this._backRight !== "open",
        )
    }

    get backRight() {
        return this._backRight
    }
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
        this._engine = "off" as "on" | "off"
        this._lights = "off" as "on" | "off"
        this._alarm = "off" as "on" | "off"
        this._doors = "unlocked" as "locked" | "unlocked"
        this._bonnet = "closed" as "open" | "closed"
        this._boot = "closed" as "open" | "closed"
        this._objective = "off" as "on" | "off"

        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            this._engine === "on",
            this._lights === "on",
            this._alarm === "on",
            this._doors === "locked",
            this._bonnet === "open",
            this._boot === "open",
            this._objective === "on",
        )
    }

    set engine(value: "on" | "off") {
        this._engine = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            this._engine === "on",
            params.lights,
            params.alarm,
            params.doors,
            params.bonnet,
            params.boot,
            params.objective,
        )
    }

    get engine() {
        return this._engine
    }

    set lights(value: "on" | "off") {
        this._lights = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            params.engine,
            this._lights === "on",
            params.alarm,
            params.doors,
            params.bonnet,
            params.boot,
            params.objective,
        )
    }

    get lights() {
        return this._lights
    }

    set alarm(value: "on" | "off") {
        this._alarm = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            params.engine,
            params.lights,
            this._alarm === "on",
            params.doors,
            params.bonnet,
            params.boot,
            params.objective,
        )
    }

    get alarm() {
        return this._alarm
    }

    set doors(value: "locked" | "unlocked") {
        this._doors = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            params.engine,
            params.lights,
            params.alarm,
            this._doors === "locked",
            params.bonnet,
            params.boot,
            params.objective,
        )
    }

    get doors() {
        return this._doors
    }

    set hood(value: "closed" | "open") {
        this._bonnet = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            params.engine,
            params.lights,
            params.alarm,
            params.doors,
            this._bonnet === "open",
            params.boot,
            params.objective,
        )
    }

    get hood() {
        return this._bonnet
    }

    set trunk(value: "closed" | "open") {
        this._boot = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            params.engine,
            params.lights,
            params.alarm,
            params.doors,
            params.bonnet,
            this._boot === "open",
            params.objective,
        )
    }

    get trunk() {
        return this._boot
    }

    set objective(value: "on" | "off") {
        this._objective = value

        const params = nativeFunctions.getVehicleParamsEx(this.vehicle.id)
        nativeFunctions.setVehicleParamsEx(
            this.vehicle.id,
            params.engine,
            params.lights,
            params.alarm,
            params.doors,
            params.bonnet,
            params.boot,
            this._objective === "on",
        )
    }

    get objective() {
        return this._objective
    }
}
