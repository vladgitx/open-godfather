import { OpenGf } from "./classes/open-gf"
export const og = new OpenGf()

export {
    Entity,
    GenericEntity,
    WorldEntity,
} from "./classes/entity"
export { Player } from "./classes/player"
export { Vehicle } from "./classes/vehicle"

import "./features/callbacks/player-generic"
import "./features/callbacks/enter-exit-car"

export * from "./common/enums"
export * from "./common/types"
export {
    vehicleNames,
    getVehicleModelName,
} from "./common/vehicle-names"