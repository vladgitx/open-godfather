import {
    WeaponEnum,
    PlayerStateEnum,
    DialogStyleEnum,
    WeaponSkillEnum,
} from "."

declare class samp {
    static on(eventName: string, func: Function): any
    static callNative(nativeName: string, paramTypes: string, ...args: any[]): any
    static callNativeFloat(nativeName: string, paramTypes: string, ...args: any[]): number
}

export class SampNode {
    static on(eventName: string, func: Function) {
        samp.on(eventName, func)
    }
    
    static callNative(nativeName: string, paramTypes: string, ...args: any[]) {
        return samp.callNative(nativeName, paramTypes, ...args)
    }
    
    static callNativeFloat(nativeName: string, paramTypes: string, ...args: any[]) {
        return samp.callNativeFloat(nativeName, paramTypes, ...args)
    }
}

export class Natives {
    static setPlayerSkillLevel = (playerId: number, skillType: WeaponSkillEnum, level: number): boolean => {
        return samp.callNative('SetPlayerSkillLevel', 'iii', playerId, skillType, level) === 1
    }

    static setPlayerColor = (playerId: number, color: number): void => {
        samp.callNative('SetPlayerColor', 'ii', playerId, color)
    }

    static setWeather = (weatherId: number): void => {
        samp.callNative('SetWeather', 'i', weatherId);
    }

    static setWorldTime = (hour: number): void => {
        samp.callNative('SetWorldTime', 'i', hour);
    }

    static setNameTagDrawDistance = (distance: number): void => {
        samp.callNative('SetNameTagDrawDistance', 'f', distance);
    }

    static enableStuntBonusForAll = (enable: boolean): void => {
        samp.callNative('EnableStuntBonusForAll', 'i', enable === true ? 1 : 0);
    }

    static sendRconCommand = (command: string): void => {
        samp.callNative('SendRconCommand', 's', command)
    }

    static changeVehicleColor = (vehicleId: number, color1: number, color2: number): boolean => {
        return samp.callNative('ChangeVehicleColor', 'iii', vehicleId, color1, color2) === 1
    }

    static destroyVehicle = (vehicleId: number): boolean => {
        return samp.callNative('DestroyVehicle', 'i', vehicleId) === 1
    }

    static createVehicle = (modelId: number, position: { x: number, y: number, z: number }, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false): number | undefined => {
        const vehicleId = samp.callNative('CreateVehicle', 'iffffiiii', modelId, position.x, position.y, position.z, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
        if (vehicleId === 65535 || vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }

    static showPlayerDialog = (playerId: number, dialogId: number, styleId: DialogStyleEnum, caption: string, info: string, button1: string, button2: string): boolean => {
        return samp.callNative('ShowPlayerDialog', 'iiissss', playerId, dialogId, styleId, caption, info, button1, button2) === 1
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
    
    static setSpawnInfo(playerId: number, teamId: number, skinId: number, position: { x: number, y: number, z: number }, rotation: number, weapons: { weapon: WeaponEnum, ammo: number }[] = []): void {
        const weapon1 = weapons[0] ? weapons[0].weapon : WeaponEnum.FIST
        const weapon1ammo = weapons[0] ? weapons[0].ammo : 0
        const weapon2 = weapons[1] ? weapons[1].weapon : WeaponEnum.FIST
        const weapon2ammo = weapons[1] ? weapons[1].ammo : 0
        const weapon3 = weapons[2] ? weapons[2].weapon : WeaponEnum.FIST
        const weapon3ammo = weapons[2] ? weapons[2].ammo : 0
        samp.callNative("SetSpawnInfo", "iiiffffiiiiii", playerId, teamId, skinId, position.x, position.y, position.z, rotation, weapon1, weapon1ammo, weapon2, weapon2ammo, weapon3, weapon3ammo)
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
    
    static sendClientMessage(playerId: number, color: number, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessage", "iis", playerId, color, `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessage", "iis", playerId, color, `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessage", "iis", playerId, color, message)
        }
    }
    
    static getPlayerName(playerId: number): string {
        if (!Natives.isPlayerConnected(playerId)) {
            return "invalid_name"
        }
        return samp.callNative("GetPlayerName", "iSi", playerId, 24)
    }
    
    static isPlayerConnected(playerId: number): boolean {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1
    }
    
    static getPlayerPosition(playerId: number): { x: number, y: number, z: number } {
        if (!Natives.isPlayerConnected(playerId)) {
            return {
                x: 0,
                y: 0,
                z: 3,
            }
        }
        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId)
        return {
            x: pos[0],
            y: pos[1],
            z: pos[2],
        }
    }
    
    static setPlayerPosition(playerId: number, x: number, y: number, z: number): boolean {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1
    }
    
    static setPlayerHealth(playerId: number, health: number): boolean {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1
    }
    
    static getPlayerHealth(playerId: number): number {
        if (!Natives.isPlayerConnected(playerId)) {
            return 100
        }
        return samp.callNative("GetPlayerHealth", "iF", playerId)
    }
    
    static setPlayerArmour(playerId: number, armour: number): boolean {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1
    }
    
    static getPlayerArmour(playerId: number): number {
        if (!Natives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerArmour", "iF", playerId)
    }
    
    static putPlayerInVehicle(playerId: number, vehicleId: number, seatId: number = 0): boolean {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seatId) === 1
    }
    
    static getPlayerVehicleId(playerId: number): number | undefined {
        const vehicleId = samp.callNative("GetPlayerVehicleID", "i", playerId)
    
        if (vehicleId === 0) {
            return undefined
        }
        return vehicleId
    }
    
    static getPlayerState(playerId: number): PlayerStateEnum | undefined {
        if (!Natives.isPlayerConnected(playerId)) {
            return undefined
        }
        return samp.callNative("GetPlayerState", "i", playerId)
    }
    
    static setPlayerRotation(playerId: number, rotation: number) {
        return samp.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1
    }
    
    static getPlayerRotation(playerId: number): number {
        if (!Natives.isPlayerConnected(playerId)) {
            return 0
        }
        return samp.callNative("GetPlayerFacingAngle", "iF", playerId)
    }
    
    static getPlayerDistanceFromPoint = (playerId: number, x: number, y: number, z: number): number => {
        if (!Natives.isPlayerConnected(playerId)) {
            return Number.POSITIVE_INFINITY
        }
        return samp.callNativeFloat('GetPlayerDistanceFromPoint', 'ifff', playerId, x, y, z)
    }
    
    static sendClientMessageToAll(color: number, message: string): void {
        if (message.length > 90) {
            samp.callNative("SendClientMessageToAll", "is", color, `${message.slice(0, 90)} ...`)
            samp.callNative("SendClientMessageToAll", "is", color, `... ${message.slice(90)}`)
        } else {
            samp.callNative("SendClientMessageToAll", "is", color, message)
        }
    }
    
    static setPlayerChatBubble = (playerId: number, text: string, color: number, drawdistance: number, expiretime: number): boolean => {
        return samp.callNative('SetPlayerChatBubble', 'isifi', playerId, text, color, drawdistance, expiretime) === 1
    }
    
    static getVehicleModel(vehicleId: number): number | undefined {
        const modelId = samp.callNative("GetVehicleModel", "i", vehicleId)
        if (modelId === 0) {
            return undefined
        }
        return modelId
    }
    
    static getVehicleHealth(vehicleId: number): number {
        if (!Natives.isValidVehicle(vehicleId)) {
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