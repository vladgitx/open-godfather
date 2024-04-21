import { Vector3 } from "../modules/vector3";
import { type VehicleParamsType } from "../modules/vehicle";
export declare const CONFIG: {
    entity: {
        invalidId: number;
    };
    player: {
        team: number;
        color: string;
        skin: number;
        cash: number;
        spawn: {
            position: Vector3;
            rotation: number;
            world: number;
            interior: number;
        };
    };
    vehicle: {
        interior: number;
        plate: string;
        primaryColor: number;
        secondaryColor: number;
        respawnDelay: number;
        siren: boolean;
        params: VehicleParamsType;
    };
    message: {
        color: string;
    };
    chatBubble: {
        color: string;
        distance: number;
        expire: number;
    };
    textLabel: {
        color: string;
        distance: number;
        world: number;
        testLos: boolean;
    };
    playerAttachedObjects: {
        limit: number;
    };
};
