import { gameNatives } from "@/wrapper/game"
import { type Position3, Vector3 } from "../../lib/vector3"
import { type Vehicle, vehicles } from "../vehicle"
import { PlayerDialog } from "./dialog"
import { PlayerWeapons } from "./weapons"
import { putInVehicleWithEvent } from "./@events/enter-exit-car"
import { dispatcher } from "../../lib/dispatcher"
import { type PlayerEventMap } from "./@events/entity-event-bus"
import { INVALID_PLAYER_ID } from "@/wrapper/game"
import {
    CAMERA_CUT_STYLES,
    CAMERA_MODES,
    type CameraCutStyle,
    PLAYER_STATES,
    type PlayerState,
    SPECIAL_ACTIONS,
    type SpecialAction,
    VEHICLE_SEATS,
    type VehicleSeat,
} from "@/wrapper/game/enums.public"
import { getEnumKeyByValue } from "@/lib/utils"
import { PlayerAnimations } from "./animations"
import { GameEntity } from "@/lib/entity/game"
import { PlayerAttachedObjectHandler } from "./attached-objects"
import { PlayerTextdrawHandler } from "./textdraw"

export const DEFAULT_PLAYER_TEAM = 0

export class Player extends GameEntity<PlayerEventMap> {
    readonly attachedObjects = new PlayerAttachedObjectHandler(this)
    readonly textdraws = new PlayerTextdrawHandler(this)

    private _name = gameNatives.getPlayerName(this.id)
    private _color = "FFFFFF"
    private _cash = 0
    private _skin = 0
    private _spectating = true

    constructor(gameId: number) {
        super(gameId, INVALID_PLAYER_ID)

        gameNatives.setPlayerColor(this.id, this._color)
        gameNatives.givePlayerMoney(this.id, this._cash)
        gameNatives.setPlayerSkin(this.id, this._skin)
        gameNatives.setPlayerTeam(this.id, DEFAULT_PLAYER_TEAM)
        gameNatives.togglePlayerSpectating(this.id, this._spectating)
    }

    get animations() {
        return new PlayerAnimations(this)
    }

    get weapons() {
        return new PlayerWeapons(this)
    }

    get dialog() {
        return new PlayerDialog(this)
    }

    cancelObjectEditMode() {
        gameNatives.cancelEdit(this.id)
        dispatcher.emit("playerCancelObjectEditMode", this)
    }

    sendMessage(message: string, color = "FFFFFF") {
        gameNatives.sendClientMessage(this.id, color, message)
    }

    spawn(position = { x: 0.0, y: 0.0, z: 3.0 }, rotation = 0, world = 0, interior = 0) {
        this.world = world
        this.interior = interior

        gameNatives.setSpawnInfo(this.id, DEFAULT_PLAYER_TEAM, this.skin, position, rotation)

        if (this.spectating) {
            this.spectating = false
        } else if (this.state === "wasted") {
            // If in class selection
            gameNatives.spawnPlayer(this.id)
        }

        this.resetCameraBehind()
    }

    kick(delay = 10) {
        if (delay <= 0) {
            gameNatives.kick(this.id)
            return
        }

        setTimeout(() => {
            gameNatives.kick(this.id)
        }, delay)
    }

    resetCameraBehind() {
        gameNatives.setCameraBehindPlayer(this.id)
    }

    setCameraLookAt(position: Position3, cutStyle: CameraCutStyle = "cut") {
        gameNatives.setPlayerCameraLookAt(this.id, position, CAMERA_CUT_STYLES[cutStyle])
    }

    interpolateCameraPosition(from: Position3, to: Position3, time: number, cutStyle: CameraCutStyle = "move") {
        gameNatives.interpolateCameraPos(this.id, from, to, time, CAMERA_CUT_STYLES[cutStyle])
    }

    interpolateCameraLookAt(from: Position3, to: Position3, time: number, cutStyle: CameraCutStyle = "move") {
        gameNatives.interpolateCameraLookAt(this.id, from, to, time, CAMERA_CUT_STYLES[cutStyle])
    }

    isStreamedInFor(player: Player) {
        return gameNatives.isPlayerStreamedIn(this.id, player.id)
    }

