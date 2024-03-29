import {
    WeaponsEnum,
    PlayerStatesEnum,
    DialogStylesEnum,
    WeaponSkillsEnum,
    SpecialActionsEnum,
    VehicleSeatsEnum,
    CameraModesEnum,
    WeaponSlotsEnum,
} from "../shared/enums"
import { Vector3 } from "../modules/vector3"

export class SampNatives {
    static manualVehicleEngineAndLights = (): number => {
        return samp.callNative("ManualVehicleEngineAndLights", "")
    }

    static setVehicleParamsEx = (
        vehicleId: number,
        engine: boolean,
        lights: boolean,
        alarm: boolean,
        doors: boolean,
        bonnet: boolean,
        boot: boolean,
        objective: boolean,
    ): boolean => {
        return samp.callNative("SetVehicleParamsEx", "iiiiiiii", vehicleId, engine, lights, alarm, doors, bonnet, boot, objective) === 1
    }

    static setVehicleNumberPlate = (vehicleId: number, numberplate: string) => {
        return samp.callNative("SetVehicleNumberPlate", "is", vehicleId, numberplate) === 1
    }

    static getVehicleParamsEx = (
        vehicleId: number,
    ): { engine: boolean; lights: boolean; alarm: boolean; doors: boolean; bonnet: boolean; boot: boolean; objective: boolean } => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return {
                engine: false,
                lights: false,
                alarm: false,
                doors: false,
                bonnet: false,
                boot: false,
                objective: false,
            }
        }
        const res = samp.callNative("GetVehicleParamsEx", "iIIIIIII", vehicleId)

        return {
            engine: res[0],
            lights: res[1],
            alarm: res[2],
            doors: res[3],
            bonnet: res[4],
            boot: res[5],
            objective: res[6],
        }
    }

    static getServerTickRate = (): number => {
        return samp.callNative("GetServerTickRate", "")
    }

    static getVehicleVelocity = (vehicleId: number): Vector3 => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return new Vector3()
        }
        const res = samp.callNative("GetVehicleVelocity", "iFFF", vehicleId)
        return new Vector3(res[0], res[1], res[2])
    }

    static getWeaponName = (weaponId: WeaponsEnum): string => {
        if (weaponId < WeaponsEnum.Fist || weaponId > WeaponsEnum.Collision) {
            return "invalid_weapon"
        }
        return samp.callNative("GetWeaponName", "iSi", weaponId, 32)
    }

    static setVehicleVelocity = (vehicleId: number, velocity: Vector3) => {
        return samp.callNative("SetVehicleVelocity", "ifff", vehicleId, velocity.x, velocity.y, velocity.z) === 1
    }

    static setPlayerSkillLevel = (playerId: number, skillType: WeaponSkillsEnum, level: number): boolean => {
        return samp.callNative("SetPlayerSkillLevel", "iii", playerId, skillType, level) === 1
    }

    static setPlayerColor = (playerId: number, color: string): void => {
        samp.callNative("SetPlayerColor", "ii", playerId, parseInt(color + "FF", 16))
    }

    static setWeather = (weatherId: number): void => {
        samp.callNative("SetWeather", "i", weatherId)
    }

    static setWorldTime = (hour: number): void => {
        samp.callNative("SetWorldTime", "i", hour)
    }

    static setNameTagDrawDistance = (distance: number): void => {
        samp.callNative("SetNameTagDrawDistance", "f", distance)
    }

    static enableStuntBonusForAll = (enable: boolean): void => {
        samp.callNative("EnableStuntBonusForAll", "i", enable === true ? 1 : 0)
    }

    static sendRconCommand = (command: string): void => {
        samp.callNative("SendRconCommand", "s", command)
    }

    static changeVehicleColor = (vehicleId: number, color1: number, color2: number): boolean => {
        return samp.callNative("ChangeVehicleColor", "iii", vehicleId, color1, color2) === 1
    }

    static setPlayerAttachedObject = (
        playerId: number,
        index: number,
        modelid: number,
        bone: number,
        fOffsetX: number,
        fOffsetY: number,
        fOffsetZ: number,
        fRotX: number,
        fRotY: number,
        fRotZ: number,
        fScaleX: number,
        fScaleY: number,
        fScaleZ: number,
        materialcolor1: string,
        materialcolor2: string,
    ) => {
        return (
            samp.callNative(
                "SetPlayerAttachedObject",
                "iiiifffffffffii",
                playerId,
                index,
                modelid,
                bone,
                fOffsetX,
                fOffsetY,
                fOffsetZ,
                fRotX,
                fRotY,
                fRotZ,
                fScaleX,
                fScaleY,
                fScaleZ,
                parseInt(materialcolor1 + "FF", 16),
                parseInt(materialcolor2 + "FF", 16),
            ) === 1
        )
    }

    static removePlayerAttachedObject = (playerId: number, index: number) => {
        return samp.callNative("RemovePlayerAttachedObject", "ii", playerId, index) === 1
    }

    static isPlayerAttachedObjectSlotUsed = (playerId: number, index: number) => {
        return samp.callNative("IsPlayerAttachedObjectSlotUsed", "ii", playerId, index) === 1
    }

    static editAttachedObject = (playerId: number, index: number) => {
        return samp.callNative("EditAttachedObject", "ii", playerId, index) === 1
    }

    static destroyVehicle = (vehicleId: number): boolean => {
        return samp.callNative("DestroyVehicle", "i", vehicleId) === 1
    }

    static createVehicle = (
        modelId: number,
        position: Vector3,
        rotation: number,
        primaryColor = -1,
        secondaryColor = -1,
        respawnDelay = -1,
        addSiren = false,
    ): number | undefined => {
        const vehicleId = samp.callNative(
            "CreateVehicle",
            "iffffiiii",
            modelId,
            position.x,
            position.y,
            position.z,
            rotation,
            primaryColor,
            secondaryColor,
            respawnDelay,
            addSiren,
        )
        if (vehicleId === 65535 || vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }

    static showPlayerDialog = (
        playerId: number,
        dialogId: number,
        styleId: DialogStylesEnum,
        caption: string,
        info: string,
        button1: string,
        button2: string,
    ): boolean => {
        return samp.callNative("ShowPlayerDialog", "iiissss", playerId, dialogId, styleId, caption, info, button1, button2) === 1
    }

    static hidePlayerDialog(playerId: number) {
        samp.callNative("HidePlayerDialog", "i", playerId)
    }

    static setPlayerName(playerId: number, name: string): boolean {
        return samp.callNative("SetPlayerName", "is", playerId, name) === 1
    }

    static setPlayerInterior(playerId: number, interior: number): boolean {
        return samp.callNative("SetPlayerInterior", "ii", playerId, interior) === 1
    }

    static getPlayerInterior(playerId: number): number {
        return samp.callNative("GetPlayerInterior", "i", playerId)
    }

    static setPlayerVirtualWorld(playerId: number, world: number): boolean {
        return samp.callNative("SetPlayerVirtualWorld", "ii", playerId, world) === 1
    }

    static getPlayerVirtualWorld(playerId: number): number {
        return samp.callNative("GetPlayerVirtualWorld", "i", playerId)
    }

    static setPlayerTeam = (playerId: number, teamId: number): boolean => {
        return samp.callNative("SetPlayerTeam", "ii", playerId, teamId) === 1
    }

    static create3DTextLabel = (
        text: string,
        color: string,
        X: number,
        Y: number,
        Z: number,
        DrawDistance: number,
        virtualworld: number,
        testLOS: boolean,
    ): number | undefined => {
        if (!text) {
            return undefined
        }

        if (virtualworld === -1) {
            return undefined
        }

        const res = samp.callNative(
            "Create3DTextLabel",
            "siffffii",
            text,
            parseInt(color + "FF", 16),
            X,
            Y,
            Z,
            DrawDistance,
            virtualworld,
            testLOS,
        )
        if (res === 65535) {
            return undefined
        }

        return res
    }

    static delete3DTextLabel = (id: number) => {
        return samp.callNative("Delete3DTextLabel", "i", id) === 1
    }

    static attach3DTextLabelToPlayer = (id: number, playerId: number, OffsetX: number, OffsetY: number, OffsetZ: number) => {
        return samp.callNative("Attach3DTextLabelToPlayer", "iifff", id, playerId, OffsetX, OffsetY, OffsetZ) === 1
    }

    static attach3DTextLabelToVehicle = (id: number, vehicleId: number, OffsetX: number, OffsetY: number, OffsetZ: number) => {
        return samp.callNative("Attach3DTextLabelToVehicle", "iifff", id, vehicleId, OffsetX, OffsetY, OffsetZ) === 1
    }

    static update3DTextLabelText = (id: number, color: string, text: string) => {
        if (text) {
            samp.callNative("Update3DTextLabelText", "iis", id, parseInt(color + "FF", 16), text)
            return true
        }
        return false
    }

    static setSpawnInfo(
        playerId: number,
        team: number,
        skinId: number,
        position: Vector3,
        rotation: number,
        weapons: { weapon: WeaponsEnum; ammo: number }[] = [],
    ): void {
        const weapon1 = weapons[0] ? weapons[0].weapon : WeaponsEnum.Fist
        const weapon1ammo = weapons[0] ? weapons[0].ammo : 0
        const weapon2 = weapons[1] ? weapons[1].weapon : WeaponsEnum.Fist
        const weapon2ammo = weapons[1] ? weapons[1].ammo : 0
        const weapon3 = weapons[2] ? weapons[2].weapon : WeaponsEnum.Fist
        const weapon3ammo = weapons[2] ? weapons[2].ammo : 0
        samp.callNative(
            "SetSpawnInfo",
            "iiiffffiiiiii",
            playerId,
            team,
            skinId,
            position.x,
            position.y,
            position.z,
            rotation,
            weapon1,
            weapon1ammo,
            weapon2,
            weapon2ammo,
            weapon3,
            weapon3ammo,
        )
    }

    static kick(playerId: number): void {
        samp.callNative("Kick", "i", playerId)
    }

    static spawnPlayer(playerId: number): boolean {
        return samp.callNative("SpawnPlayer", "i", playerId) === 1
    }

    static togglePlayerSpectating(playerId: number, toggle: boolean): boolean {
        return samp.callNative("TogglePlayerSpectating", "ii", playerId, toggle === true ? 1 : 0) === 1
    }

    static sendClientMessage(playerId: number, color: string, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), message)
        }
    }

    static setPlayerScore = (playerId: number, score: number): boolean => {
        return samp.callNative("SetPlayerScore", "ii", playerId, score) === 1
    }

    static getPlayerScore = (playerId: number): number => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerScore", "i", playerId)
    }

    static isPlayerInRangeOfPoint = (playerId: number, range: number, x: number, y: number, z: number): boolean => {
        return samp.callNative("IsPlayerInRangeOfPoint", "iffff", playerId, range, x, y, z) === 1
    }

    static setVehiclePosition = (vehicleId: number, x: number, y: number, z: number): boolean => {
        return samp.callNative("SetVehiclePos", "ifff", vehicleId, x, y, z) === 1
    }

    static applyAnimation = (
        playerId: number,
        animlib: string,
        animname: string,
        fDelta: number,
        loop: boolean,
        lockx: boolean,
        locky: boolean,
        freeze: boolean,
        time: number,
        forcesync: boolean,
    ): void => {
        samp.callNative("ApplyAnimation", "issfiiiiii", playerId, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync)
    }

    static clearAnimations = (playerId: number, forcesync: boolean): void => {
        samp.callNative("ClearAnimations", "ii", playerId, forcesync)
    }

    static getPlayerAnimationIndex = (playerId: number): number => {
        return samp.callNative("GetPlayerAnimationIndex", "i", playerId)
    }

    static getAnimationName = (index: number): { library: string; name: string } | undefined => {
        const res = samp.callNative("GetAnimationName", "iSiSi", index, 32, 32)
        if (res.length < 2) {
            return undefined
        }
        return {
            library: res[0],
            name: res[1],
        }
    }

    static getPlayerVehicleSeat = (playerId: number): VehicleSeatsEnum | undefined => {
        const res = samp.callNative("GetPlayerVehicleSeat", "i", playerId)
        if (res === -1) {
            return undefined
        }
        return res
    }

    static getPlayerSpecialAction = (playerId: number): SpecialActionsEnum => {
        return samp.callNative("GetPlayerSpecialAction", "i", playerId)
    }

    static setPlayerSpecialAction = (playerId: number, actionId: SpecialActionsEnum): boolean => {
        return samp.callNative("SetPlayerSpecialAction", "ii", playerId, actionId) === 1
    }

    static gpci = (playerId: number): string => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "invalid_gpci"
        }
        return samp.callNative("gpci", "iSi", playerId, 61)
    }

    static getPlayerName(playerId: number): string {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "invalid_name"
        }
        return samp.callNative("GetPlayerName", "iSi", playerId, 24)
    }

    static getPlayerIp = (playerId: number): string => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "255.255.255.255"
        }
        return samp.callNative("GetPlayerIp", "iSi", playerId, 17)
    }

    static getPlayerPing = (playerId: number): number => {
        return samp.callNative("GetPlayerPing", "i", playerId)
    }

    static givePlayerMoney = (playerId: number, money: number): boolean => {
        return samp.callNative("GivePlayerMoney", "ii", playerId, money) === 1
    }

    static resetPlayerMoney = (playerId: number): boolean => {
        return samp.callNative("ResetPlayerMoney", "i", playerId) === 1
    }

    static givePlayerWeapon = (playerId: number, weaponId: WeaponsEnum, ammo: number): boolean => {
        return samp.callNative("GivePlayerWeapon", "iii", playerId, weaponId, ammo) === 1
    }

    static getPlayerWeapon = (playerId: number): WeaponsEnum => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return WeaponsEnum.Fist
        }
        return samp.callNative("GetPlayerWeapon", "i", playerId)
    }

    static resetPlayerWeapons = (playerId: number): boolean => {
        return samp.callNative("ResetPlayerWeapons", "i", playerId) === 1
    }

    static setPlayerArmedWeapon = (playerId: number, weaponId: WeaponsEnum) => {
        return samp.callNative("SetPlayerArmedWeapon", "ii", playerId, weaponId) === 1
    }

    static setPlayerSkin = (playerId: number, skinId: number): boolean => {
        return samp.callNative("SetPlayerSkin", "ii", playerId, skinId) === 1
    }

    static isPlayerConnected(playerId: number): boolean {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1
    }

    static getPlayerPosition(playerId: number): Vector3 {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return new Vector3()
        }
        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId)
        return new Vector3(pos[0], pos[1], pos[2])
    }

    static getVehiclePosition = (vehicleId: number): Vector3 => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return new Vector3()
        }
        const pos = samp.callNative("GetVehiclePos", "iFFF", vehicleId)
        return new Vector3(pos[0], pos[1], pos[2])
    }

    static setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1
    }

    static setPlayerHealth(playerId: number, health: number): boolean {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1
    }

    static getPlayerHealth(playerId: number): number {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 100
        }
        return samp.callNative("GetPlayerHealth", "iF", playerId)
    }

    static setPlayerArmour(playerId: number, armour: number): boolean {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1
    }

    static getPlayerArmour(playerId: number): number {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerArmour", "iF", playerId)
    }

    static putPlayerInVehicle(playerId: number, vehicleId: number, seat = VehicleSeatsEnum.Driver): boolean {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1
    }

    static getPlayerWeaponData = (playerId: number, slot: WeaponSlotsEnum): { model: WeaponsEnum; ammo: number } | undefined => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return undefined
        }

        const res = samp.callNative("GetPlayerWeaponData", "iiII", playerId, slot)
        if (res.length < 2) {
            return undefined
        }

        if (slot !== WeaponSlotsEnum.Unarmed && res[0] === WeaponsEnum.Fist) {
            return undefined
        }

        return {
            model: res[0],
            ammo: res[1],
        }
    }

    static getPlayerVehicleId(playerId: number): number | undefined {
        const vehicleId = samp.callNative("GetPlayerVehicleID", "i", playerId)

        if (vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }

    static getPlayerCameraMode = (playerId: number): CameraModesEnum => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return CameraModesEnum.FollowPed
        }
        return samp.callNative("GetPlayerCameraMode", "i", playerId)
    }

    static getPlayerState(playerId: number): PlayerStatesEnum | undefined {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return undefined
        }
        return samp.callNative("GetPlayerState", "i", playerId)
    }

    static setPlayerRotation(playerId: number, rotation: number) {
        return samp.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1
    }

    static getPlayerRotation(playerId: number): number {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerFacingAngle", "iF", playerId)
    }

    static setVehicleZAngle = (vehicleId: number, angle: number) => {
        return samp.callNative("SetVehicleZAngle", "if", vehicleId, angle) === 1
    }

    static getVehicleZAngle = (vehicleId: number): number => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 0
        }
        return samp.callNative("GetVehicleZAngle", "iF", vehicleId)
    }

    static setVehicleVirtualWorld = (vehicleId: number, worldId: number) => {
        return samp.callNative("SetVehicleVirtualWorld", "ii", vehicleId, worldId) === 1
    }

    static getVehicleVirtualWorld = (vehicleId: number): number => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 0
        }
        return samp.callNative("GetVehicleVirtualWorld", "i", vehicleId)
    }

    static linkVehicleToInterior = (vehicleId: number, interiorId: number): boolean => {
        return samp.callNative("LinkVehicleToInterior", "ii", vehicleId, interiorId) === 1
    }

    static getVehicleDistanceFromPoint = (vehicleId: number, x: number, y: number, z: number): number => {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat("GetVehicleDistanceFromPoint", "ifff", vehicleId, x, y, z)
    }

    static getPlayerDistanceFromPoint = (playerId: number, x: number, y: number, z: number): number => {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat("GetPlayerDistanceFromPoint", "ifff", playerId, x, y, z)
    }

    static sendClientMessageToAll(color: string, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), message)
        }
    }

    static setPlayerChatBubble = (playerId: number, text: string, color: string, drawdistance: number, expiretime: number): boolean => {
        return samp.callNative("SetPlayerChatBubble", "isifi", playerId, text, parseInt(color + "FF", 16), drawdistance, expiretime) === 1
    }

    static getVehicleModel(vehicleId: number): number | undefined {
        const modelId = samp.callNative("GetVehicleModel", "i", vehicleId)
        if (modelId === 0) {
            return undefined
        }
        return modelId
    }

    static getVehicleHealth(vehicleId: number): number {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 1000
        }
        return samp.callNative("GetVehicleHealth", "iF", vehicleId)
    }

    static setVehicleHealth(vehicleId: number, health: number): boolean {
        return samp.callNative("SetVehicleHealth", "if", vehicleId, health) === 1
    }

    static isValidVehicle(vehicleId: number): boolean {
        return samp.callNative("IsValidVehicle", "i", vehicleId) === 1
    }
}
