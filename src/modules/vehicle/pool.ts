import { CONFIG } from "../../shared/config"
import { SampNatives } from "../../natives"
import { Vector3 } from "../vector3"
import { VehicleMpFactory } from "./factory"
import { VehicleMp } from "./instance"

export class VehiclesMp {
    private factory = new VehicleMpFactory()

    constructor() {}

	new(
		model: number,
		position: Vector3,
		rotation: number,
		primaryColor = CONFIG.vehicle.primaryColor,
		secondaryColor = CONFIG.vehicle.secondaryColor,
		respawnDelay = CONFIG.vehicle.respawnDelay,
		siren = CONFIG.vehicle.siren,
	) {
		const vehicleId = SampNatives.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren)
		if (vehicleId === undefined) {
			return undefined
		}

		return this.factory.new(vehicleId, model, primaryColor, secondaryColor)
	}

    destroy(vehicle: VehicleMp) {
		SampNatives.destroyVehicle(vehicle.id)
		this.factory.destroy(vehicle)
	}

	at(id: number) {
		return this.factory.at(id)
	}
}