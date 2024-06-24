import { hexToRgbaInt } from "@/lib/utils"
import {
    WeaponsEnum,
    type PlayerStatesEnum,
    type DialogStylesEnum,
    type WeaponSkillsEnum,
    type SpecialActionsEnum,
    VehicleSeatsEnum,
    CameraModesEnum,
    WeaponSlotsEnum,
    type CameraCutStylesEnum,
} from "../common/enums"
import { Vector3 } from "../modules/vector3"

class NativeFunctions {
    getVehicleSpawnInfo(vehicleId: number) {
        const data = samp.callNative("GetVehicleSpawnInfo", "iFFFFII", vehicleId) as number[]

        return {
            spawnX: data[0],
            spawnY: data[1],
            spawnZ: data[2],
            spawnAngle: data[3],
            primaryColor: data[4],
            secondaryColor: data[5],
        }
    }

    interpolateCameraPos = (playerid: number, from: Vector3, to: Vector3, time: number, cut: CameraCutStylesEnum): number => {
        return samp.callNative("InterpolateCameraPos", "iffffffii", playerid, from.x, from.y, from.z, to.x, to.y, to.z, time, cut)
    }

    interpolateCameraLookAt = (playerid: number, from: Vector3, to: Vector3, time: number, cut: CameraCutStylesEnum): number => {
        return samp.callNative("InterpolateCameraLookAt", "iffffffii", playerid, from.x, from.y, from.z, to.x, to.y, to.z, time, cut)
    }

    manualVehicleEngineAndLights = (): number => {
        return samp.callNative("ManualVehicleEngineAndLights", "")
    }

