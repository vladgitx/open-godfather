import { CONFIG } from "@/shared/config"
import { PlayerStatesEnum, type SpecialActionsEnum, VehicleSeatsEnum } from "@/shared/enums"
import { sampNatives } from "@/wrapper"
import { type Vector3 } from "../vector3"
import { type VehicleMp, vehicleHandler } from "../vehicle"
import { PlayerAnimations } from "./animations"
import { PlayerDialog } from "./dialog"
import { PlayerWeapons } from "./weapons"
import { Entity } from "../entity"
import { putInVehicleWithEvent } from "./@events/enter-exit-car"
import { PlayerTextLabels } from "./text-label"
import { PlayerAttachedObjects } from "./attached-objects"

export class PlayerMp extends Entity {
    readonly dialog = new PlayerDialog(this)
    readonly weapons = new PlayerWeapons(this)
    readonly animations = new PlayerAnimations(this)
    readonly textLabels = new PlayerTextLabels(this)
    readonly attachedObjects = new PlayerAttachedObjects(this)

    private _name = sampNatives.getPlayerName(this.id)
    private _color = CONFIG.player.color
    private _cash = CONFIG.player.cash
    private _skin = CONFIG.player.skin
    private _spectating = true

    constructor(id: number) {
        super(id)

        sampNatives.setPlayerColor(this.id, this._color)
        sampNatives.givePlayerMoney(this.id, this._cash)
        sampNatives.setPlayerSkin(this.id, this._skin)
        sampNatives.setPlayerTeam(this.id, CONFIG.player.team)

        sampNatives.togglePlayerSpectating(this.id, this._spectating)
    }

    sendMessage(message: string, color = CONFIG.message.color) {
        sampNatives.sendClientMessage(this.id, color, message)
    }

    spawn(
        position = CONFIG.player.spawn.position,
        rotation = CONFIG.player.spawn.rotation,
        world = CONFIG.player.spawn.world,
        interior = CONFIG.player.spawn.interior,
    ) {
        if (!this.spectating) {
            if (this.state === PlayerStatesEnum.Wasted) {
                // If in class selection
                sampNatives.spawnPlayer(this.id)
            }
            return
        }

        this.world = world
        this.interior = interior

        sampNatives.setSpawnInfo(this.id, CONFIG.player.team, this.skin, position, rotation)

        this.spectating = false
    }

    kick(delay = 10) {
        if (delay <= 0) {
            sampNatives.kick(this.id)
            return
        }

        setTimeout(() => {
            sampNatives.kick(this.id)
        }, delay)
    }

    set spectating(spectating: boolean) {
        this._spectating = spectating
        sampNatives.togglePlayerSpectating(this.id, spectating)
    }

    get spectating() {
        return this._spectating
    }

    set position(position: Vector3) {
        sampNatives.setPlayerPosition(this.id, position.x, position.y, position.z)
    }

    get position() {
        return sampNatives.getPlayerPosition(this.id)
    }

    set specialAction(action: SpecialActionsEnum) {
        sampNatives.setPlayerSpecialAction(this.id, action)
    }

    get specialAction() {
        return sampNatives.getPlayerSpecialAction(this.id)
    }

    set skin(skin: number) {
        this._skin = skin
        sampNatives.setPlayerSkin(this.id, skin)
    }

    get skin() {
        return this._skin
    }

    set rotation(rotation: number) {
        sampNatives.setPlayerRotation(this.id, rotation)
    }

    get rotation() {
        return sampNatives.getPlayerRotation(this.id)
    }

    set name(name: string) {
        this._name = name
        sampNatives.setPlayerName(this.id, name)
    }

    get name() {
        return this._name
    }

    set world(value: number) {
        sampNatives.setPlayerVirtualWorld(this.id, value)
    }

    get world() {
        return sampNatives.getPlayerVirtualWorld(this.id)
    }

    set interior(value: number) {
        sampNatives.setPlayerInterior(this.id, value)
    }

    get interior() {
        return sampNatives.getPlayerInterior(this.id)
    }

    set health(value: number) {
        sampNatives.setPlayerHealth(this.id, value)
    }

    get health() {
        return sampNatives.getPlayerHealth(this.id)
    }

    set armour(value: number) {
        sampNatives.setPlayerArmour(this.id, value)
    }

    get armour() {
        return sampNatives.getPlayerArmour(this.id)
    }

    set color(hex: string) {
        this._color = hex
        sampNatives.setPlayerColor(this.id, hex)
    }

    get color() {
        return this._color
    }

    get ip() {
        return sampNatives.getPlayerIp(this.id)
    }

    get ping() {
        return sampNatives.getPlayerPing(this.id)
    }

    get gpci() {
        return sampNatives.gpci(this.id)
    }

    set cash(value: number) {
        sampNatives.resetPlayerMoney(this.id)
        sampNatives.givePlayerMoney(this.id, value)

        this._cash = value
    }

    get cash() {
        return this._cash
    }

    set score(value: number) {
        sampNatives.setPlayerScore(this.id, value)
    }

    get score() {
        return sampNatives.getPlayerScore(this.id)
    }

    get cameraMode() {
        return sampNatives.getPlayerCameraMode(this.id)
    }

    setChatBubble(
        text: string,
        color = CONFIG.chatBubble.color,
        drawDistance = CONFIG.chatBubble.distance,
        expireTime = CONFIG.chatBubble.expire,
    ) {
        return sampNatives.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime)
    }

    get spawned() {
        const state = this.state
        if (state === undefined) {
            return undefined
        }
        return state !== PlayerStatesEnum.Wasted && state !== PlayerStatesEnum.Spectating && state !== PlayerStatesEnum.None
    }

    get state(): PlayerStatesEnum | undefined {
        return sampNatives.getPlayerState(this.id)
    }

    putIntoVehicle(vehicle: VehicleMp, seat = VehicleSeatsEnum.Driver) {
        return putInVehicleWithEvent(this, vehicle, seat)
    }

    get vehicle(): VehicleMp | undefined {
        const vehicleId = sampNatives.getPlayerVehicleId(this.id)
        if (vehicleId === undefined) {
            return undefined
        }
        return vehicleHandler.at(vehicleId)
    }

    get vehicleSeat() {
        return sampNatives.getPlayerVehicleSeat(this.id)
    }
}
