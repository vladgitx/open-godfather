import { DialogStyles, PlayerStates, SpecialActions, VehicleSeats, Weapons, WeaponSkills, WeaponSlots } from "../../../shared/enums"
import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { Entity, WorldEntity } from "../../entity"
import { Vehicle, getVehicle } from "../../vehicle"
import { playersPool } from "../domain/create-destroy"
import { hidePlayerDialog, showPlayerDialog } from "../domain/dialog"
import { putInVehicleWithEvent } from "../domain/enter-exit-car"

export class Player extends Entity implements WorldEntity {
    #name: string
    #color: string
    #cash: number
    #skin: number
    #team: number | undefined

    constructor(id: number) {
        super(id, playersPool)

        this.#name = SampNatives.getPlayerName(this.id)
        this.#color = "FFFFFF"
        this.#cash = 0
        this.#skin = 0
        this.#team = undefined
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

    setSpawnInfo(team: number | undefined, skin: number, position: WorldPosition, rotation: number, weapons: { weapon: Weapons, ammo: number }[] = []) {
        this.#skin = skin
        this.#team = team

        return SampNatives.setSpawnInfo(this.id, team === undefined ? 255 : team, skin, position, rotation, weapons)
    }

    showDialog(styleId: DialogStyles, caption: string, info: string, primaryButton: string, secondaryButton = "") {
        return showPlayerDialog(this.id, styleId, caption, info, primaryButton, secondaryButton)
    }

    hideDialog() {
        return hidePlayerDialog(this.id)
    }

    putIntoVehicle(vehicle: Vehicle, seat = VehicleSeats.Driver) {
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

    setWeaponSkill(weapon: WeaponSkills, level: number) {
        return SampNatives.setPlayerSkillLevel(this.id, weapon, level)
    }

    giveWeapon(weapon: Weapons, ammo: number) {
        return SampNatives.givePlayerWeapon(this.id, weapon, ammo)
    }

    resetWeapons() {
        return SampNatives.resetPlayerWeapons(this.id)
    }

    removeWeapon(weapon: Weapons) {
        const weapons = this.getWeapons()

        this.resetWeapons()

        for (const weaponData of weapons) {
            if (weaponData.model !== weapon) {
                this.giveWeapon(weaponData.model, weaponData.ammo)
            }
        }
    }

    weaponAtSlot(slot: WeaponSlots) {
        return SampNatives.getPlayerWeaponData(this.id, slot)
    }

    getWeapons() {
        const weapons: { model: Weapons, ammo: number }[] = []

        const values = Object.values(WeaponSlots).filter((v) => !isNaN(Number(v)))
        for (const value of values) {
            const weapon = this.weaponAtSlot(value as WeaponSlots)
            if (weapon) {
                weapons.push(weapon)
            }
        }

        return weapons
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

    set team(team: number | undefined) {
        this.#team = team
        SampNatives.setPlayerTeam(this.id, team === undefined ? 255 : team)
    }

    get team() {
        return this.#team
    }

    set holdingWeapon(weaponId: Weapons) {
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
        return state !== PlayerStates.Wasted && state !== PlayerStates.Spectating && state !== PlayerStates.None
    }

    get state(): PlayerStates | undefined {
        return SampNatives.getPlayerState(this.id)
    }

    set name(value: string) {
        this.#name = value
        SampNatives.setPlayerName(this.id, value)
    }

    get name() {
        return this.#name
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

    set specialAction(action: SpecialActions) {
        SampNatives.setPlayerSpecialAction(this.id, action)
    }

    get specialAction() {
        return SampNatives.getPlayerSpecialAction(this.id)
    }

    get vehicleSeat() {
        return SampNatives.getPlayerVehicleSeat(this.id)
    }

    get cameraMode() {
        return SampNatives.getPlayerCameraMode(this.id)
    }
}