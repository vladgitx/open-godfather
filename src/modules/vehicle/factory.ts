import { VehicleMp } from "./entity"

class VehicleFactory {
    private pool = new Map<number, VehicleMp>()

    new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number) {
        if (this.at(vehicleId)) {
            return undefined
        }

        const vehicle = new VehicleMp(vehicleId, model, primaryColor, secondaryColor)
        this.pool.set(vehicleId, vehicle)

        return vehicle
    }

    destroy(vehicle: VehicleMp) {
        this.pool.delete(vehicle.id)
        vehicle.exists = false
    }

    at(id: number) {
        return this.pool.get(id)
    }

    get all() {
        return this.pool.values()
    }
}

export const vehicleFactory = new VehicleFactory()
