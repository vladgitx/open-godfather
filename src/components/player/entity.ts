import { PlayerStatesEnum, type SpecialActionsEnum, VehicleSeatsEnum, CameraCutStylesEnum } from "@/utils/enums"
import { nativeFunctions } from "@/wrapper"
import { Vector3 } from "../../core/vector3"
import { type Vehicle, vehicleHandler } from "../vehicle"
import { PlayerAnimations } from "./animations"
import { PlayerDialog } from "./dialog"
import { PlayerWeapons } from "./weapons"
import { putInVehicleWithEvent } from "./@events/enter-exit-car"
import { PlayerAttachedObjects } from "./attached-objects"
import { dispatcher } from "../../core/dispatcher"
import { type PlayerEventMap } from "./@events/entity-callbacks"
import { INVALID_PLAYER_ID } from "@/wrapper/functions"
import { SampEntity } from "@/core/samp-entity"

export const DEFAULT_PLAYER_TEAM = 0

export class Player extends SampEntity<PlayerEventMap> {
    readonly dialog = new PlayerDialog(this)
    readonly weapons = new PlayerWeapons(this)
    readonly animations = new PlayerAnimations(this)
    readonly attachedObjects = new PlayerAttachedObjects(this)
    private _name = nativeFunctions.getPlayerName(this.sampId)
    private _color = "FFFFFF"
    private _cash = 0
    private _skin = 0
    private _spectating = true

    constructor(sampId: number) {
        super(sampId, INVALID_PLAYER_ID)

        nativeFunctions.setPlayerColor(this.sampId, this._color)
        nativeFunctions.givePlayerMoney(this.sampId, this._cash)
        nativeFunctions.setPlayerSkin(this.sampId, this._skin)
        nativeFunctions.setPlayerTeam(this.sampId, DEFAULT_PLAYER_TEAM)
        nativeFunctions.togglePlayerSpectating(this.sampId, this._spectating)
    }

    exitObjectEditMode() {
        nativeFunctions.cancelEdit(this.sampId)
        dispatcher.emit("playerExitObjectEditMode", this)
    }

    sendMessage(message: string, color = "FFFFFF") {
        nativeFunctions.sendClientMessage(this.sampId, color, message)
    }

    spawn(position = new Vector3(0, 0, 3), rotation = 0, world = 0, interior = 0) {
        this.world = world
        this.interior = interior

        nativeFunctions.setSpawnInfo(this.sampId, DEFAULT_PLAYER_TEAM, this.skin, position, rotation)

        if (this.spectating) {
            this.spectating = false
        } else if (this.state === PlayerStatesEnum.Wasted) {
            // If in class selection
            nativeFunctions.spawnPlayer(this.sampId)
        }

        this.resetCameraBehind()
    }

    kick(delay = 10) {
        if (delay <= 0) {
            nativeFunctions.kick(this.sampId)
            return
        }

        setTimeout(() => {
            nativeFunctions.kick(this.sampId)
        }, delay)
    }

    resetCameraBehind() {
        nativeFunctions.setCameraBehindPlayer(this.sampId)
    }

    setCameraLookAt(position: Vector3, cutStyle: CameraCutStylesEnum = CameraCutStylesEnum.Cut) {
        nativeFunctions.setPlayerCameraLookAt(this.sampId, position, cutStyle)
    }

    interpolateCameraPosition(from: Vector3, to: Vector3, time: number, cutStyle: CameraCutStylesEnum = CameraCutStylesEnum.Move) {
        nativeFunctions.interpolateCameraPos(this.sampId, from, to, time, cutStyle)
    }

    interpolateCameraLookAt(from: Vector3, to: Vector3, time: number, cutStyle: CameraCutStylesEnum = CameraCutStylesEnum.Move) {
        nativeFunctions.interpolateCameraLookAt(this.sampId, from, to, time, cutStyle)
    }

    set spectating(spectating: boolean) {
        this._spectating = spectating
        nativeFunctions.togglePlayerSpectating(this.sampId, spectating)
    }

    get spectating() {
        return this._spectating
    }

