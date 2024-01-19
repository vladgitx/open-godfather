import { PlayersMp } from "./modules/player"
import { Vector3 as ogVector3 } from "./modules/vector3"
import { VehiclesMp } from "./modules/vehicle"

export namespace og {
    export const players = new PlayersMp()
    export const vehicles = new VehiclesMp()
    export const Vector3 = ogVector3
}