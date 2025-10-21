import { hexToRgbaInt } from "@/lib/utils"
import {
    type CAMERA_CUT_STYLES,
    CAMERA_MODES,
    type DIALOG_STYLES,
    type PLAYER_BONES,
    type PLAYER_STATES,
    type SPECIAL_ACTIONS,
    SPECTATE_MODES,
    type SPECTATE_TYPES,
    type TEXT_DRAW_ALIGNMENTS,
    type TEXT_DRAW_FONTS,
    VEHICLE_SEATS,
    type VEHICLE_WINDOW_STATES,
    type WEAPON_SKILLS,
    type WEAPON_SLOTS,
    WEAPONS,
} from "@/wrapper/game/enums.public"
import { type EnumValue } from "@/lib/types"
import { Vector3, type Position3 } from "@/lib/vector3"
import { type PlayerAttachedObjectSlot } from "@/components/player/attached-objects"
import { charset } from "@/lib/charset"
import { nativeHook } from "@/lib/native-hook"

class GameNatives {
    isPlayerTextDrawVisible = (playerId: number, text: number): boolean => {
        return Boolean(nativeHook.callNative("IsPlayerTextDrawVisible", "ii", playerId, text))
    }

    isVehicleStreamedIn(vehicleId: number, playerId: number): boolean {
        return Boolean(nativeHook.callNative("IsVehicleStreamedIn", "ii", vehicleId, playerId))
    }

    isPlayerStreamedIn(playerId: number, forPlayerId: number): boolean {
        return Boolean(nativeHook.callNative("IsPlayerStreamedIn", "ii", playerId, forPlayerId))
    }

    attachTrailerToVehicle = (trailerId: number, vehicleId: number): true => {
        return Boolean(nativeHook.callNative("AttachTrailerToVehicle", "ii", trailerId, vehicleId)) as true
    }

    detachTrailerFromVehicle = (vehicleId: number): void => {
        nativeHook.callNative("DetachTrailerFromVehicle", "i", vehicleId)
    }

    isTrailerAttachedToVehicle = (vehicleId: number): boolean => {
        return Boolean(nativeHook.callNative("IsTrailerAttachedToVehicle", "i", vehicleId))
    }

    getVehicleTrailer = (vehicleId: number): number | undefined => {
        const ret = nativeHook.callNative("GetVehicleTrailer", "i", vehicleId)

        if (ret === 0) {
            // No trailer
            return undefined
        }

        return ret
    }

    getVehicleRotationQuat(vehicleId: number) {
        const data = nativeHook.callNative("GetVehicleRotationQuat", "iFFFF", vehicleId) as number[]

        return {
            w: data[0],
            x: data[1],
            y: data[2],
            z: data[3],
        }
    }

    getVehicleMatrix(vehicleId: number) {
        const data = nativeHook.callNative("GetVehicleMatrix", "iFFFFFFFFF", vehicleId) as number[]

        return {
            right: new Vector3(data[0], data[1], data[2]),
            up: new Vector3(data[3], data[4], data[5]),
            at: new Vector3(data[6], data[7], data[8]),
        }
    }

    setVehicleParamsCarWindows(
        vehicleId: number,
        frontLeft: EnumValue<typeof VEHICLE_WINDOW_STATES>,
        frontRight: EnumValue<typeof VEHICLE_WINDOW_STATES>,
        rearLeft: EnumValue<typeof VEHICLE_WINDOW_STATES>,
        rearRight: EnumValue<typeof VEHICLE_WINDOW_STATES>,
    ) {
        nativeHook.callNative("SetVehicleParamsCarWindows", "iiiii", vehicleId, frontLeft, frontRight, rearLeft, rearRight)
    }

    getVehicleParamsCarWindows(vehicleId: number) {
        const data = nativeHook.callNative("GetVehicleParamsCarWindows", "iIIII", vehicleId) as (-1 | 0 | 1)[]

        return {
            frontLeft: data[0],
            frontRight: data[1],
            rearLeft: data[2],
            rearRight: data[3],
        }
    }

    getVehicleDamageStatus(vehicleId: number) {
        if (!this.isValidVehicle(vehicleId)) {
            return { panels: 0, doors: 0, lights: 0, tires: 0 }
        }

        const [panels, doors, lights, tires] = nativeHook.callNative("GetVehicleDamageStatus", "iIIII", vehicleId) as number[]

        return { panels, doors, lights, tires }
    }

    updateVehicleDamageStatus(vehicleId: number, panels: number, doors: number, lights: number, tires: number) {
        nativeHook.callNative("UpdateVehicleDamageStatus", "iiiii", vehicleId, panels, doors, lights, tires)
    }

