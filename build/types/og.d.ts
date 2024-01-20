import { ServerMp } from "./modules/server";
import { EventBus } from "./modules/events";
import { PlayersMp } from "./modules/player/pool";
import { Vector3 as ogVector3 } from "./modules/vector3";
import { VehiclesMp } from "./modules/vehicle";
import { CommandsMp } from "./modules/commands";
import { TextLabelsMp } from "./modules/text-label";
export declare namespace og {
    const server: ServerMp;
    const events: EventBus;
    const players: PlayersMp;
    const vehicles: VehiclesMp;
    const commands: CommandsMp;
    const textLabels: TextLabelsMp;
    const Vector3: typeof ogVector3;
}