    set position(position: Vector3) {
        nativeFunctions.setPlayerPosition(this.sampId, position.x, position.y, position.z)
    }

    get position() {
        return nativeFunctions.getPlayerPosition(this.sampId)
    }

    set cameraPosition(position: Vector3) {
        nativeFunctions.setPlayerCameraPos(this.sampId, position)
    }

    get cameraPosition() {
        return nativeFunctions.getPlayerCameraPos(this.sampId)
    }

    set specialAction(action: SpecialActionsEnum) {
        nativeFunctions.setPlayerSpecialAction(this.sampId, action)
    }

    get specialAction() {
        return nativeFunctions.getPlayerSpecialAction(this.sampId)
    }

    set skin(skin: number) {
        this._skin = skin
        nativeFunctions.setPlayerSkin(this.sampId, skin)
    }

    get skin() {
        return this._skin
    }

    set rotation(rotation: number) {
        nativeFunctions.setPlayerRotation(this.sampId, rotation)
    }

    get rotation() {
        return nativeFunctions.getPlayerRotation(this.sampId)
    }

    set name(name: string) {
        this._name = name
        nativeFunctions.setPlayerName(this.sampId, name)
    }

    get name() {
        return this._name
    }

    set world(value: number) {
        nativeFunctions.setPlayerVirtualWorld(this.sampId, value)
    }

    get world() {
        return nativeFunctions.getPlayerVirtualWorld(this.sampId)
    }

    set interior(value: number) {
        nativeFunctions.setPlayerInterior(this.sampId, value)
    }

    get interior() {
        return nativeFunctions.getPlayerInterior(this.sampId)
    }

    set health(value: number) {
        nativeFunctions.setPlayerHealth(this.sampId, value)
    }

    get health() {
        return nativeFunctions.getPlayerHealth(this.sampId)
    }

    set armour(value: number) {
        nativeFunctions.setPlayerArmour(this.sampId, value)
    }

    get armour() {
        return nativeFunctions.getPlayerArmour(this.sampId)
    }

    set color(hex: string) {
        this._color = hex
        nativeFunctions.setPlayerColor(this.sampId, hex)
    }

    get color() {
        return this._color
    }

    get ip() {
        return nativeFunctions.getPlayerIp(this.sampId)
    }

    get ping() {
        return nativeFunctions.getPlayerPing(this.sampId)
    }

    get gpci() {
        return nativeFunctions.gpci(this.sampId)
    }

    set cash(value: number) {
        nativeFunctions.resetPlayerMoney(this.sampId)
        nativeFunctions.givePlayerMoney(this.sampId, value)

        this._cash = value
    }

    get cash() {
        return this._cash
    }

    set score(value: number) {
        nativeFunctions.setPlayerScore(this.sampId, value)
    }

    get score() {
        return nativeFunctions.getPlayerScore(this.sampId)
    }

    get cameraMode() {
        return nativeFunctions.getPlayerCameraMode(this.sampId)
    }

    setChatBubble(text: string, color = "FFFFFF", drawDistance = 12, expireTime = 5000) {
        return nativeFunctions.setPlayerChatBubble(this.sampId, text, color, drawDistance, expireTime)
    }

    get spawned() {
        const state = this.state
        if (state === undefined) {
            return undefined
        }
        return state !== PlayerStatesEnum.Wasted && state !== PlayerStatesEnum.Spectating && state !== PlayerStatesEnum.None
    }

    get state(): PlayerStatesEnum | undefined {
        return nativeFunctions.getPlayerState(this.sampId)
    }

    putIntoVehicle(vehicle: Vehicle, seat = VehicleSeatsEnum.Driver) {
        return putInVehicleWithEvent(this, vehicle, seat)
    }

    get vehicle(): Vehicle | undefined {
        const vehicleId = nativeFunctions.getPlayerVehicleId(this.sampId)

        if (vehicleId === undefined) {
            return undefined
        }

        return vehicleHandler.atSampId(vehicleId)
    }

    get vehicleSeat() {
        return nativeFunctions.getPlayerVehicleSeat(this.sampId)
    }
}
