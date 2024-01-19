import { VehicleMp } from "./instance"

export class VehicleMpFactory {
	private pool = new Map<number, VehicleMp>()

	constructor() {}

	new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number) {
        if (this.at(vehicleId)) {
            return undefined
        }

		const vehicle = new VehicleMp(vehicleId, model, primaryColor, secondaryColor)
		this.pool.set(vehicleId, vehicle)

		return vehicle
	}

	destroy(vehicle: VehicleMp) {
		return this.pool.delete(vehicle.id)
	}

	at(id: number) {
		return this.pool.get(id)
	}
}
