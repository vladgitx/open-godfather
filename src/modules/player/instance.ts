import { og } from "../.."
import { CONFIG } from "../../shared/config"
import { PlayerStatesEnum, SpecialActionsEnum, VehicleSeatsEnum } from "../../shared/enums"
import { SampNatives } from "../../natives"
import { Vector3 } from "../vector3"
import { VehicleMp } from "../vehicle"
import { PlayerAnimations } from "./animations"
import { PlayerDialog } from "./dialog"
import { PlayerWeapons } from "./weapons"

export class PlayerMp {
	readonly dialog = new PlayerDialog(this)
	readonly weapons = new PlayerWeapons(this)
	readonly animations = new PlayerAnimations(this)

	private _name = SampNatives.getPlayerName(this.id)
	private _color = CONFIG.player.color
	private _cash = CONFIG.player.cash
	private _skin = CONFIG.player.skin
	private _spectating = true

	constructor(readonly id: number) {
		SampNatives.setPlayerColor(this.id, this._color)
		SampNatives.givePlayerMoney(this.id, this._cash)
		SampNatives.setPlayerSkin(this.id, this._skin)
		SampNatives.setPlayerTeam(this.id, CONFIG.player.team)

		SampNatives.togglePlayerSpectating(this.id, this._spectating)
	}

	sendMessage(message: string) {
		return SampNatives.sendClientMessage(this.id, CONFIG.message.color, message)
	}

	spawn(
		position = CONFIG.player.spawn.position,
		rotation = CONFIG.player.spawn.rotation,
		world = CONFIG.player.spawn.world,
		interior = CONFIG.player.spawn.interior,
	) {
		if (!this.spectating) {
			return
		}

		this.world = world
		this.interior = interior

		SampNatives.setSpawnInfo(this.id, CONFIG.player.team, this.skin, position, rotation)

		this.spectating = false
	}

	kick(delay = 10) {
		if (delay <= 0) {
			return SampNatives.kick(this.id)
		}

		setTimeout(() => {
			SampNatives.kick(this.id)
		}, delay)
	}

	set spectating(spectating: boolean) {
		this._spectating = spectating
		SampNatives.togglePlayerSpectating(this.id, spectating)
	}

	get spectating() {
		return this._spectating
	}

	set position(position: Vector3) {
		SampNatives.setPlayerPosition(this.id, position.x, position.y, position.z)
	}

	get position() {
		return SampNatives.getPlayerPosition(this.id)
	}

	getDistance(position: Vector3, world?: number, interior?: number) {
		if (world !== undefined && this.world !== world) {
			return Number.POSITIVE_INFINITY
		}
		if (interior !== undefined && this.interior !== interior) {
			return Number.POSITIVE_INFINITY
		}
		return SampNatives.getPlayerDistanceFromPoint(this.id, position.x, position.y, position.z)
	}

	set specialAction(action: SpecialActionsEnum) {
		SampNatives.setPlayerSpecialAction(this.id, action)
	}

	get specialAction() {
		return SampNatives.getPlayerSpecialAction(this.id)
	}

	set skin(skin: number) {
		this._skin = skin
		SampNatives.setPlayerSkin(this.id, skin)
	}

	get skin() {
		return this._skin
	}

	set rotation(rotation: number) {
		SampNatives.setPlayerRotation(this.id, rotation)
	}

	get rotation() {
		return SampNatives.getPlayerRotation(this.id)
	}

	set name(name: string) {
		this._name = name
		SampNatives.setPlayerName(this.id, name)
	}

	get name() {
		return this._name
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
		this._color = hex
		SampNatives.setPlayerColor(this.id, hex)
	}

	get color() {
		return this._color
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

		this._cash = value
	}

	get cash() {
		return this._cash
	}

	set score(value: number) {
		SampNatives.setPlayerScore(this.id, value)
	}

	get score() {
		return SampNatives.getPlayerScore(this.id)
	}

	get cameraMode() {
		return SampNatives.getPlayerCameraMode(this.id)
	}

	setChatBubble(
		text: string,
		color = CONFIG.chatBubble.color,
		drawDistance = CONFIG.chatBubble.distance,
		expireTime = CONFIG.chatBubble.expire,
	) {
		return SampNatives.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime)
	}

	get spawned() {
		const state = this.state
		if (state === undefined) {
			return undefined
		}
		return state !== PlayerStatesEnum.Wasted && state !== PlayerStatesEnum.Spectating && state !== PlayerStatesEnum.None
	}

	get state(): PlayerStatesEnum | undefined {
		return SampNatives.getPlayerState(this.id)
	}

	/* TODO
	putIntoVehicle(vehicle: VehicleMp, seat = VehicleSeatsEnum.Driver) {
		return putInVehicleWithEvent(this.id, vehicle.id, seat)
	}*/

	get vehicle(): VehicleMp | undefined {
		const vehicleId = SampNatives.getPlayerVehicleId(this.id)
		if (vehicleId === undefined) {
			return undefined
		}
		return og.vehicles.at(vehicleId)
	}

	get vehicleSeat() {
		return SampNatives.getPlayerVehicleSeat(this.id)
	}
	
}