    set spectating(spectating: boolean) {
        this._spectating = spectating
        gameNatives.togglePlayerSpectating(this.id, spectating)
    }

    get spectating() {
        return this._spectating
    }

    set position(position: Position3) {
        gameNatives.setPlayerPosition(this.id, position.x, position.y, position.z)
    }

    get position(): Vector3 {
        return new Vector3(gameNatives.getPlayerPosition(this.id))
    }

    set cameraPosition(position: Position3) {
        gameNatives.setPlayerCameraPos(this.id, position)
    }

    get cameraPosition() {
        return gameNatives.getPlayerCameraPos(this.id)
    }

    set specialAction(action: SpecialAction) {
        gameNatives.setPlayerSpecialAction(this.id, SPECIAL_ACTIONS[action])
    }

    get specialAction() {
        return getEnumKeyByValue(SPECIAL_ACTIONS, gameNatives.getPlayerSpecialAction(this.id))
    }

    set skin(skin: number) {
        this._skin = skin
        gameNatives.setPlayerSkin(this.id, skin)
    }

    get skin() {
        return this._skin
    }

    set rotation(rotation: number) {
        gameNatives.setPlayerRotation(this.id, rotation)
    }

    get rotation() {
        return gameNatives.getPlayerRotation(this.id)
    }

    set name(name: string) {
        this._name = name
        gameNatives.setPlayerName(this.id, name)
    }

    get name() {
        return this._name
    }

    set world(value: number) {
        gameNatives.setPlayerVirtualWorld(this.id, value)
    }

    get world() {
        return gameNatives.getPlayerVirtualWorld(this.id)
    }

    set interior(value: number) {
        gameNatives.setPlayerInterior(this.id, value)
    }

    get interior() {
        return gameNatives.getPlayerInterior(this.id)
    }

    set health(value: number) {
        gameNatives.setPlayerHealth(this.id, value)
    }

    get health() {
        return gameNatives.getPlayerHealth(this.id)
    }

    set armour(value: number) {
        gameNatives.setPlayerArmour(this.id, value)
    }

    get armour() {
        return gameNatives.getPlayerArmour(this.id)
    }

    set color(hex: string) {
        this._color = hex
        gameNatives.setPlayerColor(this.id, hex)
    }

    get color() {
        return this._color
    }

    get ip() {
        return gameNatives.getPlayerIp(this.id)
    }

    get ping() {
        return gameNatives.getPlayerPing(this.id)
    }

    get gpci() {
        return gameNatives.gpci(this.id)
    }

    set cash(value: number) {
        gameNatives.resetPlayerMoney(this.id)
        gameNatives.givePlayerMoney(this.id, value)

        this._cash = value
    }

    get cash() {
        return this._cash
    }

    set score(value: number) {
        gameNatives.setPlayerScore(this.id, value)
    }

    get score() {
        return gameNatives.getPlayerScore(this.id)
    }

    get cameraMode() {
        return getEnumKeyByValue(CAMERA_MODES, gameNatives.getPlayerCameraMode(this.id))
    }

    setChatBubble(text: string, color = "FFFFFF", drawDistance = 12, expireTime = 5000) {
        return gameNatives.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime)
    }

    get spawned() {
        const { state } = this

        if (state === undefined) {
            return undefined
        }

        return state !== "wasted" && state !== "spectating" && state !== "none"
    }

    get state(): PlayerState | undefined {
        return getEnumKeyByValue(PLAYER_STATES, gameNatives.getPlayerState(this.id))
    }

    putIntoVehicle(vehicle: Vehicle, seat: VehicleSeat = "driver") {
        return putInVehicleWithEvent(this, vehicle, seat)
    }

    get vehicle(): Vehicle | undefined {
        const vehicleId = gameNatives.getPlayerVehicleId(this.id)

        if (vehicleId === undefined) {
            return undefined
        }

        return vehicles.pool.at(vehicleId)
    }

    get vehicleSeat() {
        return getEnumKeyByValue(VEHICLE_SEATS, gameNatives.getPlayerVehicleSeat(this.id))
    }
}
