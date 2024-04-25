import { PlayerStatesEnum, type SpecialActionsEnum, VehicleSeatsEnum } from "@/common/enums"
import { nativeFunctions } from "@/natives"
import { Vector3 } from "../vector3"
import { type Vehicle, vehicleHandler } from "../vehicle"
import { PlayerAnimations } from "./animations"
import { PlayerDialog } from "./dialog"
import { PlayerWeapons } from "./weapons"
import { Entity } from "../entity"
import { putInVehicleWithEvent } from "./@events/enter-exit-car"
import { PlayerTextLabels } from "./text-label"
import { PlayerAttachedObjects } from "./attached-objects"
import { type CameraCutStyle } from "@/natives/functions"

export const DEFAULT_PLAYER_TEAM = 0

export class Player extends Entity {
    readonly dialog = new PlayerDialog(this)
    readonly weapons = new PlayerWeapons(this)
    readonly animations = new PlayerAnimations(this)
    readonly textLabels = new PlayerTextLabels(this)
    readonly attachedObjects = new PlayerAttachedObjects(this)

    private _name = nativeFunctions.getPlayerName(this.id)
    private _color = "FFFFFF"
    private _cash = 0
    private _skin = 0
    private _spectating = true

    constructor(id: number) {
        super(id)

        nativeFunctions.setPlayerColor(this.id, this._color)
        nativeFunctions.givePlayerMoney(this.id, this._cash)
        nativeFunctions.setPlayerSkin(this.id, this._skin)
        nativeFunctions.setPlayerTeam(this.id, DEFAULT_PLAYER_TEAM)

        nativeFunctions.togglePlayerSpectating(this.id, this._spectating)
    }

    sendMessage(message: string, color = "FFFFFF") {
        nativeFunctions.sendClientMessage(this.id, color, message)
    }

    spawn(position = new Vector3(0, 0, 3), rotation = 0, world = 0, interior = 0) {
        this.world = world
        this.interior = interior

        nativeFunctions.setSpawnInfo(this.id, DEFAULT_PLAYER_TEAM, this.skin, position, rotation)

        if (this.spectating) {
            this.spectating = false
        } else if (this.state === PlayerStatesEnum.Wasted) {
            // If in class selection
            nativeFunctions.spawnPlayer(this.id)
        }

        this.resetCameraBehind()
    }

    kick(delay = 10) {
        if (delay <= 0) {
            nativeFunctions.kick(this.id)
            return
        }

        setTimeout(() => {
            nativeFunctions.kick(this.id)
        }, delay)
    }

    resetCameraBehind() {
        nativeFunctions.setCameraBehindPlayer(this.id)
    }

    setCameraLookAt(position: Vector3, cutStyle: CameraCutStyle = "cut") {
        nativeFunctions.setPlayerCameraLookAt(this.id, position, cutStyle)
    }

    set spectating(spectating: boolean) {
        this._spectating = spectating
        nativeFunctions.togglePlayerSpectating(this.id, spectating)
    }

    get spectating() {
        return this._spectating
    }

    set position(position: Vector3) {
        nativeFunctions.setPlayerPosition(this.id, position.x, position.y, position.z)
    }

    get position() {
        return nativeFunctions.getPlayerPosition(this.id)
    }

    set cameraPosition(position: Vector3) {
        nativeFunctions.setPlayerCameraPos(this.id, position)
    }

    get cameraPosition() {
        return nativeFunctions.getPlayerCameraPos(this.id)
    }

    set specialAction(action: SpecialActionsEnum) {
        nativeFunctions.setPlayerSpecialAction(this.id, action)
    }

    get specialAction() {
        return nativeFunctions.getPlayerSpecialAction(this.id)
    }

    set skin(skin: number) {
        this._skin = skin
        nativeFunctions.setPlayerSkin(this.id, skin)
    }

    get skin() {
        return this._skin
    }

    set rotation(rotation: number) {
        nativeFunctions.setPlayerRotation(this.id, rotation)
    }

    get rotation() {
        return nativeFunctions.getPlayerRotation(this.id)
    }

    set name(name: string) {
        this._name = name
        nativeFunctions.setPlayerName(this.id, name)
    }

    get name() {
        return this._name
    }

    set world(value: number) {
        nativeFunctions.setPlayerVirtualWorld(this.id, value)
    }

    get world() {
        return nativeFunctions.getPlayerVirtualWorld(this.id)
    }

    set interior(value: number) {
        nativeFunctions.setPlayerInterior(this.id, value)
    }

    get interior() {
        return nativeFunctions.getPlayerInterior(this.id)
    }

    set health(value: number) {
        nativeFunctions.setPlayerHealth(this.id, value)
    }

    get health() {
        return nativeFunctions.getPlayerHealth(this.id)
    }

    set armour(value: number) {
        nativeFunctions.setPlayerArmour(this.id, value)
    }

    get armour() {
        return nativeFunctions.getPlayerArmour(this.id)
    }

    set color(hex: string) {
        this._color = hex
        nativeFunctions.setPlayerColor(this.id, hex)
    }

    get color() {
        return this._color
    }

    get ip() {
        return nativeFunctions.getPlayerIp(this.id)
    }

    get ping() {
        return nativeFunctions.getPlayerPing(this.id)
    }

    get gpci() {
        return nativeFunctions.gpci(this.id)
    }

    set cash(value: number) {
        nativeFunctions.resetPlayerMoney(this.id)
        nativeFunctions.givePlayerMoney(this.id, value)

        this._cash = value
    }

    get cash() {
        return this._cash
    }

    set score(value: number) {
        nativeFunctions.setPlayerScore(this.id, value)
    }

    get score() {
        return nativeFunctions.getPlayerScore(this.id)
    }

    get cameraMode() {
        return nativeFunctions.getPlayerCameraMode(this.id)
    }

    setChatBubble(text: string, color = "FFFFFF", drawDistance = 12, expireTime = 5000) {
        return nativeFunctions.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime)
    }

    get spawned() {
        const state = this.state
        if (state === undefined) {
            return undefined
        }
        return state !== PlayerStatesEnum.Wasted && state !== PlayerStatesEnum.Spectating && state !== PlayerStatesEnum.None
    }

    get state(): PlayerStatesEnum | undefined {
        return nativeFunctions.getPlayerState(this.id)
    }

    putIntoVehicle(vehicle: Vehicle, seat = VehicleSeatsEnum.Driver) {
        return putInVehicleWithEvent(this, vehicle, seat)
    }

    get vehicle(): Vehicle | undefined {
        const vehicleId = nativeFunctions.getPlayerVehicleId(this.id)
        if (vehicleId === undefined) {
            return undefined
        }
        return vehicleHandler.at(vehicleId)
    }

    get vehicleSeat() {
        return nativeFunctions.getPlayerVehicleSeat(this.id)
    }
}
