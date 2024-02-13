import { VehicleMp } from ".."
import { SampNatives } from "../../../wrapper"
import { CONFIG } from "../../../shared/config"

export class VehicleParams {
    private _engine: "on" | "off" = CONFIG.vehicle.params.engine
    private _lights: "on" | "off" = CONFIG.vehicle.params.lights
    private _alarm: "on" | "off" = CONFIG.vehicle.params.alarm
    private _doors: "locked" | "unlocked" = CONFIG.vehicle.params.doors
    private _bonnet: "closed" | "open" = CONFIG.vehicle.params.bonnet
    private _boot: "closed" | "open" = CONFIG.vehicle.params.boot
    private _objective: "on" | "off" = CONFIG.vehicle.params.objective

    constructor(private vehicle: VehicleMp) {
        SampNatives.setVehicleParamsEx(
            vehicle.id,
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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

        const params = SampNatives.getVehicleParamsEx(this.vehicle.id)
        SampNatives.setVehicleParamsEx(
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
