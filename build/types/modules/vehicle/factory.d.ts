import { VehicleMp } from "./entity";
declare class VehicleFactory {
    private pool;
    new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number): VehicleMp | undefined;
    destroy(vehicle: VehicleMp): void;
    at(id: number): VehicleMp | undefined;
    get all(): IterableIterator<VehicleMp>;
}
export declare const vehicleFactory: VehicleFactory;
export {};
