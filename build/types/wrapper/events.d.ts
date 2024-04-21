declare class NativeEvents {
    onPlayerConnect(callback: (playerid: number) => void): void;
    onPlayerDisconnect(callback: (playerid: number, reason: number) => void): void;
    onPlayerSpawn(callback: (playerid: number) => void): void;
    onPlayerDeath(callback: (playerid: number, killerid: number, reason: number) => void): void;
    onPlayerText(callback: (playerid: number, text: string) => void): void;
    onPlayerCommandText(callback: (playerid: number, cmdtext: string) => void): void;
    onPlayerRequestClass(callback: (playerid: number, classid: number) => void): void;
    onPlayerEnterVehicle(callback: (playerid: number, vehicleid: number, ispassenger: boolean) => void): void;
    onPlayerExitVehicle(callback: (playerid: number, vehicleid: number) => void): void;
    onPlayerStateChange(callback: (playerid: number, newstate: number, oldstate: number) => void): void;
    onPlayerTakeDamage(callback: (playerid: number, issuerid: number, amount: number, weaponid: number, bodypart: number) => void): void;
    onPlayerWeaponShot(callback: (playerid: number, weaponid: number, hittype: number, hitid: number, x: number, y: number, z: number) => void): void;
    onDialogResponse(callback: (playerid: number, dialogId: number, response: boolean, listitem: number, inputText: string) => void): void;
    onGameModeExit(callback: () => void): void;
    onGameModeInit(callback: () => void): void;
}
export declare const nativeEvents: NativeEvents;
export {};
