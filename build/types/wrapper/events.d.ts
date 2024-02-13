export declare class SampEvents {
    static onPlayerConnect(callback: (playerid: number) => void): void;
    static onPlayerDisconnect(callback: (playerid: number, reason: number) => void): void;
    static onPlayerSpawn(callback: (playerid: number) => void): void;
    static onPlayerDeath(callback: (playerid: number, killerid: number, reason: number) => void): void;
    static onPlayerText(callback: (playerid: number, text: string) => void): void;
    static onPlayerCommandText(callback: (playerid: number, cmdtext: string) => void): void;
    static onPlayerRequestClass(callback: (playerid: number, classid: number) => void): void;
    static onPlayerEnterVehicle(callback: (playerid: number, vehicleid: number, ispassenger: boolean) => void): void;
    static onPlayerExitVehicle(callback: (playerid: number, vehicleid: number) => void): void;
    static onPlayerStateChange(callback: (playerid: number, newstate: number, oldstate: number) => void): void;
    static onPlayerTakeDamage(callback: (playerid: number, issuerid: number, amount: number, weaponid: number, bodypart: number) => void): void;
    static onPlayerWeaponShot(callback: (playerid: number, weaponid: number, hittype: number, hitid: number, x: number, y: number, z: number) => void): void;
    static onDialogResponse(callback: (playerid: number, dialogId: number, response: boolean, listitem: number, inputText: string) => void): void;
    static onGameModeExit(callback: () => void): void;
    static onGameModeInit(callback: () => void): void;
}