    setVehicleParamsEx = (
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

    setVehicleNumberPlate = (vehicleId: number, numberplate: string) => {
        return samp.callNative("SetVehicleNumberPlate", "is", vehicleId, numberplate) === 1
    }

    getVehicleParamsEx = (
        vehicleId: number,
    ): { engine: boolean; lights: boolean; alarm: boolean; doors: boolean; bonnet: boolean; boot: boolean; objective: boolean } => {
        if (!this.isValidVehicle(vehicleId)) {
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
        const res = samp.callNative("GetVehicleParamsEx", "iIIIIIII", vehicleId) as boolean[]

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

    getServerTickRate = (): number => {
        return samp.callNative("GetServerTickRate", "")
    }

    disableInteriorEnterExits = (): void => {
        samp.callNative("DisableInteriorEnterExits", "")
    }

    getVehicleVelocity = (vehicleId: number): Vector3 => {
        if (!this.isValidVehicle(vehicleId)) {
            return new Vector3()
        }
        const res = samp.callNative("GetVehicleVelocity", "iFFF", vehicleId) as number[]
        return new Vector3(res[0], res[1], res[2])
    }

    getWeaponName = (weaponId: WeaponsEnum): string => {
        if (weaponId < WeaponsEnum.Fist || weaponId > WeaponsEnum.Collision) {
            return "invalid_weapon"
        }
        return samp.callNative("GetWeaponName", "iSi", weaponId, 32)
    }

    setVehicleVelocity = (vehicleId: number, velocity: Vector3) => {
        return samp.callNative("SetVehicleVelocity", "ifff", vehicleId, velocity.x, velocity.y, velocity.z) === 1
    }

    setPlayerSkillLevel = (playerId: number, skillType: WeaponSkillsEnum, level: number): boolean => {
        return samp.callNative("SetPlayerSkillLevel", "iii", playerId, skillType, level) === 1
    }

    setPlayerColor = (playerId: number, color: string): void => {
        samp.callNative("SetPlayerColor", "ii", playerId, hexToRgbaInt(color))
    }

    setWeather = (weatherId: number): void => {
        samp.callNative("SetWeather", "i", weatherId)
    }

    setWorldTime = (hour: number): void => {
        samp.callNative("SetWorldTime", "i", hour)
    }

    setNameTagDrawDistance = (distance: number): void => {
        samp.callNative("SetNameTagDrawDistance", "f", distance)
    }

    enableStuntBonusForAll = (enable: boolean): void => {
        samp.callNative("EnableStuntBonusForAll", "i", enable ? 1 : 0)
    }

    sendRconCommand = (command: string): void => {
        samp.callNative("SendRconCommand", "s", command)
    }

    changeVehicleColor = (vehicleId: number, color1: number, color2: number): boolean => {
        return samp.callNative("ChangeVehicleColor", "iii", vehicleId, color1, color2) === 1
    }

    changeVehiclePaintjob = (vehicleid: number, paintjobid: number) => {
        samp.callNative("ChangeVehiclePaintjob", "ii", vehicleid, paintjobid)
    }

    repairVehicle = (vehicleid: number): number => {
        return samp.callNative("RepairVehicle", "i", vehicleid)
    }

    setPlayerAttachedObject = (
        playerId: number,
        index: number,
        modelid: number,
        bone: number,
        fOffsetX = 0,
        fOffsetY = 0,
        fOffsetZ = 0,
        fRotX = 0,
        fRotY = 0,
        fRotZ = 0,
        fScaleX = 1,
        fScaleY = 1,
        fScaleZ = 1,
        materialcolor1?: string,
        materialcolor2?: string,
    ) => {
        const values = [playerId, index, modelid, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ]

        if (materialcolor1 !== undefined) {
            values.push(hexToRgbaInt(materialcolor1))
        }

        if (materialcolor2 !== undefined) {
            values.push(hexToRgbaInt(materialcolor2))
        }

        return samp.callNative("SetPlayerAttachedObject", "iiiifffffffffii", ...values) === 1
    }

    removePlayerAttachedObject = (playerId: number, index: number) => {
        return samp.callNative("RemovePlayerAttachedObject", "ii", playerId, index) === 1
    }

    isPlayerAttachedObjectSlotUsed = (playerId: number, index: number) => {
        return samp.callNative("IsPlayerAttachedObjectSlotUsed", "ii", playerId, index) === 1
    }

    editAttachedObject = (playerId: number, index: number) => {
        return samp.callNative("EditAttachedObject", "ii", playerId, index) === 1
    }

    destroyVehicle = (vehicleId: number): boolean => {
        return samp.callNative("DestroyVehicle", "i", vehicleId) === 1
    }

    cancelEdit = (playerid: number): number => {
        return samp.callNative("CancelEdit", "i", playerid)
    }

    createVehicle = (
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
        ) as number

        if (vehicleId === 65535 || vehicleId === 0) {
            return undefined
        }

        return vehicleId
    }

    showPlayerDialog = (
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

    hidePlayerDialog(playerId: number) {
        samp.callNative("HidePlayerDialog", "i", playerId)
    }

    setPlayerName(playerId: number, name: string): boolean {
        return samp.callNative("SetPlayerName", "is", playerId, name) === 1
    }

    setPlayerInterior(playerId: number, interior: number): boolean {
        return samp.callNative("SetPlayerInterior", "ii", playerId, interior) === 1
    }

    getPlayerInterior(playerId: number): number {
        return samp.callNative("GetPlayerInterior", "i", playerId)
    }

    setPlayerVirtualWorld(playerId: number, world: number): boolean {
        return samp.callNative("SetPlayerVirtualWorld", "ii", playerId, world) === 1
    }

    getPlayerVirtualWorld(playerId: number): number {
        return samp.callNative("GetPlayerVirtualWorld", "i", playerId)
    }

    setPlayerTeam = (playerId: number, teamId: number): boolean => {
        return samp.callNative("SetPlayerTeam", "ii", playerId, teamId) === 1
    }

    setSpawnInfo(
        playerId: number,
        team: number,
        skinId: number,
        position: Vector3,
        rotation: number,
        weapons: { weapon: WeaponsEnum; ammo: number }[] = [],
    ): void {
        const weapon1 = weapons[0]?.weapon ?? WeaponsEnum.Fist
        const weapon1ammo = weapons[0]?.ammo ?? 0
        const weapon2 = weapons[1]?.weapon ?? WeaponsEnum.Fist
        const weapon2ammo = weapons[1]?.ammo ?? 0
        const weapon3 = weapons[2]?.weapon ?? WeaponsEnum.Fist
        const weapon3ammo = weapons[2]?.ammo ?? 0

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

    kick(playerId: number): void {
        samp.callNative("Kick", "i", playerId)
    }

    spawnPlayer(playerId: number): boolean {
        return samp.callNative("SpawnPlayer", "i", playerId) === 1
    }

    togglePlayerSpectating(playerId: number, toggle: boolean): boolean {
        return samp.callNative("TogglePlayerSpectating", "ii", playerId, toggle ? 1 : 0) === 1
    }

    sendClientMessage(playerId: number, color: string, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessage", "iis", playerId, hexToRgbaInt(color), `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessage", "iis", playerId, hexToRgbaInt(color), `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessage", "iis", playerId, hexToRgbaInt(color), message)
        }
    }

    setPlayerScore = (playerId: number, score: number): boolean => {
        return samp.callNative("SetPlayerScore", "ii", playerId, score) === 1
    }

    getPlayerScore = (playerId: number): number => {
        if (!this.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerScore", "i", playerId)
    }

    isPlayerInRangeOfPoint = (playerId: number, range: number, x: number, y: number, z: number): boolean => {
        return samp.callNative("IsPlayerInRangeOfPoint", "iffff", playerId, range, x, y, z) === 1
    }

    setVehiclePosition = (vehicleId: number, x: number, y: number, z: number): boolean => {
        return samp.callNative("SetVehiclePos", "ifff", vehicleId, x, y, z) === 1
    }

    applyAnimation = (
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

    clearAnimations = (playerId: number, forcesync: boolean): void => {
        samp.callNative("ClearAnimations", "ii", playerId, forcesync)
    }

    getPlayerAnimationIndex = (playerId: number): number => {
        return samp.callNative("GetPlayerAnimationIndex", "i", playerId)
    }

    getAnimationName = (index: number): { library: string; name: string } | undefined => {
        const res = samp.callNative("GetAnimationName", "iSiSi", index, 32, 32) as string[]

        if (res.length < 2) {
            return undefined
        }

        return {
            library: res[0],
            name: res[1],
        }
    }

    getPlayerVehicleSeat = (playerId: number): VehicleSeatsEnum | undefined => {
        const res = samp.callNative("GetPlayerVehicleSeat", "i", playerId)
        if (res === -1) {
            return undefined
        }
        return res
    }

    getPlayerSpecialAction = (playerId: number): SpecialActionsEnum => {
        return samp.callNative("GetPlayerSpecialAction", "i", playerId)
    }

    setPlayerSpecialAction = (playerId: number, actionId: SpecialActionsEnum): boolean => {
        return samp.callNative("SetPlayerSpecialAction", "ii", playerId, actionId) === 1
    }

    gpci = (playerId: number): string => {
        if (!this.isPlayerConnected(playerId)) {
            return "invalid_gpci"
        }
        return samp.callNative("gpci", "iSi", playerId, 61)
    }

    getPlayerName(playerId: number): string {
        if (!this.isPlayerConnected(playerId)) {
            return "invalid_name"
        }
        return samp.callNative("GetPlayerName", "iSi", playerId, 24)
    }

    getPlayerIp = (playerId: number): string => {
        if (!this.isPlayerConnected(playerId)) {
            return "255.255.255.255"
        }
        return samp.callNative("GetPlayerIp", "iSi", playerId, 17)
    }

    getPlayerPing = (playerId: number): number => {
        return samp.callNative("GetPlayerPing", "i", playerId)
    }

    givePlayerMoney = (playerId: number, money: number): boolean => {
        return samp.callNative("GivePlayerMoney", "ii", playerId, money) === 1
    }

    resetPlayerMoney = (playerId: number): boolean => {
        return samp.callNative("ResetPlayerMoney", "i", playerId) === 1
    }

    givePlayerWeapon = (playerId: number, weaponId: WeaponsEnum, ammo: number): boolean => {
        return samp.callNative("GivePlayerWeapon", "iii", playerId, weaponId, ammo) === 1
    }

    getPlayerWeapon = (playerId: number): WeaponsEnum => {
        if (!this.isPlayerConnected(playerId)) {
            return WeaponsEnum.Fist
        }
        return samp.callNative("GetPlayerWeapon", "i", playerId)
    }

    resetPlayerWeapons = (playerId: number): boolean => {
        return samp.callNative("ResetPlayerWeapons", "i", playerId) === 1
    }

    setPlayerArmedWeapon = (playerId: number, weaponId: WeaponsEnum) => {
        return samp.callNative("SetPlayerArmedWeapon", "ii", playerId, weaponId) === 1
    }

    setPlayerSkin = (playerId: number, skinId: number): boolean => {
        return samp.callNative("SetPlayerSkin", "ii", playerId, skinId) === 1
    }

    isPlayerConnected(playerId: number): boolean {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1
    }

    getPlayerPosition(playerId: number): Vector3 {
        if (!this.isPlayerConnected(playerId)) {
            return new Vector3()
        }

        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId) as number[]

        return new Vector3(pos[0], pos[1], pos[2])
    }

    getVehiclePosition = (vehicleId: number): Vector3 => {
        if (!this.isValidVehicle(vehicleId)) {
            return new Vector3()
        }

        const pos = samp.callNative("GetVehiclePos", "iFFF", vehicleId) as number[]

        return new Vector3(pos[0], pos[1], pos[2])
    }

    setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1
    }

    setPlayerHealth(playerId: number, health: number): boolean {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1
    }

    getPlayerHealth(playerId: number): number {
        if (!this.isPlayerConnected(playerId)) {
            return 100
        }
        return samp.callNative("GetPlayerHealth", "iF", playerId)
    }

    setPlayerArmour(playerId: number, armour: number): boolean {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1
    }

    getPlayerArmour(playerId: number): number {
        if (!this.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerArmour", "iF", playerId)
    }

    putPlayerInVehicle(playerId: number, vehicleId: number, seat = VehicleSeatsEnum.Driver): boolean {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1
    }

    getPlayerWeaponData = (playerId: number, slot: WeaponSlotsEnum): { model: WeaponsEnum; ammo: number } | undefined => {
        if (!this.isPlayerConnected(playerId)) {
            return undefined
        }

        const res = samp.callNative("GetPlayerWeaponData", "iiII", playerId, slot) as number[]

        if (res.length < 2) {
            return undefined
        }

        if (slot !== WeaponSlotsEnum.Unarmed && res[0] === 0) {
            return undefined
        }

        return {
            model: res[0],
            ammo: res[1],
        }
    }

    getPlayerVehicleId(playerId: number): number | undefined {
        const vehicleId = samp.callNative("GetPlayerVehicleID", "i", playerId)

        if (vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }

    getPlayerCameraMode = (playerId: number): CameraModesEnum => {
        if (!this.isPlayerConnected(playerId)) {
            return CameraModesEnum.FollowPed
        }
        return samp.callNative("GetPlayerCameraMode", "i", playerId)
    }

    setPlayerCameraPos = (playerid: number, position: Vector3): number => {
        return samp.callNative("SetPlayerCameraPos", "ifff", playerid, position.x, position.y, position.z)
    }

    setPlayerCameraLookAt = (playerid: number, position: Vector3, cut: CameraCutStylesEnum): number => {
        return samp.callNative("SetPlayerCameraLookAt", "ifffi", playerid, position.x, position.y, position.z, cut)
    }

    setCameraBehindPlayer = (playerid: number): number => {
        return samp.callNative("SetCameraBehindPlayer", "i", playerid)
    }

    getPlayerCameraPos = (playerid: number) => {
        const pos = samp.callNative("GetPlayerCameraPos", "iFFF", playerid) as number[]
        return new Vector3(pos[0], pos[1], pos[2])
    }

    getPlayerState(playerId: number): PlayerStatesEnum | undefined {
        if (!this.isPlayerConnected(playerId)) {
            return undefined
        }
        return samp.callNative("GetPlayerState", "i", playerId)
    }

    setPlayerRotation(playerId: number, rotation: number) {
        return samp.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1
    }

    getPlayerRotation(playerId: number): number {
        if (!this.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerFacingAngle", "iF", playerId)
    }

    setVehicleZAngle = (vehicleId: number, angle: number) => {
        return samp.callNative("SetVehicleZAngle", "if", vehicleId, angle) === 1
    }

    getVehicleZAngle = (vehicleId: number): number => {
        if (!this.isValidVehicle(vehicleId)) {
            return 0
        }
        return samp.callNative("GetVehicleZAngle", "iF", vehicleId)
    }

    setVehicleVirtualWorld = (vehicleId: number, worldId: number) => {
        return samp.callNative("SetVehicleVirtualWorld", "ii", vehicleId, worldId) === 1
    }

    getVehicleVirtualWorld = (vehicleId: number): number => {
        if (!this.isValidVehicle(vehicleId)) {
            return 0
        }
        return samp.callNative("GetVehicleVirtualWorld", "i", vehicleId)
    }

    linkVehicleToInterior = (vehicleId: number, interiorId: number): boolean => {
        return samp.callNative("LinkVehicleToInterior", "ii", vehicleId, interiorId) === 1
    }

    getVehicleDistanceFromPoint = (vehicleId: number, x: number, y: number, z: number): number => {
        if (!this.isValidVehicle(vehicleId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat("GetVehicleDistanceFromPoint", "ifff", vehicleId, x, y, z)
    }

    getPlayerDistanceFromPoint = (playerId: number, x: number, y: number, z: number): number => {
        if (!this.isPlayerConnected(playerId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat("GetPlayerDistanceFromPoint", "ifff", playerId, x, y, z)
    }

    sendClientMessageToAll(color: string, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessageToAll", "is", hexToRgbaInt(color), `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessageToAll", "is", hexToRgbaInt(color), `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessageToAll", "is", hexToRgbaInt(color), message)
        }
    }

    setPlayerChatBubble = (playerId: number, text: string, color: string, drawdistance: number, expiretime: number): boolean => {
        return samp.callNative("SetPlayerChatBubble", "isifi", playerId, text, hexToRgbaInt(color), drawdistance, expiretime) === 1
    }

    getVehicleModel(vehicleId: number): number | undefined {
        const modelId = samp.callNative("GetVehicleModel", "i", vehicleId)
        if (modelId === 0) {
            return undefined
        }
        return modelId
    }

    getVehicleHealth(vehicleId: number): number {
        if (!this.isValidVehicle(vehicleId)) {
            return 1000
        }
        return samp.callNative("GetVehicleHealth", "iF", vehicleId)
    }

    setVehicleHealth(vehicleId: number, health: number): boolean {
        return samp.callNative("SetVehicleHealth", "if", vehicleId, health) === 1
    }

    isValidVehicle(vehicleId: number): boolean {
        return samp.callNative("IsValidVehicle", "i", vehicleId) === 1
    }

    showNameTags = (show: number): number => {
        return samp.callNative("ShowNameTags", "i", show)
    }

    textDrawCreate = (x: number, y: number, text: string): number => {
        return samp.callNative("TextDrawCreate", "ffs", x, y, text)
    }

    textDrawDestroy = (text: number): number => {
        return samp.callNative("TextDrawDestroy", "i", text)
    }

    textDrawShowForPlayer = (playerid: number, text: number): number => {
        return samp.callNative("TextDrawShowForPlayer", "ii", playerid, text)
    }

    textDrawHideForPlayer = (playerid: number, text: number): number => {
        return samp.callNative("TextDrawHideForPlayer", "ii", playerid, text)
    }

    textDrawShowForAll = (text: number): number => {
        return samp.callNative("TextDrawShowForAll", "i", text)
    }

    textDrawHideForAll = (text: number): number => {
        return samp.callNative("TextDrawHideForAll", "i", text)
    }

    selectTextDraw = (playerid: number, hovercolor: string): number => {
        return samp.callNative("SelectTextDraw", "ii", playerid, hexToRgbaInt(hovercolor))
    }

    cancelSelectTextDraw = (playerid: number): number => {
        return samp.callNative("CancelSelectTextDraw", "i", playerid)
    }

    textDrawLetterSize = (text: number, x: number, y: number): number => {
        return samp.callNative("TextDrawLetterSize", "iff", text, x, y)
    }

    textDrawTextSize = (text: number, x: number, y: number): number => {
        return samp.callNative("TextDrawTextSize", "iff", text, x, y)
    }

    textDrawAlignment = (text: number, alignment: number): number => {
        return samp.callNative("TextDrawAlignment", "ii", text, alignment)
    }

    textDrawColor = (text: number, color: string): number => {
        return samp.callNative("TextDrawColor", "ii", text, hexToRgbaInt(color))
    }

    textDrawUseBox = (text: number, use: number): number => {
        return samp.callNative("TextDrawUseBox", "ii", text, use)
    }

    textDrawBoxColor = (text: number, color: string): number => {
        return samp.callNative("TextDrawBoxColor", "ii", text, hexToRgbaInt(color))
    }

    textDrawSetShadow = (text: number, size: number): number => {
        return samp.callNative("TextDrawSetShadow", "ii", text, size)
    }

    textDrawSetOutline = (text: number, size: number): number => {
        return samp.callNative("TextDrawSetOutline", "ii", text, size)
    }

    textDrawBackgroundColor = (text: number, color: string): number => {
        return samp.callNative("TextDrawBackgroundColor", "ii", text, hexToRgbaInt(color))
    }

    textDrawFont = (text: number, font: number): number => {
        return samp.callNative("TextDrawFont", "ii", text, font)
    }

    textDrawSetProportional = (text: number, set: number): number => {
        return samp.callNative("TextDrawSetProportional", "ii", text, set)
    }

    textDrawSetSelectable = (text: number, set: number): number => {
        return samp.callNative("TextDrawSetSelectable", "ii", text, set)
    }

    textDrawSetString = (text: number, string: string): number => {
        return samp.callNative("TextDrawSetString", "is", text, string)
    }

    textDrawSetPreviewModel = (text: number, modelindex: number): number => {
        return samp.callNative("TextDrawSetPreviewModel", "ii", text, modelindex)
    }

    textDrawSetPreviewRot = (text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number => {
        return samp.callNative("TextDrawSetPreviewRot", "iffff", text, fRotX, fRotY, fRotZ, fZoom)
    }

    textDrawSetPreviewVehCol = (text: number, color1: number, color2: number): number => {
        return samp.callNative("TextDrawSetPreviewVehCol", "iii", text, color1, color2)
    }

    textDrawSetPos(textId: number, x: number, y: number) {
        samp.callNative("TextDrawSetPos", "iff", textId, x, y)
    }
}

export const nativeFunctions = new NativeFunctions()
