import { DialogStyleEnum, PlayerStateEnum, SpecialActionEnum, VehicleSeatEnum, WeaponEnum, WeaponSkillEnum } from "../../../shared/enums"
import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { Entity, WorldEntity } from "../../entity"
import { Vehicle, getVehicle } from "../../vehicle"
import { playersPool } from "../domain/create-destroy"
import { hidePlayerDialog, showPlayerDialog } from "../domain/dialog"
import { putInVehicleWithEvent } from "../domain/enter-exit-car"

export class Player extends Entity implements WorldEntity {
    #color: string
    #cash: number
    #skin: number
    commands: boolean

    constructor(id: number) {
        super(id, playersPool)

        this.#color = "FFFFFF"
        this.#cash = 0
        this.#skin = 0
        this.commands = true
    }

    sendMessage(message: string, color = "FFFFFF") {
        return SampNatives.sendClientMessage(this.id, color, message)
    }

    spawn() {
        return SampNatives.spawnPlayer(this.id)
    }

    kick(delay = true) {
        if (!delay) {
            return SampNatives.kick(this.id)
        }
        setTimeout(() => {
            SampNatives.kick(this.id)
        }, 10)
    }

    setSpawnInfo(teamId: number, skinId: number, position: WorldPosition, rotation: number, weapons: { weapon: WeaponEnum, ammo: number }[] = []) {
        this.#skin = skinId
        return SampNatives.setSpawnInfo(this.id, teamId, skinId, position, rotation, weapons)
    }

    showDialog(styleId: DialogStyleEnum, caption: string, info: string, primaryButton: string, secondaryButton = "", callback?: (response: boolean, listItem: number, inputText: string) => void) {
        return showPlayerDialog(this.id, styleId, caption, info, primaryButton, secondaryButton, callback)
    }

    hideDialog() {
        return hidePlayerDialog(this.id)
    }

    putIntoVehicle(vehicle: Vehicle, seat = VehicleSeatEnum.DRIVER) {
        return putInVehicleWithEvent(this.id, vehicle.id, seat)
    }

    setSpectating(spectating: boolean) {
        return SampNatives.togglePlayerSpectating(this.id, spectating)
    }

    setPosition(position: WorldPosition) {
        return SampNatives.setPlayerPosition(this.id, position.x, position.y, position.z)
    }

    getPosition() {
        return SampNatives.getPlayerPosition(this.id)
    }

    getDistance(position: WorldPosition, world?: number, interior?: number) {
        if (world !== undefined && this.world !== world) {
            return Number.POSITIVE_INFINITY
        }
        if (interior !== undefined && this.interior !== interior) {
            return Number.POSITIVE_INFINITY
        }
        return SampNatives.getPlayerDistanceFromPoint(this.id, position.x, position.y, position.z)
    }

    setChatBubble(text: string, color = "FFFFFF", drawDistance = 12, expireTime = 5000) {
        return SampNatives.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime)
    }

    setWeaponSkill(weapon: WeaponSkillEnum, level: number) {
        return SampNatives.setPlayerSkillLevel(this.id, weapon, level)
    }

    giveWeapon(weapon: WeaponEnum, ammo: number) {
        return SampNatives.givePlayerWeapon(this.id, weapon, ammo)
    }

    applyAnimation(library: string, name: string, speed: number, loop: boolean, lockX: boolean, lockY: boolean, freeze: boolean, time: number, forceSync = true) {
        return SampNatives.applyAnimation(this.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync)
    }

    clearAnimations() {
        return SampNatives.clearAnimations(this.id, true)
    }

    set skin(skinId: number) {
        this.#skin = skinId
        SampNatives.setPlayerSkin(this.id, skinId)
    }

    get skin() {
        return this.#skin
    }

    set holdingWeapon(weaponId: WeaponEnum) {
        SampNatives.setPlayerArmedWeapon(this.id, weaponId)
    }

    get holdingWeapon() {
        return SampNatives.getPlayerWeapon(this.id)
    }

    set rotation(rotation: number) {
        SampNatives.setPlayerRotation(this.id, rotation)
    }

    get rotation() {
        return SampNatives.getPlayerRotation(this.id)
    }

    get isSpawned() {
        const state = SampNatives.getPlayerState(this.id)
        if (state === undefined) {
            return undefined
        }
        return state !== PlayerStateEnum.WASTED && state !== PlayerStateEnum.SPECTATING && state !== PlayerStateEnum.NONE
    }

    get state(): PlayerStateEnum | undefined {
        return SampNatives.getPlayerState(this.id)
    }

    set name(value: string) {
        SampNatives.setPlayerName(this.id, value)
    }

    get name() {
        return SampNatives.getPlayerName(this.id)
    }
    
    set world(value: number) {
        SampNatives.setPlayerVirtualWorld(this.id, value)
    }

    get world() {
        return SampNatives.getPlayerVirtualWorld(this.id)
    }

    set interior(value: number) {
        SampNatives.setPlayerInterior(this.id, value)
    }

    get interior() {
        return SampNatives.getPlayerInterior(this.id)
    }

    set health(value: number) {
        SampNatives.setPlayerHealth(this.id, value)
    }

    get health() {
        return SampNatives.getPlayerHealth(this.id)
    }

    set armour(value: number) {
        SampNatives.setPlayerArmour(this.id, value)
    }

    get armour() {
        return SampNatives.getPlayerArmour(this.id)
    }

    set color(hex: string) {
        this.#color = hex
        SampNatives.setPlayerColor(this.id, hex)
    }

    get color() {
        return this.#color
    }

    get vehicle(): Vehicle | undefined {
        const vehicleId = SampNatives.getPlayerVehicleId(this.id)
        if (vehicleId === undefined) {
            return undefined
        }
        return getVehicle(vehicleId)
    }

    get ip() {
        return SampNatives.getPlayerIp(this.id)
    }

    get ping() {
        return SampNatives.getPlayerPing(this.id)
    }

    get gpci() {
        return SampNatives.gpci(this.id)
    }

    set cash(value: number) {
        SampNatives.resetPlayerMoney(this.id)
        SampNatives.givePlayerMoney(this.id, value)

        this.#cash = value
    }

    get cash() {
        return this.#cash
    }

    set score(value: number) {
        SampNatives.setPlayerScore(this.id, value)
    }

    get score() {
        return SampNatives.getPlayerScore(this.id)
    }

    get animation() {
        return SampNatives.getPlayerAnimationIndex(this.id)
    }

    set specialAction(action: SpecialActionEnum) {
        SampNatives.setPlayerSpecialAction(this.id, action)
    }

    get specialAction() {
        return SampNatives.getPlayerSpecialAction(this.id)
    }

    get vehicleSeat() {
        return SampNatives.getPlayerVehicleSeat(this.id)
    }
}