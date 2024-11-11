import { hexToRgbaInt } from "@/lib/utils"
import {
    type CAMERA_CUT_STYLES,
    CAMERA_MODES,
    type DIALOG_STYLES,
    type PLAYER_BONES,
    type SPECIAL_ACTIONS,
    VEHICLE_SEATS,
    type VEHICLE_WINDOW_STATE,
    type WEAPON_SKILLS,
    type WEAPON_SLOTS,
    WEAPONS,
} from "@/wrapper/game/enums.public"
import { type EnumValue } from "@/lib/types"
import { type Position3 } from "@/lib/vector3"
import { type PlayerAttachedObjectSlot } from "@/components/player/attached-objects"

class GameNatives {
    isVehicleStreamedIn(vehicleId: number, playerId: number): boolean {
        return Boolean(samp.callNative("IsVehicleStreamedIn", "ii", vehicleId, playerId))
    }

    isPlayerStreamedIn(playerId: number, forPlayerId: number): boolean {
        return Boolean(samp.callNative("IsPlayerStreamedIn", "ii", playerId, forPlayerId))
    }

    attachTrailerToVehicle = (trailerId: number, vehicleId: number): true => {
        return Boolean(samp.callNative("AttachTrailerToVehicle", "ii", trailerId, vehicleId)) as true
    }

    detachTrailerFromVehicle = (vehicleId: number): void => {
        samp.callNative("DetachTrailerFromVehicle", "i", vehicleId)
    }

    isTrailerAttachedToVehicle = (vehicleId: number): boolean => {
        return Boolean(samp.callNative("IsTrailerAttachedToVehicle", "i", vehicleId))
    }

    getVehicleTrailer = (vehicleId: number): number | undefined => {
        const ret = samp.callNative("GetVehicleTrailer", "i", vehicleId)

        if (ret === 0) {
            // No trailer
            return undefined
        }

        return ret
    }

    setVehicleParamsCarWindows(
        vehicleId: number,
        frontLeft: EnumValue<typeof VEHICLE_WINDOW_STATE>,
        frontRight: EnumValue<typeof VEHICLE_WINDOW_STATE>,
        rearLeft: EnumValue<typeof VEHICLE_WINDOW_STATE>,
        rearRight: EnumValue<typeof VEHICLE_WINDOW_STATE>,
    ) {
        samp.callNative("SetVehicleParamsCarWindows", "iiiii", vehicleId, frontLeft, frontRight, rearLeft, rearRight)
    }

    getVehicleParamsCarWindows(vehicleId: number) {
        const data = samp.callNative("GetVehicleParamsCarWindows", "iIIII", vehicleId) as (-1 | 0 | 1)[]

        return {
            frontLeft: data[0],
            frontRight: data[1],
            rearLeft: data[2],
            rearRight: data[3],
        }
    }

    getVehicleDamageStatus(vehicleId: number) {
        const data = samp.callNative("GetVehicleDamageStatus", "iIIII", vehicleId) as number[]

        return {
            panels: data[0],
            doors: data[1],
            lights: data[2],
            tires: data[3],
        }
    }

    updateVehicleDamageStatus(vehicleId: number, panels: number, doors: number, lights: number, tires: number) {
        samp.callNative("UpdateVehicleDamageStatus", "iiiii", vehicleId, panels, doors, lights, tires)
    }

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

    interpolateCameraPos = (playerId: number, from: Position3, to: Position3, time: number, cut: EnumValue<typeof CAMERA_CUT_STYLES>) => {
        samp.callNative("InterpolateCameraPos", "iffffffii", playerId, from.x, from.y, from.z, to.x, to.y, to.z, time, cut)
    }

    interpolateCameraLookAt = (
        playerId: number,
        from: Position3,
        to: Position3,
        time: number,
        cut: EnumValue<typeof CAMERA_CUT_STYLES>,
    ) => {
        samp.callNative("InterpolateCameraLookAt", "iffffffii", playerId, from.x, from.y, from.z, to.x, to.y, to.z, time, cut)
    }

    manualVehicleEngineAndLights = () => {
        samp.callNative("ManualVehicleEngineAndLights", "")
    }

    setVehicleNumberPlate = (vehicleId: number, numberPlate: string) => {
        samp.callNative("SetVehicleNumberPlate", "is", vehicleId, numberPlate)
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
    ) => {
        samp.callNative(
            "SetVehicleParamsEx",
            "iiiiiiii",
            vehicleId,
            engine ? 1 : 0,
            lights ? 1 : 0,
            alarm ? 1 : 0,
            doors ? 1 : 0,
            bonnet ? 1 : 0,
            boot ? 1 : 0,
            objective ? 1 : 0,
        )
    }

