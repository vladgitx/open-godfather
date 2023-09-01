import { Natives } from "../scripting-api"
import {
    WeaponEnum,
    DialogStyleEnum,
    PlayerStateEnum,
    Vehicle,
    Vehicles,
    WeaponSkillEnum,
} from ".."
import { showPlayerDialog, hidePlayerDialog } from "../features/dialog"
import { godfather_putPlayerInVehicle } from "../features/callbacks/enter-exit-car"

export class Player {
    #id: number
    #color: number
    spawnCount: number

    constructor(playerId: number) {
        this.#id = playerId
        this.#color = 0xFFFFFFFF
        this.spawnCount = 0
    }

    get id() {
        return this.#id
    }

    sendMessage(message: string, color = -1) {
        return Natives.sendClientMessage(this.#id, color, message)
    }

    spamMessage(message: string, count = 30, color = -1) {
        for (let i = 0; i < count; i++) {
            this.sendMessage(message, color)
        }
    }

    spawn() {
        return Natives.spawnPlayer(this.#id);
    }

    kick() {
        return Natives.kick(this.#id)
    }

    setSpawnInfo(teamId: number, skinId: number, position: { x: number, y: number, z: number }, rotation: number, weapons: { weapon: WeaponEnum, ammo: number }[] = []) {
        return Natives.setSpawnInfo(this.#id, teamId, skinId, position, rotation, weapons)
    }

    showDialog(styleId: DialogStyleEnum, caption: string, info: string, button1: string, button2: string, callback: (response: boolean, listItem: number, inputText: string) => void) {
        return showPlayerDialog(this.#id, styleId, caption, info, button1, button2, callback)
    }

    hideDialog() {
        return hidePlayerDialog(this.#id)
    }

    putIntoVehicle(vehicle: Vehicle, seatId = 0) {
        return godfather_putPlayerInVehicle(this.#id, vehicle.id, seatId)
    }

    setSpectating(spectating: boolean) {
        return Natives.togglePlayerSpectating(this.#id, spectating)
    }

    setPosition(x: number, y: number, z: number) {
        return Natives.setPlayerPosition(this.#id, x, y, z)
    }

    getDistance(position: { x: number, y: number, z: number }, world: number | undefined = undefined, interior: number | undefined = undefined) {
        if (world !== undefined && this.world !== world) {
            return Number.POSITIVE_INFINITY
        }
        if (interior !== undefined && this.interior !== interior) {
            return Number.POSITIVE_INFINITY
        }
        return Natives.getPlayerDistanceFromPoint(this.#id, position.x, position.y, position.z)
    }

    setChatBubble(text: string, color = -1, drawDistance = 12, expireTime = 5000) {
        return Natives.setPlayerChatBubble(this.#id, text, color, drawDistance, expireTime)
    }

    setWeaponSkill(weapon: WeaponSkillEnum, level: number) {
        return Natives.setPlayerSkillLevel(this.#id, weapon, level)
    }

    get position() {
        return Natives.getPlayerPosition(this.#id)
    }

    set rotation(rotation: number) {
        Natives.setPlayerRotation(this.#id, rotation)
    }

    get rotation() {
        return Natives.getPlayerRotation(this.#id)
    }

    get isConnected() {
        return Natives.isPlayerConnected(this.#id)
    }

    get isSpawned() {
        const state = Natives.getPlayerState(this.#id)
        if (state === undefined) {
            return undefined
        }
        return state !== PlayerStateEnum.WASTED && state !== PlayerStateEnum.SPECTATING && state !== PlayerStateEnum.NONE as PlayerStateEnum
    }

    get state(): PlayerStateEnum | undefined {
        return Natives.getPlayerState(this.#id)
    }

    set name(name: string) {
        Natives.setPlayerName(this.#id, name)
    }

    get name() {
        return Natives.getPlayerName(this.#id)
    }
    
    set world(world: number) {
        Natives.setPlayerVirtualWorld(this.#id, world)
    }

    get world() {
        return Natives.getPlayerVirtualWorld(this.#id)
    }

    set interior(interior: number) {
        Natives.setPlayerInterior(this.#id, interior)
    }

    get interior() {
        return Natives.getPlayerInterior(this.#id)
    }

    set health(value: number) {
        Natives.setPlayerHealth(this.#id, value)
    }

    get health() {
        return Natives.getPlayerHealth(this.#id)
    }

    set armour(value: number) {
        Natives.setPlayerArmour(this.#id, value)
    }

    get armour() {
        return Natives.getPlayerArmour(this.#id)
    }

    set color(value: number) {
        this.#color = value
        Natives.setPlayerColor(this.#id, value)
    }

    get color() {
        return this.#color
    }

    get vehicle(): Vehicle | undefined {
        const vehicleId = Natives.getPlayerVehicleId(this.#id)
        if (vehicleId === undefined) {
            return undefined
        }
        return Vehicles.at(vehicleId)
    }
}