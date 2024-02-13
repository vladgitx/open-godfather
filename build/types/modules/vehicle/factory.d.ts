import { VehicleMp } from "./entity";
export declare class VehicleMpFactory {
    private static pool;
    static new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number): VehicleMp | undefined;
    static destroy(vehicle: VehicleMp): boolean;
    static at(id: number): VehicleMp | undefined;
    static get all(): IterableIterator<VehicleMp>;
}