    /*getVehicleSpawnInfo(vehicleId: number) {
        // Getting some weird issues from the native GetVehicleSpawnInfo, so storing it separately
        // In my case, Streamer_GetNearbyItems will return pickups that exceed the range I set in the parameters, leading to bugs

        const data = nativeHook.callNative("GetVehicleSpawnInfo", "iFFFFII", vehicleId) as number[]

        return {
            spawnX: data[0],
            spawnY: data[1],
            spawnZ: data[2],
            spawnAngle: data[3],
            primaryColor: data[4],
            secondaryColor: data[5],
        }
    }*/

    setVehicleSpawnInfo(
        vehicleId: number,
        modelId: number,
        position: Position3,
        angle: number,
        primaryColor: number,
        secondaryColor: number,
        respawnDelay: number,
        interior: number,
    ): void {
        nativeHook.callNative(
            "SetVehicleSpawnInfo",
            "iiffffiiii",
            vehicleId,
            modelId,
            position.x,
            position.y,
            position.z,
            angle,
            primaryColor,
            secondaryColor,
            respawnDelay,
            interior,
        )
    }

    setVehicleToRespawn(vehicleId: number): boolean {
        return nativeHook.callNative("SetVehicleToRespawn", "i", vehicleId) === 1
    }

    interpolateCameraPos = (playerId: number, from: Position3, to: Position3, time: number, cut: EnumValue<typeof CAMERA_CUT_STYLES>) => {
        nativeHook.callNative("InterpolateCameraPos", "iffffffii", playerId, from.x, from.y, from.z, to.x, to.y, to.z, time, cut)
    }

    interpolateCameraLookAt = (
        playerId: number,
        from: Position3,
        to: Position3,
        time: number,
        cut: EnumValue<typeof CAMERA_CUT_STYLES>,
    ) => {
        nativeHook.callNative("InterpolateCameraLookAt", "iffffffii", playerId, from.x, from.y, from.z, to.x, to.y, to.z, time, cut)
    }

    manualVehicleEngineAndLights = () => {
        nativeHook.callNative("ManualVehicleEngineAndLights", "")
    }

