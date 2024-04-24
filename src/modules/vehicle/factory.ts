import { Vehicle } from "./entity"

class VehicleFactory {
    pool = new Map<number, Vehicle>()

    new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number) {
        if (this.pool.get(vehicleId)) {
            return undefined
        }

        const vehicle = new Vehicle(vehicleId, model, primaryColor, secondaryColor)
        this.pool.set(vehicleId, vehicle)

        return vehicle
    }

    destroy(vehicle: Vehicle) {
        this.pool.delete(vehicle.id)
        vehicle.exists = false
    }
}

export const vehicleFactory = new VehicleFactory()
