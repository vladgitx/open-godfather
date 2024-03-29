import { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "../../../shared/enums"
import { CommandMp } from "../../commands"
import { PlayerMp } from "../../player"
import { Vector3 } from "../../vector3"
import { VehicleMp } from "../../vehicle"

type TServerEvents = {
    init: []
    exit: []
}

type TPlayerEvents = {
    playerConnect: [PlayerMp]
    playerDisconnect: [PlayerMp, KickReasonsEnum]
    playerCommand: [PlayerMp, string, CommandMp | undefined, () => void]
    playerSpawn: [PlayerMp]
    playerFirstSpawn: [PlayerMp]
    playerText: [PlayerMp, string]
    playerStateChange: [PlayerMp, PlayerStatesEnum, PlayerStatesEnum]
    playerEnterVehicle: [PlayerMp, VehicleMp]
    playerExitVehicle: [PlayerMp, VehicleMp | undefined]
    playerStartEnterVehicle: [PlayerMp, VehicleMp, boolean]
    playerStartExitVehicle: [PlayerMp, VehicleMp]
    playerDamage: [PlayerMp, PlayerMp | undefined, number, WeaponsEnum, BodyPartsEnum]
    playerDeath: [PlayerMp, PlayerMp | undefined, WeaponsEnum]
    playerShoot: [PlayerMp, WeaponsEnum, PlayerMp | VehicleMp | undefined, Vector3]
}

type TVehicleEvents = {
    vehicleCreate: [VehicleMp]
    vehicleDestroy: [VehicleMp]
}

export type TEventMap = TServerEvents & TPlayerEvents & TVehicleEvents