    setVehicleNumberPlate = (vehicleId: number, numberPlate: string) => {
        nativeHook.callNative("SetVehicleNumberPlate", "is", vehicleId, numberPlate)
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
        nativeHook.callNative(
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
        const res = nativeHook.callNative("GetVehicleParamsEx", "iIIIIIII", vehicleId) as (-1 | 0 | 1)[]

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
        return nativeHook.callNative("GetServerTickRate", "") as unknown as number
    }

    disableInteriorEnterExits = (): void => {
        nativeHook.callNative("DisableInteriorEnterExits", "")
    }

    getVehicleVelocity = (vehicleId: number) => {
        const res = nativeHook.callNative("GetVehicleVelocity", "iFFF", vehicleId) as number[]
        return { x: res[0], y: res[1], z: res[2] }
    }

    getWeaponName = (weaponId: EnumValue<typeof WEAPONS>) => {
        return nativeHook.callNative("GetWeaponName", "iSi", weaponId, 32) as unknown as string
    }

    setVehicleVelocity = (vehicleId: number, velocity: Position3) => {
        nativeHook.callNative("SetVehicleVelocity", "ifff", vehicleId, velocity.x, velocity.y, velocity.z)
    }

    getPlayerVelocity = (playerId: number): Position3 => {
        const res = nativeHook.callNative("GetPlayerVelocity", "iFFF", playerId) as number[]

        return { x: res[0], y: res[1], z: res[2] }
    }

    setPlayerVelocity = (playerId: number, velocity: Position3) => {
        return nativeHook.callNative("SetPlayerVelocity", "ifff", playerId, velocity.x, velocity.y, velocity.z) === 1
    }

    setPlayerSkillLevel = (playerId: number, skillType: EnumValue<typeof WEAPON_SKILLS>, level: number) => {
        nativeHook.callNative("SetPlayerSkillLevel", "iii", playerId, skillType, level)
    }

    setPlayerColor = (playerId: number, color: string): void => {
        nativeHook.callNative("SetPlayerColor", "ii", playerId, hexToRgbaInt(color))
    }

    setWeather = (weatherId: number): void => {
        nativeHook.callNative("SetWeather", "i", weatherId)
    }

    setWorldTime = (hour: number): void => {
        nativeHook.callNative("SetWorldTime", "i", hour)
    }

    setNameTagDrawDistance = (distance: number): void => {
        nativeHook.callNative("SetNameTagDrawDistance", "f", distance)
    }

    enableStuntBonusForAll = (enable: 0 | 1): void => {
        nativeHook.callNative("EnableStuntBonusForAll", "i", enable)
    }

    sendRconCommand = (command: string): void => {
        nativeHook.callNative("SendRconCommand", "s", command)
    }

    changeVehicleColor = (vehicleId: number, color1: number, color2: number) => {
        nativeHook.callNative("ChangeVehicleColor", "iii", vehicleId, color1, color2)
    }

    changeVehiclePaintjob = (vehicleId: number, paintjobId: number) => {
        nativeHook.callNative("ChangeVehiclePaintjob", "ii", vehicleId, paintjobId)
    }

    repairVehicle = (vehicleId: number) => {
        nativeHook.callNative("RepairVehicle", "i", vehicleId)
    }

    setPlayerAmmo(playerId: number, weaponId: EnumValue<typeof WEAPONS>, ammo: number) {
        nativeHook.callNative("SetPlayerAmmo", "iii", playerId, weaponId, ammo)
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

        return nativeHook.callNative("SetPlayerAttachedObject", "iiiifffffffffii", ...values) === 1
    }

    removePlayerAttachedObject = (playerId: number, index: number) => {
        return nativeHook.callNative("RemovePlayerAttachedObject", "ii", playerId, index) === 1
    }

    isPlayerAttachedObjectSlotUsed = (playerId: number, index: number) => {
        return nativeHook.callNative("IsPlayerAttachedObjectSlotUsed", "ii", playerId, index) === 1
    }

    editAttachedObject = (playerId: number, index: number) => {
        return nativeHook.callNative("EditAttachedObject", "ii", playerId, index) === 1
    }

    togglePlayerControllable = (playerId: number, toggle: boolean) => {
        return Boolean(nativeHook.callNative("TogglePlayerControllable", "ii", playerId, toggle ? 1 : 0))
    }

    isPlayerControllable = (playerId: number) => {
        return Boolean(nativeHook.callNative("IsPlayerControllable", "i", playerId))
    }

    playerSpectatePlayer = (playerId: number, targetId: number, mode: EnumValue<typeof SPECTATE_MODES> = SPECTATE_MODES.normal) => {
        return Boolean(nativeHook.callNative("PlayerSpectatePlayer", "iii", playerId, targetId, mode))
    }

    playerSpectateVehicle = (playerId: number, vehicleId: number, mode: EnumValue<typeof SPECTATE_MODES> = SPECTATE_MODES.normal) => {
        return Boolean(nativeHook.callNative("PlayerSpectateVehicle", "iii", playerId, vehicleId, mode))
    }

    getPlayerSpectateType = (playerId: number): EnumValue<typeof SPECTATE_TYPES> => {
        return nativeHook.callNative("GetPlayerSpectateType", "i", playerId) as EnumValue<typeof SPECTATE_TYPES>
    }

    getPlayerSpectateId = (playerId: number): number => {
        return nativeHook.callNative("GetPlayerSpectateID", "i", playerId) as number
    }

    destroyVehicle = (vehicleId: number): boolean => {
        return nativeHook.callNative("DestroyVehicle", "i", vehicleId) === 1
    }

    cancelEdit = (playerId: number): number => {
        return nativeHook.callNative("CancelEdit", "i", playerId)
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
        const vehicleId = nativeHook.callNative(
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
        const captionEncoded = charset.encode(caption)
        const infoEncoded = charset.encode(info)
        const button1Encoded = charset.encode(button1)
        const button2Encoded = charset.encode(button2)

        return (
            nativeHook.callNative(
                "ShowPlayerDialog",
                `iii${captionEncoded.flag}${infoEncoded.flag}${button1Encoded.flag}${button2Encoded.flag}`,
                playerId,
                dialogId,
                styleId,
                captionEncoded.encoded,
                infoEncoded.encoded,
                button1Encoded.encoded,
                button2Encoded.encoded,
            ) === 1
        )
    }

    hidePlayerDialog(playerId: number) {
        nativeHook.callNative("HidePlayerDialog", "i", playerId)
    }

    setPlayerName(playerId: number, name: string): boolean {
        return nativeHook.callNative("SetPlayerName", "is", playerId, name) === 1
    }

    setPlayerInterior(playerId: number, interior: number): boolean {
        return nativeHook.callNative("SetPlayerInterior", "ii", playerId, interior) === 1
    }

    getPlayerInterior(playerId: number): number {
        return nativeHook.callNative("GetPlayerInterior", "i", playerId)
    }

    setPlayerVirtualWorld(playerId: number, world: number): boolean {
        return nativeHook.callNative("SetPlayerVirtualWorld", "ii", playerId, world) === 1
    }

    getPlayerVirtualWorld(playerId: number): number {
        return nativeHook.callNative("GetPlayerVirtualWorld", "i", playerId)
    }

    setPlayerTeam = (playerId: number, teamId: number): boolean => {
        return nativeHook.callNative("SetPlayerTeam", "ii", playerId, teamId) === 1
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

        nativeHook.callNative(
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

    getSpawnInfo(playerId: number): {
        team: number
        skin: number
        position: Position3
        rotation: number
        weapons: { weapon: EnumValue<typeof WEAPONS>; ammo: number }[]
    } {
        const result = nativeHook.callNative("GetSpawnInfo", "iIIFFFFIIIIII", playerId) as number[]

        if (result.length < 12) {
            throw new Error("GetSpawnInfo returned invalid data")
        }

        const [team, skin, x, y, z, angle, weapon1, ammo1, weapon2, ammo2, weapon3, ammo3] = result

        return {
            team,
            skin,
            position: { x, y, z },
            rotation: angle,
            weapons: [
                {
                    weapon: weapon1 as EnumValue<typeof WEAPONS>,
                    ammo: ammo1,
                },
                {
                    weapon: weapon2 as EnumValue<typeof WEAPONS>,
                    ammo: ammo2,
                },
                {
                    weapon: weapon3 as EnumValue<typeof WEAPONS>,
                    ammo: ammo3,
                },
            ],
        }
    }

    kick(playerId: number): void {
        nativeHook.callNative("Kick", "i", playerId)
    }

    spawnPlayer(playerId: number): boolean {
        return nativeHook.callNative("SpawnPlayer", "i", playerId) === 1
    }

    togglePlayerSpectating(playerId: number, toggle: boolean): boolean {
        return nativeHook.callNative("TogglePlayerSpectating", "ii", playerId, toggle ? 1 : 0) === 1
    }

    sendClientMessage(playerId: number, color: string, message: string): void {
        // messages can contain colors in this format: {FF0000}Hello
        // that adds inaccurate length to the message string
        // so we need to calculate the length of the message without color tags

        const { flag, encoded } = charset.encode(message)

        if (message.length <= 90) {
            nativeHook.callNative("SendClientMessage", `ii${flag}`, playerId, hexToRgbaInt(color), encoded)
            return
        }

        const parts = Math.ceil(message.length / 90)

        nativeHook.callNative(
            "SendClientMessage",
            `ii${flag}`,
            playerId,
            hexToRgbaInt(color),
            charset.encode(message.slice(0, 90) + " ...").encoded,
        )

        for (let i = 1; i < parts; i++) {
            const part = message.slice(i * 90, (i + 1) * 90)

            nativeHook.callNative(
                "SendClientMessage",
                `ii${flag}`,
                playerId,
                hexToRgbaInt(color),
                charset.encode(i === parts - 1 ? "... " + part : "... " + part + " ...").encoded,
            )
        }
    }

    setPlayerScore = (playerId: number, score: number): boolean => {
        return nativeHook.callNative("SetPlayerScore", "ii", playerId, score) === 1
    }

    getPlayerScore = (playerId: number): number => {
        if (!this.isPlayerConnected(playerId)) {
            return 0
        }
        return nativeHook.callNative("GetPlayerScore", "i", playerId)
    }

    isPlayerInRangeOfPoint = (playerId: number, range: number, x: number, y: number, z: number): boolean => {
        return nativeHook.callNative("IsPlayerInRangeOfPoint", "iffff", playerId, range, x, y, z) === 1
    }

    setVehiclePosition = (vehicleId: number, x: number, y: number, z: number): boolean => {
        return nativeHook.callNative("SetVehiclePos", "ifff", vehicleId, x, y, z) === 1
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
        nativeHook.callNative(
            "ApplyAnimation",
            "issfiiiiii",
            playerId,
            animlib,
            animname,
            fDelta,
            loop,
            lockx,
            locky,
            freeze,
            time,
            forcesync,
        )
    }

    clearAnimations = (playerId: number, forcesync: boolean): void => {
        nativeHook.callNative("ClearAnimations", "ii", playerId, forcesync)
    }

    getPlayerAnimationIndex = (playerId: number): number => {
        return nativeHook.callNative("GetPlayerAnimationIndex", "i", playerId)
    }

    getAnimationName = (index: number): { library: string; name: string } | undefined => {
        const res = nativeHook.callNative("GetAnimationName", "iSiSi", index, 32, 32) as string[]

        if (res.length < 2) {
            return undefined
        }

        return {
            library: res[0],
            name: res[1],
        }
    }

    getPlayerVehicleSeat = (playerId: number) => {
        const res = nativeHook.callNative("GetPlayerVehicleSeat", "i", playerId) as EnumValue<typeof VEHICLE_SEATS> | -1

        if (res === -1) {
            return undefined
        }

        return res
    }

    getPlayerSpecialAction = (playerId: number) => {
        return nativeHook.callNative("GetPlayerSpecialAction", "i", playerId) as EnumValue<typeof SPECIAL_ACTIONS>
    }

    setPlayerSpecialAction = (playerId: number, actionId: EnumValue<typeof SPECIAL_ACTIONS>): boolean => {
        return nativeHook.callNative("SetPlayerSpecialAction", "ii", playerId, actionId) === 1
    }

    gpci = (playerId: number): string => {
        if (!this.isPlayerConnected(playerId)) {
            return "invalid_gpci"
        }
        return nativeHook.callNative("gpci", "iSi", playerId, 61)
    }

    getPlayerName(playerId: number): string {
        if (!this.isPlayerConnected(playerId)) {
            return "invalid_name"
        }
        return nativeHook.callNative("GetPlayerName", "iSi", playerId, 24)
    }

    getPlayerIp = (playerId: number): string => {
        if (!this.isPlayerConnected(playerId)) {
            return "255.255.255.255"
        }
        return nativeHook.callNative("GetPlayerIp", "iSi", playerId, 17)
    }

    getPlayerPing = (playerId: number): number => {
        return nativeHook.callNative("GetPlayerPing", "i", playerId)
    }

    givePlayerMoney = (playerId: number, money: number): boolean => {
        return nativeHook.callNative("GivePlayerMoney", "ii", playerId, money) === 1
    }

    resetPlayerMoney = (playerId: number): boolean => {
        return nativeHook.callNative("ResetPlayerMoney", "i", playerId) === 1
    }

    givePlayerWeapon = (playerId: number, weaponId: EnumValue<typeof WEAPONS>, ammo: number): boolean => {
        return nativeHook.callNative("GivePlayerWeapon", "iii", playerId, weaponId, ammo) === 1
    }

    getPlayerWeapon = (playerId: number) => {
        const id = nativeHook.callNative("GetPlayerWeapon", "i", playerId) as EnumValue<typeof WEAPONS & { invalid: -1 }>

        if (id === -1) {
            return WEAPONS.fist
        }

        return id
    }

    resetPlayerWeapons = (playerId: number): boolean => {
        return nativeHook.callNative("ResetPlayerWeapons", "i", playerId) === 1
    }

    setPlayerArmedWeapon = (playerId: number, weaponId: EnumValue<typeof WEAPONS>) => {
        return nativeHook.callNative("SetPlayerArmedWeapon", "ii", playerId, weaponId) === 1
    }

    setPlayerSkin = (playerId: number, skinId: number): boolean => {
        return nativeHook.callNative("SetPlayerSkin", "ii", playerId, skinId) === 1
    }

    isPlayerConnected(playerId: number): boolean {
        return nativeHook.callNative("IsPlayerConnected", "i", playerId) === 1
    }

    getPlayerPosition(playerId: number): Position3 {
        const pos = nativeHook.callNative("GetPlayerPos", "iFFF", playerId) as number[]
        return { x: pos[0], y: pos[1], z: pos[2] }
    }

    getVehiclePosition = (vehicleId: number): Position3 => {
        const pos = nativeHook.callNative("GetVehiclePos", "iFFF", vehicleId) as number[]

        return { x: pos[0], y: pos[1], z: pos[2] }
    }

    setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean {
        return nativeHook.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1
    }

    setPlayerHealth(playerId: number, health: number): boolean {
        return nativeHook.callNative("SetPlayerHealth", "if", playerId, health) === 1
    }

    getPlayerHealth(playerId: number): number {
        return nativeHook.callNative("GetPlayerHealth", "iF", playerId)
    }

    setPlayerArmour(playerId: number, armour: number): boolean {
        return nativeHook.callNative("SetPlayerArmour", "if", playerId, armour) === 1
    }

    getPlayerArmour(playerId: number): number {
        return nativeHook.callNative("GetPlayerArmour", "iF", playerId)
    }

    putPlayerInVehicle(playerId: number, vehicleId: number, seat: EnumValue<typeof VEHICLE_SEATS> = VEHICLE_SEATS.driver): boolean {
        return nativeHook.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1
    }

    remvovePlayerFromVehicle(playerId: number, force: boolean): boolean {
        return nativeHook.callNative("RemovePlayerFromVehicle", "ii", playerId, force) === 1
    }

    getPlayerWeaponData = (playerId: number, slot: EnumValue<typeof WEAPON_SLOTS>): { model: EnumValue<typeof WEAPONS>; ammo: number } => {
        const res = nativeHook.callNative("GetPlayerWeaponData", "iiII", playerId, slot) as [EnumValue<typeof WEAPONS>, number]

        return {
            model: res[0],
            ammo: res[1],
        }
    }

    getPlayerVehicleId(playerId: number): number | undefined {
        const vehicleId = nativeHook.callNative("GetPlayerVehicleID", "i", playerId)

        if (vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }

    getPlayerCameraMode = (playerId: number) => {
        if (!this.isPlayerConnected(playerId)) {
            return CAMERA_MODES["follow-ped"]
        }

        return nativeHook.callNative("GetPlayerCameraMode", "i", playerId) as EnumValue<typeof CAMERA_MODES>
    }

    setPlayerCameraPos = (playerId: number, position: Position3): number => {
        return nativeHook.callNative("SetPlayerCameraPos", "ifff", playerId, position.x, position.y, position.z)
    }

    setPlayerCameraLookAt = (playerId: number, position: Position3, cut: EnumValue<typeof CAMERA_CUT_STYLES>): number => {
        return nativeHook.callNative("SetPlayerCameraLookAt", "ifffi", playerId, position.x, position.y, position.z, cut)
    }

    setCameraBehindPlayer = (playerId: number): number => {
        return nativeHook.callNative("SetCameraBehindPlayer", "i", playerId)
    }

    getPlayerCameraPos = (playerId: number) => {
        const pos = nativeHook.callNative("GetPlayerCameraPos", "iFFF", playerId) as number[]
        return { x: pos[0], y: pos[1], z: pos[2] }
    }

    getPlayerState(playerId: number): EnumValue<typeof PLAYER_STATES> {
        return nativeHook.callNative("GetPlayerState", "i", playerId) as EnumValue<typeof PLAYER_STATES>
    }

    setPlayerRotation(playerId: number, rotation: number) {
        return nativeHook.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1
    }

    getPlayerRotation(playerId: number): number {
        if (!this.isPlayerConnected(playerId)) {
            return 0
        }
        return nativeHook.callNative("GetPlayerFacingAngle", "iF", playerId)
    }

    setVehicleZAngle = (vehicleId: number, angle: number) => {
        return nativeHook.callNative("SetVehicleZAngle", "if", vehicleId, angle) === 1
    }

    getVehicleZAngle = (vehicleId: number): number => {
        if (!this.isValidVehicle(vehicleId)) {
            return 0
        }
        return nativeHook.callNative("GetVehicleZAngle", "iF", vehicleId)
    }

    setVehicleVirtualWorld = (vehicleId: number, worldId: number) => {
        return nativeHook.callNative("SetVehicleVirtualWorld", "ii", vehicleId, worldId) === 1
    }

    getVehicleVirtualWorld = (vehicleId: number): number => {
        if (!this.isValidVehicle(vehicleId)) {
            return 0
        }
        return nativeHook.callNative("GetVehicleVirtualWorld", "i", vehicleId)
    }

    linkVehicleToInterior = (vehicleId: number, interiorId: number): boolean => {
        return nativeHook.callNative("LinkVehicleToInterior", "ii", vehicleId, interiorId) === 1
    }

    getVehicleInterior = (vehicleId: number): number => {
        return nativeHook.callNative("GetVehicleInterior", "i", vehicleId) as number
    }

    getVehicleDriver = (vehicleId: number): number => {
        return nativeHook.callNative("GetVehicleDriver", "i", vehicleId) as number
    }

    getVehicleDistanceFromPoint = (vehicleId: number, x: number, y: number, z: number): number => {
        if (!this.isValidVehicle(vehicleId)) {
            return Number.POSITIVE_INFINITY
        }
        return nativeHook.callNativeFloat("GetVehicleDistanceFromPoint", "ifff", vehicleId, x, y, z)
    }

    getPlayerDistanceFromPoint = (playerId: number, x: number, y: number, z: number): number => {
        if (!this.isPlayerConnected(playerId)) {
            return Number.POSITIVE_INFINITY
        }
        return nativeHook.callNativeFloat("GetPlayerDistanceFromPoint", "ifff", playerId, x, y, z)
    }

    sendClientMessageToAll(color: string, message: string): void {
        if (message.length > 90) {
            const firstPart = charset.encode(`${message.slice(0, 90)} ...`)
            const secondPart = charset.encode(`... ${message.slice(90)}`)

            nativeHook.callNative("SendClientMessageToAll", `i${firstPart.flag}`, hexToRgbaInt(color), firstPart.encoded)
            nativeHook.callNative("SendClientMessageToAll", `i${secondPart.flag}`, hexToRgbaInt(color), secondPart.encoded)
        } else {
            const { flag, encoded } = charset.encode(message)

            nativeHook.callNative("SendClientMessageToAll", `i${flag}`, hexToRgbaInt(color), encoded)
        }
    }

    setPlayerChatBubble = (playerId: number, text: string, color: string, drawdistance: number, expiretime: number): boolean => {
        const { flag, encoded } = charset.encode(text)

        return (
            nativeHook.callNative(
                "SetPlayerChatBubble",
                `i${flag}ifi`,
                playerId,
                encoded,
                hexToRgbaInt(color),
                drawdistance,
                expiretime,
            ) === 1
        )
    }

    getVehicleModel(vehicleId: number): number | undefined {
        const modelId = nativeHook.callNative("GetVehicleModel", "i", vehicleId)
        if (modelId === 0) {
            return undefined
        }
        return modelId
    }

    getVehicleHealth(vehicleId: number): number {
        if (!this.isValidVehicle(vehicleId)) {
            return 1000
        }
        return nativeHook.callNative("GetVehicleHealth", "iF", vehicleId)
    }

    setVehicleHealth(vehicleId: number, health: number): boolean {
        return nativeHook.callNative("SetVehicleHealth", "if", vehicleId, health) === 1
    }

    isValidVehicle(vehicleId: number): boolean {
        return nativeHook.callNative("IsValidVehicle", "i", vehicleId) === 1
    }

    showNameTags = (show: number): number => {
        return nativeHook.callNative("ShowNameTags", "i", show)
    }

    textDrawCreate = (x: number, y: number, text: string): number => {
        const { flag, encoded } = charset.encode(charset.convertSpecialCharacters(text))

        return nativeHook.callNative("TextDrawCreate", `ff${flag}`, x, y, encoded) as number
    }

    textDrawDestroy = (text: number): number => {
        return nativeHook.callNative("TextDrawDestroy", "i", text)
    }

    textDrawShowForPlayer = (playerId: number, text: number): number => {
        return nativeHook.callNative("TextDrawShowForPlayer", "ii", playerId, text)
    }

    textDrawHideForPlayer = (playerId: number, text: number): number => {
        return nativeHook.callNative("TextDrawHideForPlayer", "ii", playerId, text)
    }

    textDrawShowForAll = (text: number): number => {
        return nativeHook.callNative("TextDrawShowForAll", "i", text)
    }

    textDrawHideForAll = (text: number): number => {
        return nativeHook.callNative("TextDrawHideForAll", "i", text)
    }

    selectTextDraw = (playerId: number, hovercolor: string): number => {
        return nativeHook.callNative("SelectTextDraw", "ii", playerId, hexToRgbaInt(hovercolor))
    }

    cancelSelectTextDraw = (playerId: number): number => {
        return nativeHook.callNative("CancelSelectTextDraw", "i", playerId)
    }

    textDrawLetterSize = (text: number, x: number, y: number): number => {
        return nativeHook.callNative("TextDrawLetterSize", "iff", text, x, y)
    }

    textDrawTextSize = (text: number, x: number, y: number): number => {
        return nativeHook.callNative("TextDrawTextSize", "iff", text, x, y)
    }

    textDrawAlignment = (text: number, alignment: number): number => {
        return nativeHook.callNative("TextDrawAlignment", "ii", text, alignment)
    }

    textDrawColor = (text: number, color: string): number => {
        return nativeHook.callNative("TextDrawColor", "ii", text, hexToRgbaInt(color))
    }

    textDrawUseBox = (text: number, use: number): number => {
        return nativeHook.callNative("TextDrawUseBox", "ii", text, use)
    }

    textDrawBoxColor = (text: number, color: string): number => {
        return nativeHook.callNative("TextDrawBoxColor", "ii", text, hexToRgbaInt(color))
    }

    textDrawSetShadow = (text: number, size: number): number => {
        return nativeHook.callNative("TextDrawSetShadow", "ii", text, size)
    }

    textDrawSetOutline = (text: number, size: number): number => {
        return nativeHook.callNative("TextDrawSetOutline", "ii", text, size)
    }

    textDrawBackgroundColor = (text: number, color: string): number => {
        return nativeHook.callNative("TextDrawBackgroundColor", "ii", text, hexToRgbaInt(color))
    }

    textDrawFont = (text: number, font: number): number => {
        return nativeHook.callNative("TextDrawFont", "ii", text, font)
    }

    textDrawSetProportional = (text: number, set: number): number => {
        return nativeHook.callNative("TextDrawSetProportional", "ii", text, set)
    }

    textDrawSetSelectable = (text: number, set: number): number => {
        return nativeHook.callNative("TextDrawSetSelectable", "ii", text, set)
    }

    textDrawSetString = (text: number, string: string): void => {
        const { flag, encoded } = charset.encode(charset.convertSpecialCharacters(string))

        nativeHook.callNative("TextDrawSetString", `i${flag}`, text, encoded)
    }

    textDrawSetPreviewModel = (text: number, modelindex: number): number => {
        return nativeHook.callNative("TextDrawSetPreviewModel", "ii", text, modelindex)
    }

    textDrawSetPreviewRot = (text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number => {
        return nativeHook.callNative("TextDrawSetPreviewRot", "iffff", text, fRotX, fRotY, fRotZ, fZoom)
    }

    textDrawSetPreviewVehCol = (text: number, color1: number, color2: number): number => {
        return nativeHook.callNative("TextDrawSetPreviewVehCol", "iii", text, color1, color2)
    }

    textDrawSetPos(textId: number, x: number, y: number) {
        nativeHook.callNative("TextDrawSetPos", "iff", textId, x, y)
    }

    createPlayerTextDraw = (playerId: number, x: number, y: number, text: string): number => {
        const { flag, encoded } = charset.encode(text)

        return nativeHook.callNative("CreatePlayerTextDraw", `iff${flag}`, playerId, x, y, encoded) as number
    }

    playerTextDrawDestroy = (playerId: number, text: number): void => {
        nativeHook.callNative("PlayerTextDrawDestroy", "ii", playerId, text)
    }

    playerTextDrawLetterSize = (playerId: number, text: number, x: number, y: number): number => {
        return nativeHook.callNative("PlayerTextDrawLetterSize", "iiff", playerId, text, x, y)
    }

    playerTextDrawTextSize = (playerId: number, text: number, x: number, y: number): number => {
        return nativeHook.callNative("PlayerTextDrawTextSize", "iiff", playerId, text, x, y)
    }

    playerTextDrawAlignment = (playerId: number, text: number, alignment: EnumValue<typeof TEXT_DRAW_ALIGNMENTS>): number => {
        return nativeHook.callNative("PlayerTextDrawAlignment", "iii", playerId, text, alignment)
    }

    playerTextDrawColor = (playerId: number, text: number, color: string): number => {
        return nativeHook.callNative("PlayerTextDrawColor", "iii", playerId, text, hexToRgbaInt(color))
    }

    playerTextDrawUseBox = (playerId: number, text: number, use: 0 | 1): number => {
        return nativeHook.callNative("PlayerTextDrawUseBox", "iii", playerId, text, use)
    }

    playerTextDrawBoxColor = (playerId: number, text: number, color: string): number => {
        return nativeHook.callNative("PlayerTextDrawBoxColor", "iii", playerId, text, hexToRgbaInt(color))
    }

    playerTextDrawSetShadow = (playerId: number, text: number, size: number): number => {
        return nativeHook.callNative("PlayerTextDrawSetShadow", "iii", playerId, text, size)
    }

    playerTextDrawSetOutline = (playerId: number, text: number, size: number): number => {
        return nativeHook.callNative("PlayerTextDrawSetOutline", "iii", playerId, text, size)
    }

    playerTextDrawBackgroundColor = (playerId: number, text: number, color: string): number => {
        return nativeHook.callNative("PlayerTextDrawBackgroundColor", "iii", playerId, text, hexToRgbaInt(color))
    }

    playerTextDrawFont = (playerId: number, text: number, font: EnumValue<typeof TEXT_DRAW_FONTS>): number => {
        return nativeHook.callNative("PlayerTextDrawFont", "iii", playerId, text, font)
    }

    playerTextDrawSetProportional = (playerId: number, text: number, set: 1 | 0): number => {
        return nativeHook.callNative("PlayerTextDrawSetProportional", "iii", playerId, text, set)
    }

    playerTextDrawSetSelectable = (playerId: number, text: number, set: 1 | 0): number => {
        return nativeHook.callNative("PlayerTextDrawSetSelectable", "iii", playerId, text, set)
    }

    playerTextDrawShow = (playerId: number, text: number): number => {
        return nativeHook.callNative("PlayerTextDrawShow", "ii", playerId, text)
    }

    playerTextDrawHide = (playerId: number, text: number): number => {
        return nativeHook.callNative("PlayerTextDrawHide", "ii", playerId, text)
    }

    playerTextDrawSetString = (playerId: number, text: number, string: string): void => {
        const { flag, encoded } = charset.encode(string)

        nativeHook.callNative("PlayerTextDrawSetString", `ii${flag}`, playerId, text, encoded)
    }

    playerTextDrawSetPreviewModel = (playerId: number, text: number, modelindex: number): number => {
        return nativeHook.callNative("PlayerTextDrawSetPreviewModel", "iii", playerId, text, modelindex)
    }

    playerTextDrawSetPreviewRot = (playerId: number, text: number, fRotX: number, fRotY: number, fRotZ: number, fZoom: number): number => {
        return nativeHook.callNative("PlayerTextDrawSetPreviewRot", "iiffff", playerId, text, fRotX, fRotY, fRotZ, fZoom)
    }

    playerTextDrawSetPreviewVehCol = (playerId: number, text: number, color1: number, color2: number): number => {
        return nativeHook.callNative("PlayerTextDrawSetPreviewVehCol", "iiii", playerId, text, color1, color2)
    }

    playerTextDrawSetPos = (playerId: number, textId: number, x: number, y: number) => {
        nativeHook.callNative("PlayerTextDrawSetPos", "iiff", playerId, textId, x, y)
    }

    blockIpAddress(ipAddress: string, ms: number): void {
        nativeHook.callNative("BlockIpAddress", "si", ipAddress, ms)
    }

    unblockIpAddress(ipAddress: string): void {
        nativeHook.callNative("UnBlockIpAddress", "s", ipAddress)
    }
}

export const gameNatives = new GameNatives()
