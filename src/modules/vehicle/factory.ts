import { VehicleMp } from "./instance"

export class VehicleMpFactory {
    private static pool = new Map<number, VehicleMp>()

    static new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number) {
        if (this.at(vehicleId)) {
            return undefined
        }

        const vehicle = new VehicleMp(vehicleId, model, primaryColor, secondaryColor)
        this.pool.set(vehicleId, vehicle)

        return vehicle
    }

    static destroy(vehicle: VehicleMp) {
        const deleted = this.pool.delete(vehicle.id)
        vehicle.exists = false
        return deleted
    }

    static at(id: number) {
        return this.pool.get(id)
    }

    static get all() {
        return this.pool.values()
    }
}
