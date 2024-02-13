export class SampEvents {
    static onPlayerConnect(callback: (playerid: number) => void) {
        samp.on("OnPlayerConnect", callback)
    }

    static onPlayerDisconnect(callback: (playerid: number, reason: number) => void) {
        samp.on("OnPlayerDisconnect", callback)
    }

    static onPlayerSpawn(callback: (playerid: number) => void) {
        samp.on("OnPlayerSpawn", callback)
    }

    static onPlayerDeath(callback: (playerid: number, killerid: number, reason: number) => void) {
        samp.on("OnPlayerDeath", callback)
    }

    static onPlayerText(callback: (playerid: number, text: string) => void) {
        samp.on("OnPlayerText", callback)
    }

    static onPlayerCommandText(callback: (playerid: number, cmdtext: string) => void) {
        samp.on("OnPlayerCommandText", callback)
    }

    static onPlayerRequestClass(callback: (playerid: number, classid: number) => void) {
        samp.on("OnPlayerRequestClass", callback)
    }

    static onPlayerEnterVehicle(callback: (playerid: number, vehicleid: number, ispassenger: boolean) => void) {
        samp.on("OnPlayerEnterVehicle", callback)
    }

    static onPlayerExitVehicle(callback: (playerid: number, vehicleid: number) => void) {
        samp.on("OnPlayerExitVehicle", callback)
    }

    static onPlayerStateChange(callback: (playerid: number, newstate: number, oldstate: number) => void) {
        samp.on("OnPlayerStateChange", callback)
    }

    static onPlayerTakeDamage(callback: (playerid: number, issuerid: number, amount: number, weaponid: number, bodypart: number) => void) {
        samp.on("OnPlayerTakeDamage", callback)
    }

    static onPlayerWeaponShot(
        callback: (playerid: number, weaponid: number, hittype: number, hitid: number, x: number, y: number, z: number) => void,
    ) {
        samp.on("OnPlayerWeaponShot", callback)
    }

    static onDialogResponse(
        callback: (playerid: number, dialogId: number, response: boolean, listitem: number, inputText: string) => void,
    ) {
        samp.on("OnDialogResponse", callback)
    }

    static onGameModeExit(callback: () => void) {
        samp.on("OnGameModeExit", callback)
    }

    static onGameModeInit(callback: () => void) {
        samp.on("OnGameModeInit", callback)
    }
}
