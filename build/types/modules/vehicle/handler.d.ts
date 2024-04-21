import { type Vector3 } from "../vector3";
import { type VehicleMp } from "./entity";
declare class VehicleHandler {
    new(model: number, position: Vector3, rotation: number, primaryColor?: number, secondaryColor?: number, respawnDelay?: number, siren?: boolean): VehicleMp | undefined;
    destroy(vehicle: VehicleMp): void;
    at(id: number): VehicleMp | undefined;
    getClosest(position: Vector3, range: number, world?: number, interior?: number): Map<VehicleMp, number>;
    get all(): IterableIterator<VehicleMp>;
}
export declare const vehicleHandler: VehicleHandler;
export {};