    getVehicleParamsEx = (vehicleId: number) => {
        const res = samp.callNative("GetVehicleParamsEx", "iIIIIIII", vehicleId) as (-1 | 0 | 1)[]

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

    getServerTickRate = () => {
        return samp.callNative("GetServerTickRate", "") as unknown as number
    }

    disableInteriorEnterExits = (): void => {
        samp.callNative("DisableInteriorEnterExits", "")
    }

    getVehicleVelocity = (vehicleId: number) => {
        const res = samp.callNative("GetVehicleVelocity", "iFFF", vehicleId) as number[]
        return { x: res[0], y: res[1], z: res[2] }
    }

    getWeaponName = (weaponId: EnumValue<typeof WEAPONS>) => {
        return samp.callNative("GetWeaponName", "iSi", weaponId, 32) as unknown as string
    }

    setVehicleVelocity = (vehicleId: number, velocity: Position3) => {
        samp.callNative("SetVehicleVelocity", "ifff", vehicleId, velocity.x, velocity.y, velocity.z)
    }

    setPlayerSkillLevel = (playerId: number, skillType: EnumValue<typeof WEAPON_SKILLS>, level: number) => {
        samp.callNative("SetPlayerSkillLevel", "iii", playerId, skillType, level)
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

    enableStuntBonusForAll = (enable: 0 | 1): void => {
        samp.callNative("EnableStuntBonusForAll", "i", enable)
    }

    sendRconCommand = (command: string): void => {
        samp.callNative("SendRconCommand", "s", command)
    }

    changeVehicleColor = (vehicleId: number, color1: number, color2: number) => {
        samp.callNative("ChangeVehicleColor", "iii", vehicleId, color1, color2)
    }

    changeVehiclePaintjob = (vehicleId: number, paintjobId: number) => {
        samp.callNative("ChangeVehiclePaintjob", "ii", vehicleId, paintjobId)
    }

    repairVehicle = (vehicleId: number) => {
        samp.callNative("RepairVehicle", "i", vehicleId)
    }

    setPlayerAmmo(playerId: number, weaponId: EnumValue<typeof WEAPONS>, ammo: number) {
        samp.callNative("SetPlayerAmmo", "iii", playerId, weaponId, ammo)
    }

    setPlayerAttachedObject = (
        playerId: number,
        index: PlayerAttachedObjectSlot,
        modelId: number,
        bone: EnumValue<typeof PLAYER_BONES>,
        fOffsetX = 0.0,
        fOffsetY = 0.0,
        fOffsetZ = 0.0,
        fRotX = 0.0,
        fRotY = 0.0,
        fRotZ = 0.0,
        fScaleX = 1.0,
        fScaleY = 1.0,
        fScaleZ = 1.0,
        materialcolor1?: string,
        materialcolor2?: string,
    ) => {
        const values = [playerId, index, modelId, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ]

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

    cancelEdit = (playerId: number): number => {
        return samp.callNative("CancelEdit", "i", playerId)
    }

    createVehicle = (
        modelId: number,
        position: Position3,
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
        styleId: EnumValue<typeof DIALOG_STYLES>,
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
        position: Position3,
        rotation: number,
        weapons: { weapon: EnumValue<typeof WEAPONS>; ammo: number }[] = [],
    ): void {
        const weapon1 = weapons[0]?.weapon ?? WEAPONS.fist
        const weapon1ammo = weapons[0]?.ammo ?? 0
        const weapon2 = weapons[1]?.weapon ?? WEAPONS.fist
        const weapon2ammo = weapons[1]?.ammo ?? 0
        const weapon3 = weapons[2]?.weapon ?? WEAPONS.fist
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
        // messages can contain colors in this format: {FF0000}Hello
        // that adds inaccurate length to the message string
        // so we need to calculate the length of the message without color tags

        if (message.length <= 90) {
            samp.callNative("SendClientMessage", "iis", playerId, hexToRgbaInt(color), message)
            return
        }

        const parts = Math.ceil(message.length / 90)

        samp.callNative("SendClientMessage", "iis", playerId, hexToRgbaInt(color), message.slice(0, 90) + " ...")

        for (let i = 1; i < parts; i++) {
            const part = message.slice(i * 90, (i + 1) * 90)

            samp.callNative(
                "SendClientMessage",
                "iis",
                playerId,
                hexToRgbaInt(color),
                i === parts - 1 ? "... " + part : "... " + part + " ...",
            )
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

    getPlayerVehicleSeat = (playerId: number) => {
        const res = samp.callNative("GetPlayerVehicleSeat", "i", playerId) as EnumValue<typeof VEHICLE_SEATS> | -1

        if (res === -1) {
            return undefined
        }

        return res
    }

    getPlayerSpecialAction = (playerId: number) => {
        return samp.callNative("GetPlayerSpecialAction", "i", playerId) as EnumValue<typeof SPECIAL_ACTIONS>
    }

    setPlayerSpecialAction = (playerId: number, actionId: EnumValue<typeof SPECIAL_ACTIONS>): boolean => {
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

    givePlayerWeapon = (playerId: number, weaponId: EnumValue<typeof WEAPONS>, ammo: number): boolean => {
        return samp.callNative("GivePlayerWeapon", "iii", playerId, weaponId, ammo) === 1
    }

    getPlayerWeapon = (playerId: number) => {
        const id = samp.callNative("GetPlayerWeapon", "i", playerId) as EnumValue<typeof WEAPONS & { invalid: -1 }>

        if (id === -1) {
            return WEAPONS.fist
        }

        return id
    }

    resetPlayerWeapons = (playerId: number): boolean => {
        return samp.callNative("ResetPlayerWeapons", "i", playerId) === 1
    }

    setPlayerArmedWeapon = (playerId: number, weaponId: EnumValue<typeof WEAPONS>) => {
        return samp.callNative("SetPlayerArmedWeapon", "ii", playerId, weaponId) === 1
    }

    setPlayerSkin = (playerId: number, skinId: number): boolean => {
        return samp.callNative("SetPlayerSkin", "ii", playerId, skinId) === 1
    }

    isPlayerConnected(playerId: number): boolean {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1
    }

    getPlayerPosition(playerId: number): Position3 {
        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId) as number[]
        return { x: pos[0], y: pos[1], z: pos[2] }
    }

    getVehiclePosition = (vehicleId: number): Position3 => {
        const pos = samp.callNative("GetVehiclePos", "iFFF", vehicleId) as number[]

        return { x: pos[0], y: pos[1], z: pos[2] }
    }

    setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1
    }

    setPlayerHealth(playerId: number, health: number): boolean {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1
    }

    getPlayerHealth(playerId: number): number {
        return samp.callNative("GetPlayerHealth", "iF", playerId)
    }

    setPlayerArmour(playerId: number, armour: number): boolean {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1
    }

    getPlayerArmour(playerId: number): number {
        return samp.callNative("GetPlayerArmour", "iF", playerId)
    }

    putPlayerInVehicle(playerId: number, vehicleId: number, seat: EnumValue<typeof VEHICLE_SEATS> = VEHICLE_SEATS.driver): boolean {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1
    }

    getPlayerWeaponData = (playerId: number, slot: EnumValue<typeof WEAPON_SLOTS>): { model: EnumValue<typeof WEAPONS>; ammo: number } => {
        const res = samp.callNative("GetPlayerWeaponData", "iiII", playerId, slot) as [EnumValue<typeof WEAPONS>, number]

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

    getPlayerCameraMode = (playerId: number) => {
        if (!this.isPlayerConnected(playerId)) {
            return CAMERA_MODES["follow-ped"]
        }

        return samp.callNative("GetPlayerCameraMode", "i", playerId) as EnumValue<typeof CAMERA_MODES>
    }

    setPlayerCameraPos = (playerId: number, position: Position3): number => {
        return samp.callNative("SetPlayerCameraPos", "ifff", playerId, position.x, position.y, position.z)
    }

    setPlayerCameraLookAt = (playerId: number, position: Position3, cut: EnumValue<typeof CAMERA_CUT_STYLES>): number => {
        return samp.callNative("SetPlayerCameraLookAt", "ifffi", playerId, position.x, position.y, position.z, cut)
    }

    setCameraBehindPlayer = (playerId: number): number => {
        return samp.callNative("SetCameraBehindPlayer", "i", playerId)
    }

    getPlayerCameraPos = (playerId: number) => {
        const pos = samp.callNative("GetPlayerCameraPos", "iFFF", playerId) as number[]
        return { x: pos[0], y: pos[1], z: pos[2] }
    }

    getPlayerState(playerId: number): number | undefined {
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

    textDrawShowForPlayer = (playerId: number, text: number): number => {
        return samp.callNative("TextDrawShowForPlayer", "ii", playerId, text)
    }

    textDrawHideForPlayer = (playerId: number, text: number): number => {
        return samp.callNative("TextDrawHideForPlayer", "ii", playerId, text)
    }

    textDrawShowForAll = (text: number): number => {
        return samp.callNative("TextDrawShowForAll", "i", text)
    }

    textDrawHideForAll = (text: number): number => {
        return samp.callNative("TextDrawHideForAll", "i", text)
    }

    selectTextDraw = (playerId: number, hovercolor: string): number => {
        return samp.callNative("SelectTextDraw", "ii", playerId, hexToRgbaInt(hovercolor))
    }

    cancelSelectTextDraw = (playerId: number): number => {
        return samp.callNative("CancelSelectTextDraw", "i", playerId)
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

export const gameNatives = new GameNatives()
