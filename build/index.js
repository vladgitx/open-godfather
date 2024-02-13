'use strict';

var stream = require('stream');

class EventBus extends stream.EventEmitter {
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    addListener(event, listener) {
        return super.addListener(event, listener);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    prependListener(event, listener) {
        return super.prependListener(event, listener);
    }
    prependOnceListener(event, listener) {
        return super.prependOnceListener(event, listener);
    }
    removeListener(event, listener) {
        return super.removeListener(event, listener);
    }
    off(event, listener) {
        return super.off(event, listener);
    }
    removeAllListeners(event) {
        return super.removeAllListeners(event);
    }
    listeners(event) {
        return super.listeners(event);
    }
    rawListeners(event) {
        return super.rawListeners(event);
    }
    eventNames() {
        return super.eventNames();
    }
    listenerCount(event) {
        return super.listenerCount(event);
    }
    getMaxListeners() {
        return super.getMaxListeners();
    }
    setMaxListeners(n) {
        return super.setMaxListeners(n);
    }
}

const eventsMp = new EventBus();

samp.on("OnGameModeInit", () => {
    eventsMp.emit("init");
});

samp.on("OnGameModeExit", () => {
    eventsMp.emit("exit");
});

exports.WeaponsEnum = void 0;
(function (WeaponsEnum) {
    WeaponsEnum[WeaponsEnum["Fist"] = 0] = "Fist";
    WeaponsEnum[WeaponsEnum["BrassKnuckles"] = 1] = "BrassKnuckles";
    WeaponsEnum[WeaponsEnum["GolfClub"] = 2] = "GolfClub";
    WeaponsEnum[WeaponsEnum["Nightstick"] = 3] = "Nightstick";
    WeaponsEnum[WeaponsEnum["Knife"] = 4] = "Knife";
    WeaponsEnum[WeaponsEnum["BaseballBat"] = 5] = "BaseballBat";
    WeaponsEnum[WeaponsEnum["Shovel"] = 6] = "Shovel";
    WeaponsEnum[WeaponsEnum["PoolCue"] = 7] = "PoolCue";
    WeaponsEnum[WeaponsEnum["Katana"] = 8] = "Katana";
    WeaponsEnum[WeaponsEnum["Chainsaw"] = 9] = "Chainsaw";
    WeaponsEnum[WeaponsEnum["PurpleDildo"] = 10] = "PurpleDildo";
    WeaponsEnum[WeaponsEnum["Dildo"] = 11] = "Dildo";
    WeaponsEnum[WeaponsEnum["Vibrator"] = 12] = "Vibrator";
    WeaponsEnum[WeaponsEnum["SilverVibrator"] = 13] = "SilverVibrator";
    WeaponsEnum[WeaponsEnum["Flower"] = 14] = "Flower";
    WeaponsEnum[WeaponsEnum["Cane"] = 15] = "Cane";
    WeaponsEnum[WeaponsEnum["Grenade"] = 16] = "Grenade";
    WeaponsEnum[WeaponsEnum["TearGas"] = 17] = "TearGas";
    WeaponsEnum[WeaponsEnum["MolotovCocktail"] = 18] = "MolotovCocktail";
    WeaponsEnum[WeaponsEnum["Colt45"] = 22] = "Colt45";
    WeaponsEnum[WeaponsEnum["SilencedColt45"] = 23] = "SilencedColt45";
    WeaponsEnum[WeaponsEnum["DesertEagle"] = 24] = "DesertEagle";
    WeaponsEnum[WeaponsEnum["Shotgun"] = 25] = "Shotgun";
    WeaponsEnum[WeaponsEnum["SawnoffShotgun"] = 26] = "SawnoffShotgun";
    WeaponsEnum[WeaponsEnum["CombatShotgun"] = 27] = "CombatShotgun";
    WeaponsEnum[WeaponsEnum["Uzi"] = 28] = "Uzi";
    WeaponsEnum[WeaponsEnum["MP5"] = 29] = "MP5";
    WeaponsEnum[WeaponsEnum["AK47"] = 30] = "AK47";
    WeaponsEnum[WeaponsEnum["M4"] = 31] = "M4";
    WeaponsEnum[WeaponsEnum["Tec9"] = 32] = "Tec9";
    WeaponsEnum[WeaponsEnum["CountryRifle"] = 33] = "CountryRifle";
    WeaponsEnum[WeaponsEnum["Sniper"] = 34] = "Sniper";
    WeaponsEnum[WeaponsEnum["RocketLauncher"] = 35] = "RocketLauncher";
    WeaponsEnum[WeaponsEnum["HeatSeeker"] = 36] = "HeatSeeker";
    WeaponsEnum[WeaponsEnum["Flamethrower"] = 37] = "Flamethrower";
    WeaponsEnum[WeaponsEnum["Minigun"] = 38] = "Minigun";
    WeaponsEnum[WeaponsEnum["Satchel"] = 39] = "Satchel";
    WeaponsEnum[WeaponsEnum["Detonator"] = 40] = "Detonator";
    WeaponsEnum[WeaponsEnum["SprayCan"] = 41] = "SprayCan";
    WeaponsEnum[WeaponsEnum["FireExtinguisher"] = 42] = "FireExtinguisher";
    WeaponsEnum[WeaponsEnum["Camera"] = 43] = "Camera";
    WeaponsEnum[WeaponsEnum["NightVisionGoggles"] = 44] = "NightVisionGoggles";
    WeaponsEnum[WeaponsEnum["ThermalGoggles"] = 45] = "ThermalGoggles";
    WeaponsEnum[WeaponsEnum["Parachute"] = 46] = "Parachute";
    WeaponsEnum[WeaponsEnum["Vehicle"] = 49] = "Vehicle";
    WeaponsEnum[WeaponsEnum["HelicopterBlades"] = 50] = "HelicopterBlades";
    WeaponsEnum[WeaponsEnum["Explosion"] = 51] = "Explosion";
    WeaponsEnum[WeaponsEnum["Drown"] = 53] = "Drown";
    WeaponsEnum[WeaponsEnum["Collision"] = 54] = "Collision";
})(exports.WeaponsEnum || (exports.WeaponsEnum = {}));
exports.DialogStylesEnum = void 0;
(function (DialogStylesEnum) {
    DialogStylesEnum[DialogStylesEnum["MessageBox"] = 0] = "MessageBox";
    DialogStylesEnum[DialogStylesEnum["Input"] = 1] = "Input";
    DialogStylesEnum[DialogStylesEnum["List"] = 2] = "List";
    DialogStylesEnum[DialogStylesEnum["Password"] = 3] = "Password";
    DialogStylesEnum[DialogStylesEnum["Tablist"] = 4] = "Tablist";
    DialogStylesEnum[DialogStylesEnum["TablistHeaders"] = 5] = "TablistHeaders";
})(exports.DialogStylesEnum || (exports.DialogStylesEnum = {}));
exports.BodyPartsEnum = void 0;
(function (BodyPartsEnum) {
    BodyPartsEnum[BodyPartsEnum["Torso"] = 3] = "Torso";
    BodyPartsEnum[BodyPartsEnum["Groin"] = 4] = "Groin";
    BodyPartsEnum[BodyPartsEnum["LeftArm"] = 5] = "LeftArm";
    BodyPartsEnum[BodyPartsEnum["RightArm"] = 6] = "RightArm";
    BodyPartsEnum[BodyPartsEnum["LeftLeg"] = 7] = "LeftLeg";
    BodyPartsEnum[BodyPartsEnum["RightLeg"] = 8] = "RightLeg";
    BodyPartsEnum[BodyPartsEnum["Head"] = 9] = "Head";
})(exports.BodyPartsEnum || (exports.BodyPartsEnum = {}));
exports.PlayerStatesEnum = void 0;
(function (PlayerStatesEnum) {
    PlayerStatesEnum[PlayerStatesEnum["None"] = 0] = "None";
    PlayerStatesEnum[PlayerStatesEnum["OnFoot"] = 1] = "OnFoot";
    PlayerStatesEnum[PlayerStatesEnum["Driver"] = 2] = "Driver";
    PlayerStatesEnum[PlayerStatesEnum["Passenger"] = 3] = "Passenger";
    PlayerStatesEnum[PlayerStatesEnum["ExitVehicle"] = 4] = "ExitVehicle";
    PlayerStatesEnum[PlayerStatesEnum["EnterVehicleDriver"] = 5] = "EnterVehicleDriver";
    PlayerStatesEnum[PlayerStatesEnum["EnterVehiclePassenger"] = 6] = "EnterVehiclePassenger";
    PlayerStatesEnum[PlayerStatesEnum["Wasted"] = 7] = "Wasted";
    PlayerStatesEnum[PlayerStatesEnum["Spawned"] = 8] = "Spawned";
    PlayerStatesEnum[PlayerStatesEnum["Spectating"] = 9] = "Spectating";
})(exports.PlayerStatesEnum || (exports.PlayerStatesEnum = {}));
exports.PlayerBonesEnum = void 0;
(function (PlayerBonesEnum) {
    PlayerBonesEnum[PlayerBonesEnum["Spine"] = 1] = "Spine";
    PlayerBonesEnum[PlayerBonesEnum["Head"] = 2] = "Head";
    PlayerBonesEnum[PlayerBonesEnum["LeftUpperArm"] = 3] = "LeftUpperArm";
    PlayerBonesEnum[PlayerBonesEnum["RightUpperArm"] = 4] = "RightUpperArm";
    PlayerBonesEnum[PlayerBonesEnum["LeftHand"] = 5] = "LeftHand";
    PlayerBonesEnum[PlayerBonesEnum["RightHand"] = 6] = "RightHand";
    PlayerBonesEnum[PlayerBonesEnum["LeftThigh"] = 7] = "LeftThigh";
    PlayerBonesEnum[PlayerBonesEnum["RightThigh"] = 8] = "RightThigh";
    PlayerBonesEnum[PlayerBonesEnum["LeftFoot"] = 9] = "LeftFoot";
    PlayerBonesEnum[PlayerBonesEnum["RightFoot"] = 10] = "RightFoot";
    PlayerBonesEnum[PlayerBonesEnum["RightCalf"] = 11] = "RightCalf";
    PlayerBonesEnum[PlayerBonesEnum["LeftCalf"] = 12] = "LeftCalf";
    PlayerBonesEnum[PlayerBonesEnum["LeftForearm"] = 13] = "LeftForearm";
    PlayerBonesEnum[PlayerBonesEnum["RightForearm"] = 14] = "RightForearm";
    PlayerBonesEnum[PlayerBonesEnum["LeftClavicle"] = 15] = "LeftClavicle";
    PlayerBonesEnum[PlayerBonesEnum["RightClavicle"] = 16] = "RightClavicle";
    PlayerBonesEnum[PlayerBonesEnum["Neck"] = 17] = "Neck";
    PlayerBonesEnum[PlayerBonesEnum["Jaw"] = 18] = "Jaw";
})(exports.PlayerBonesEnum || (exports.PlayerBonesEnum = {}));
exports.KickReasonsEnum = void 0;
(function (KickReasonsEnum) {
    KickReasonsEnum[KickReasonsEnum["Crash"] = 0] = "Crash";
    KickReasonsEnum[KickReasonsEnum["Quit"] = 1] = "Quit";
    KickReasonsEnum[KickReasonsEnum["Kick"] = 2] = "Kick";
    KickReasonsEnum[KickReasonsEnum["Custom"] = 3] = "Custom";
    KickReasonsEnum[KickReasonsEnum["ModeEnd"] = 4] = "ModeEnd";
})(exports.KickReasonsEnum || (exports.KickReasonsEnum = {}));
exports.SpecialActionsEnum = void 0;
(function (SpecialActionsEnum) {
    SpecialActionsEnum[SpecialActionsEnum["None"] = 0] = "None";
    SpecialActionsEnum[SpecialActionsEnum["Duck"] = 1] = "Duck";
    SpecialActionsEnum[SpecialActionsEnum["UseJetpack"] = 2] = "UseJetpack";
    SpecialActionsEnum[SpecialActionsEnum["EnterVehicle"] = 3] = "EnterVehicle";
    SpecialActionsEnum[SpecialActionsEnum["ExitVehicle"] = 4] = "ExitVehicle";
    SpecialActionsEnum[SpecialActionsEnum["Dance1"] = 5] = "Dance1";
    SpecialActionsEnum[SpecialActionsEnum["Dance2"] = 6] = "Dance2";
    SpecialActionsEnum[SpecialActionsEnum["Dance3"] = 7] = "Dance3";
    SpecialActionsEnum[SpecialActionsEnum["Dance4"] = 8] = "Dance4";
    SpecialActionsEnum[SpecialActionsEnum["HandsUp"] = 10] = "HandsUp";
    SpecialActionsEnum[SpecialActionsEnum["UseCellphone"] = 11] = "UseCellphone";
    SpecialActionsEnum[SpecialActionsEnum["Sitting"] = 12] = "Sitting";
    SpecialActionsEnum[SpecialActionsEnum["StopUseCellphone"] = 13] = "StopUseCellphone";
    SpecialActionsEnum[SpecialActionsEnum["DrinkBeer"] = 20] = "DrinkBeer";
    SpecialActionsEnum[SpecialActionsEnum["SmokeCiggy"] = 21] = "SmokeCiggy";
    SpecialActionsEnum[SpecialActionsEnum["DrinkWine"] = 22] = "DrinkWine";
    SpecialActionsEnum[SpecialActionsEnum["DrinkSprunk"] = 23] = "DrinkSprunk";
    SpecialActionsEnum[SpecialActionsEnum["Cuffed"] = 24] = "Cuffed";
    SpecialActionsEnum[SpecialActionsEnum["Carry"] = 25] = "Carry";
    SpecialActionsEnum[SpecialActionsEnum["Pissing"] = 68] = "Pissing";
})(exports.SpecialActionsEnum || (exports.SpecialActionsEnum = {}));
exports.FightStylesEnum = void 0;
(function (FightStylesEnum) {
    FightStylesEnum[FightStylesEnum["Normal"] = 4] = "Normal";
    FightStylesEnum[FightStylesEnum["Boxing"] = 5] = "Boxing";
    FightStylesEnum[FightStylesEnum["KungFu"] = 6] = "KungFu";
    FightStylesEnum[FightStylesEnum["KneeHead"] = 7] = "KneeHead";
    FightStylesEnum[FightStylesEnum["GrabKick"] = 15] = "GrabKick";
    FightStylesEnum[FightStylesEnum["Elbow"] = 16] = "Elbow";
})(exports.FightStylesEnum || (exports.FightStylesEnum = {}));
exports.WeaponSkillsEnum = void 0;
(function (WeaponSkillsEnum) {
    WeaponSkillsEnum[WeaponSkillsEnum["Colt45"] = 0] = "Colt45";
    WeaponSkillsEnum[WeaponSkillsEnum["SilencedColt45"] = 1] = "SilencedColt45";
    WeaponSkillsEnum[WeaponSkillsEnum["DesertEagle"] = 2] = "DesertEagle";
    WeaponSkillsEnum[WeaponSkillsEnum["Shotgun"] = 3] = "Shotgun";
    WeaponSkillsEnum[WeaponSkillsEnum["SawnoffShotgun"] = 4] = "SawnoffShotgun";
    WeaponSkillsEnum[WeaponSkillsEnum["CombatShotgun"] = 5] = "CombatShotgun";
    WeaponSkillsEnum[WeaponSkillsEnum["Uzi"] = 6] = "Uzi";
    WeaponSkillsEnum[WeaponSkillsEnum["MP5"] = 7] = "MP5";
    WeaponSkillsEnum[WeaponSkillsEnum["AK47"] = 8] = "AK47";
    WeaponSkillsEnum[WeaponSkillsEnum["M4"] = 9] = "M4";
    WeaponSkillsEnum[WeaponSkillsEnum["Sniper"] = 10] = "Sniper";
})(exports.WeaponSkillsEnum || (exports.WeaponSkillsEnum = {}));
exports.VehicleSeatsEnum = void 0;
(function (VehicleSeatsEnum) {
    VehicleSeatsEnum[VehicleSeatsEnum["Driver"] = 0] = "Driver";
    VehicleSeatsEnum[VehicleSeatsEnum["Passenger"] = 1] = "Passenger";
    VehicleSeatsEnum[VehicleSeatsEnum["RearLeft"] = 2] = "RearLeft";
    VehicleSeatsEnum[VehicleSeatsEnum["RearRight"] = 3] = "RearRight";
})(exports.VehicleSeatsEnum || (exports.VehicleSeatsEnum = {}));
exports.CameraModesEnum = void 0;
(function (CameraModesEnum) {
    CameraModesEnum[CameraModesEnum["Train"] = 3] = "Train";
    CameraModesEnum[CameraModesEnum["FollowPed"] = 4] = "FollowPed";
    CameraModesEnum[CameraModesEnum["SniperAiming"] = 7] = "SniperAiming";
    CameraModesEnum[CameraModesEnum["RocketLauncherAiming"] = 8] = "RocketLauncherAiming";
    CameraModesEnum[CameraModesEnum["Fixed"] = 15] = "Fixed";
    CameraModesEnum[CameraModesEnum["VehicleFront"] = 16] = "VehicleFront";
    CameraModesEnum[CameraModesEnum["FollowVehicle"] = 18] = "FollowVehicle";
    CameraModesEnum[CameraModesEnum["FollowBoat"] = 22] = "FollowBoat";
    CameraModesEnum[CameraModesEnum["WeaponAiming"] = 46] = "WeaponAiming";
    CameraModesEnum[CameraModesEnum["HeatSeekerAiming"] = 51] = "HeatSeekerAiming";
    CameraModesEnum[CameraModesEnum["OtherWeaponAiming"] = 53] = "OtherWeaponAiming";
    CameraModesEnum[CameraModesEnum["PassengerAiming"] = 55] = "PassengerAiming";
    CameraModesEnum[CameraModesEnum["DwHeliChase"] = 56] = "DwHeliChase";
    CameraModesEnum[CameraModesEnum["DwCamMan"] = 57] = "DwCamMan";
    CameraModesEnum[CameraModesEnum["DwBirdy"] = 58] = "DwBirdy";
    CameraModesEnum[CameraModesEnum["DwPlaneSpotter"] = 59] = "DwPlaneSpotter";
    CameraModesEnum[CameraModesEnum["DwPlaneCam1"] = 62] = "DwPlaneCam1";
    CameraModesEnum[CameraModesEnum["DwPlaneCam2"] = 63] = "DwPlaneCam2";
    CameraModesEnum[CameraModesEnum["DwPlaneCam3"] = 64] = "DwPlaneCam3";
})(exports.CameraModesEnum || (exports.CameraModesEnum = {}));
exports.WeaponSlotsEnum = void 0;
(function (WeaponSlotsEnum) {
    WeaponSlotsEnum[WeaponSlotsEnum["Unarmed"] = 0] = "Unarmed";
    WeaponSlotsEnum[WeaponSlotsEnum["Melee"] = 1] = "Melee";
    WeaponSlotsEnum[WeaponSlotsEnum["Pistol"] = 2] = "Pistol";
    WeaponSlotsEnum[WeaponSlotsEnum["Shotgun"] = 3] = "Shotgun";
    WeaponSlotsEnum[WeaponSlotsEnum["MachineGun"] = 4] = "MachineGun";
    WeaponSlotsEnum[WeaponSlotsEnum["AssaultRifle"] = 5] = "AssaultRifle";
    WeaponSlotsEnum[WeaponSlotsEnum["LongRifle"] = 6] = "LongRifle";
    WeaponSlotsEnum[WeaponSlotsEnum["Artillery"] = 7] = "Artillery";
    WeaponSlotsEnum[WeaponSlotsEnum["Explosives"] = 8] = "Explosives";
    WeaponSlotsEnum[WeaponSlotsEnum["Equipment"] = 9] = "Equipment";
    WeaponSlotsEnum[WeaponSlotsEnum["Gift"] = 10] = "Gift";
    WeaponSlotsEnum[WeaponSlotsEnum["Gadget"] = 11] = "Gadget";
    WeaponSlotsEnum[WeaponSlotsEnum["Detonator"] = 12] = "Detonator";
})(exports.WeaponSlotsEnum || (exports.WeaponSlotsEnum = {}));
exports.HitTypesEnum = void 0;
(function (HitTypesEnum) {
    HitTypesEnum[HitTypesEnum["None"] = 0] = "None";
    HitTypesEnum[HitTypesEnum["Player"] = 1] = "Player";
    HitTypesEnum[HitTypesEnum["Vehicle"] = 2] = "Vehicle";
    HitTypesEnum[HitTypesEnum["Object"] = 3] = "Object";
    HitTypesEnum[HitTypesEnum["PlayerObject"] = 4] = "PlayerObject";
})(exports.HitTypesEnum || (exports.HitTypesEnum = {}));

class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    subtract(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    scale(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    cross(v) {
        return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    normalize() {
        const len = this.length();
        return len > 0 ? this.scale(1 / len) : new Vector3();
    }
    distance(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    inFrontXY(angle, distance, z) {
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const newX = this.x + dx;
        const newY = this.y + dy;
        return new Vector3(newX, newY, z != undefined ? z : this.z);
    }
}

class SampNatives {
    static hidePlayerDialog(playerId) {
        samp.callNative("HidePlayerDialog", "i", playerId);
    }
    static setPlayerName(playerId, name) {
        return samp.callNative("SetPlayerName", "is", playerId, name) === 1;
    }
    static setPlayerInterior(playerId, interior) {
        return samp.callNative("SetPlayerInterior", "ii", playerId, interior) === 1;
    }
    static getPlayerInterior(playerId) {
        return samp.callNative("GetPlayerInterior", "i", playerId);
    }
    static setPlayerVirtualWorld(playerId, world) {
        return samp.callNative("SetPlayerVirtualWorld", "ii", playerId, world) === 1;
    }
    static getPlayerVirtualWorld(playerId) {
        return samp.callNative("GetPlayerVirtualWorld", "i", playerId);
    }
    static setSpawnInfo(playerId, team, skinId, position, rotation, weapons = []) {
        const weapon1 = weapons[0] ? weapons[0].weapon : exports.WeaponsEnum.Fist;
        const weapon1ammo = weapons[0] ? weapons[0].ammo : 0;
        const weapon2 = weapons[1] ? weapons[1].weapon : exports.WeaponsEnum.Fist;
        const weapon2ammo = weapons[1] ? weapons[1].ammo : 0;
        const weapon3 = weapons[2] ? weapons[2].weapon : exports.WeaponsEnum.Fist;
        const weapon3ammo = weapons[2] ? weapons[2].ammo : 0;
        samp.callNative("SetSpawnInfo", "iiiffffiiiiii", playerId, team, skinId, position.x, position.y, position.z, rotation, weapon1, weapon1ammo, weapon2, weapon2ammo, weapon3, weapon3ammo);
    }
    static kick(playerId) {
        samp.callNative("Kick", "i", playerId);
    }
    static spawnPlayer(playerId) {
        return samp.callNative("SpawnPlayer", "i", playerId) === 1;
    }
    static togglePlayerSpectating(playerId, toggle) {
        return samp.callNative("TogglePlayerSpectating", "ii", playerId, toggle === true ? 1 : 0) === 1;
    }
    static sendClientMessage(playerId, color, message) {
        if (message.length > 90) {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`);
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `... ${message.slice(90)}`);
        }
        else {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), message);
        }
    }
    static getPlayerName(playerId) {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return "invalid_name";
        }
        return samp.callNative("GetPlayerName", "iSi", playerId, 24);
    }
    static isPlayerConnected(playerId) {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1;
    }
    static getPlayerPosition(playerId) {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return new Vector3();
        }
        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId);
        return new Vector3(pos[0], pos[1], pos[2]);
    }
    static setPlayerPosition(playerId, x, y, z) {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1;
    }
    static setPlayerHealth(playerId, health) {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1;
    }
    static getPlayerHealth(playerId) {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 100;
        }
        return samp.callNative("GetPlayerHealth", "iF", playerId);
    }
    static setPlayerArmour(playerId, armour) {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1;
    }
    static getPlayerArmour(playerId) {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0;
        }
        return samp.callNative("GetPlayerArmour", "iF", playerId);
    }
    static putPlayerInVehicle(playerId, vehicleId, seat = exports.VehicleSeatsEnum.Driver) {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1;
    }
    static getPlayerVehicleId(playerId) {
        const vehicleId = samp.callNative("GetPlayerVehicleID", "i", playerId);
        if (vehicleId === 0) {
            return undefined;
        }
        return vehicleId;
    }
    static getPlayerState(playerId) {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return undefined;
        }
        return samp.callNative("GetPlayerState", "i", playerId);
    }
    static setPlayerRotation(playerId, rotation) {
        return samp.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1;
    }
    static getPlayerRotation(playerId) {
        if (!SampNatives.isPlayerConnected(playerId)) {
            return 0;
        }
        return samp.callNative("GetPlayerFacingAngle", "iF", playerId);
    }
    static sendClientMessageToAll(color, message) {
        if (message.length > 90) {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`);
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `... ${message.slice(90)}`);
        }
        else {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), message);
        }
    }
    static getVehicleModel(vehicleId) {
        const modelId = samp.callNative("GetVehicleModel", "i", vehicleId);
        if (modelId === 0) {
            return undefined;
        }
        return modelId;
    }
    static getVehicleHealth(vehicleId) {
        if (!SampNatives.isValidVehicle(vehicleId)) {
            return 1000;
        }
        return samp.callNative("GetVehicleHealth", "iF", vehicleId);
    }
    static setVehicleHealth(vehicleId, health) {
        return samp.callNative("SetVehicleHealth", "if", vehicleId, health) === 1;
    }
    static isValidVehicle(vehicleId) {
        return samp.callNative("IsValidVehicle", "i", vehicleId) === 1;
    }
}
SampNatives.manualVehicleEngineAndLights = () => {
    return samp.callNative("ManualVehicleEngineAndLights", "");
};
SampNatives.setVehicleParamsEx = (vehicleId, engine, lights, alarm, doors, bonnet, boot, objective) => {
    return samp.callNative("SetVehicleParamsEx", "iiiiiiii", vehicleId, engine, lights, alarm, doors, bonnet, boot, objective) === 1;
};
SampNatives.setVehicleNumberPlate = (vehicleId, numberplate) => {
    return samp.callNative("SetVehicleNumberPlate", "is", vehicleId, numberplate) === 1;
};
SampNatives.getVehicleParamsEx = (vehicleId) => {
    if (!SampNatives.isValidVehicle(vehicleId)) {
        return {
            engine: false,
            lights: false,
            alarm: false,
            doors: false,
            bonnet: false,
            boot: false,
            objective: false,
        };
    }
    const res = samp.callNative("GetVehicleParamsEx", "iIIIIIII", vehicleId);
    return {
        engine: res[0],
        lights: res[1],
        alarm: res[2],
        doors: res[3],
        bonnet: res[4],
        boot: res[5],
        objective: res[6],
    };
};
SampNatives.getServerTickRate = () => {
    return samp.callNative("GetServerTickRate", "");
};
SampNatives.getVehicleVelocity = (vehicleId) => {
    if (!SampNatives.isValidVehicle(vehicleId)) {
        return new Vector3();
    }
    const res = samp.callNative("GetVehicleVelocity", "iFFF", vehicleId);
    return new Vector3(res[0], res[1], res[2]);
};
SampNatives.getWeaponName = (weaponId) => {
    if (weaponId < exports.WeaponsEnum.Fist || weaponId > exports.WeaponsEnum.Collision) {
        return "invalid_weapon";
    }
    return samp.callNative("GetWeaponName", "iSi", weaponId, 32);
};
SampNatives.setVehicleVelocity = (vehicleId, velocity) => {
    return samp.callNative("SetVehicleVelocity", "ifff", vehicleId, velocity.x, velocity.y, velocity.z) === 1;
};
SampNatives.setPlayerSkillLevel = (playerId, skillType, level) => {
    return samp.callNative("SetPlayerSkillLevel", "iii", playerId, skillType, level) === 1;
};
SampNatives.setPlayerColor = (playerId, color) => {
    samp.callNative("SetPlayerColor", "ii", playerId, parseInt(color + "FF", 16));
};
SampNatives.setWeather = (weatherId) => {
    samp.callNative("SetWeather", "i", weatherId);
};
SampNatives.setWorldTime = (hour) => {
    samp.callNative("SetWorldTime", "i", hour);
};
SampNatives.setNameTagDrawDistance = (distance) => {
    samp.callNative("SetNameTagDrawDistance", "f", distance);
};
SampNatives.enableStuntBonusForAll = (enable) => {
    samp.callNative("EnableStuntBonusForAll", "i", enable === true ? 1 : 0);
};
SampNatives.sendRconCommand = (command) => {
    samp.callNative("SendRconCommand", "s", command);
};
SampNatives.changeVehicleColor = (vehicleId, color1, color2) => {
    return samp.callNative("ChangeVehicleColor", "iii", vehicleId, color1, color2) === 1;
};
SampNatives.setPlayerAttachedObject = (playerId, index, modelid, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ, materialcolor1, materialcolor2) => {
    return (samp.callNative("SetPlayerAttachedObject", "iiiifffffffffii", playerId, index, modelid, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ, parseInt(materialcolor1 + "FF", 16), parseInt(materialcolor2 + "FF", 16)) === 1);
};
SampNatives.removePlayerAttachedObject = (playerId, index) => {
    return samp.callNative("RemovePlayerAttachedObject", "ii", playerId, index) === 1;
};
SampNatives.isPlayerAttachedObjectSlotUsed = (playerId, index) => {
    return samp.callNative("IsPlayerAttachedObjectSlotUsed", "ii", playerId, index) === 1;
};
SampNatives.editAttachedObject = (playerId, index) => {
    return samp.callNative("EditAttachedObject", "ii", playerId, index) === 1;
};
SampNatives.destroyVehicle = (vehicleId) => {
    return samp.callNative("DestroyVehicle", "i", vehicleId) === 1;
};
SampNatives.createVehicle = (modelId, position, rotation, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false) => {
    const vehicleId = samp.callNative("CreateVehicle", "iffffiiii", modelId, position.x, position.y, position.z, rotation, primaryColor, secondaryColor, respawnDelay, addSiren);
    if (vehicleId === 65535 || vehicleId === 0) {
        return undefined;
    }
    return vehicleId;
};
SampNatives.showPlayerDialog = (playerId, dialogId, styleId, caption, info, button1, button2) => {
    return samp.callNative("ShowPlayerDialog", "iiissss", playerId, dialogId, styleId, caption, info, button1, button2) === 1;
};
SampNatives.setPlayerTeam = (playerId, teamId) => {
    return samp.callNative("SetPlayerTeam", "ii", playerId, teamId) === 1;
};
SampNatives.create3DTextLabel = (text, color, X, Y, Z, DrawDistance, virtualworld, testLOS) => {
    if (!text) {
        return undefined;
    }
    if (virtualworld === -1) {
        return undefined;
    }
    const res = samp.callNative("Create3DTextLabel", "siffffii", text, parseInt(color + "FF", 16), X, Y, Z, DrawDistance, virtualworld, testLOS);
    if (res === 65535) {
        return undefined;
    }
    return res;
};
SampNatives.delete3DTextLabel = (id) => {
    return samp.callNative("Delete3DTextLabel", "i", id) === 1;
};
SampNatives.attach3DTextLabelToPlayer = (id, playerId, OffsetX, OffsetY, OffsetZ) => {
    return samp.callNative("Attach3DTextLabelToPlayer", "iifff", id, playerId, OffsetX, OffsetY, OffsetZ) === 1;
};
SampNatives.attach3DTextLabelToVehicle = (id, vehicleId, OffsetX, OffsetY, OffsetZ) => {
    return samp.callNative("Attach3DTextLabelToVehicle", "iifff", id, vehicleId, OffsetX, OffsetY, OffsetZ) === 1;
};
SampNatives.update3DTextLabelText = (id, color, text) => {
    if (text) {
        samp.callNative("Update3DTextLabelText", "iis", id, parseInt(color + "FF", 16), text);
        return true;
    }
    return false;
};
SampNatives.setPlayerScore = (playerId, score) => {
    return samp.callNative("SetPlayerScore", "ii", playerId, score) === 1;
};
SampNatives.getPlayerScore = (playerId) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return 0;
    }
    return samp.callNative("GetPlayerScore", "i", playerId);
};
SampNatives.isPlayerInRangeOfPoint = (playerId, range, x, y, z) => {
    return samp.callNative("IsPlayerInRangeOfPoint", "iffff", playerId, range, x, y, z) === 1;
};
SampNatives.setVehiclePosition = (vehicleId, x, y, z) => {
    return samp.callNative("SetVehiclePos", "ifff", vehicleId, x, y, z) === 1;
};
SampNatives.applyAnimation = (playerId, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync) => {
    samp.callNative("ApplyAnimation", "issfiiiiii", playerId, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync);
};
SampNatives.clearAnimations = (playerId, forcesync) => {
    samp.callNative("ClearAnimations", "ii", playerId, forcesync);
};
SampNatives.getPlayerAnimationIndex = (playerId) => {
    return samp.callNative("GetPlayerAnimationIndex", "i", playerId);
};
SampNatives.getAnimationName = (index) => {
    const res = samp.callNative("GetAnimationName", "iSiSi", index, 32, 32);
    if (res.length < 2) {
        return undefined;
    }
    return {
        library: res[0],
        name: res[1],
    };
};
SampNatives.getPlayerVehicleSeat = (playerId) => {
    const res = samp.callNative("GetPlayerVehicleSeat", "i", playerId);
    if (res === -1) {
        return undefined;
    }
    return res;
};
SampNatives.getPlayerSpecialAction = (playerId) => {
    return samp.callNative("GetPlayerSpecialAction", "i", playerId);
};
SampNatives.setPlayerSpecialAction = (playerId, actionId) => {
    return samp.callNative("SetPlayerSpecialAction", "ii", playerId, actionId) === 1;
};
SampNatives.gpci = (playerId) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return "invalid_gpci";
    }
    return samp.callNative("gpci", "iSi", playerId, 61);
};
SampNatives.getPlayerIp = (playerId) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return "255.255.255.255";
    }
    return samp.callNative("GetPlayerIp", "iSi", playerId, 17);
};
SampNatives.getPlayerPing = (playerId) => {
    return samp.callNative("GetPlayerPing", "i", playerId);
};
SampNatives.givePlayerMoney = (playerId, money) => {
    return samp.callNative("GivePlayerMoney", "ii", playerId, money) === 1;
};
SampNatives.resetPlayerMoney = (playerId) => {
    return samp.callNative("ResetPlayerMoney", "i", playerId) === 1;
};
SampNatives.givePlayerWeapon = (playerId, weaponId, ammo) => {
    return samp.callNative("GivePlayerWeapon", "iii", playerId, weaponId, ammo) === 1;
};
SampNatives.getPlayerWeapon = (playerId) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return exports.WeaponsEnum.Fist;
    }
    return samp.callNative("GetPlayerWeapon", "i", playerId);
};
SampNatives.resetPlayerWeapons = (playerId) => {
    return samp.callNative("ResetPlayerWeapons", "i", playerId) === 1;
};
SampNatives.setPlayerArmedWeapon = (playerId, weaponId) => {
    return samp.callNative("SetPlayerArmedWeapon", "ii", playerId, weaponId) === 1;
};
SampNatives.setPlayerSkin = (playerId, skinId) => {
    return samp.callNative("SetPlayerSkin", "ii", playerId, skinId) === 1;
};
SampNatives.getVehiclePosition = (vehicleId) => {
    if (!SampNatives.isValidVehicle(vehicleId)) {
        return new Vector3();
    }
    const pos = samp.callNative("GetVehiclePos", "iFFF", vehicleId);
    return new Vector3(pos[0], pos[1], pos[2]);
};
SampNatives.getPlayerWeaponData = (playerId, slot) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return undefined;
    }
    const res = samp.callNative("GetPlayerWeaponData", "iiII", playerId, slot);
    if (res.length < 2) {
        return undefined;
    }
    if (slot !== exports.WeaponSlotsEnum.Unarmed && res[0] === exports.WeaponsEnum.Fist) {
        return undefined;
    }
    return {
        model: res[0],
        ammo: res[1],
    };
};
SampNatives.getPlayerCameraMode = (playerId) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return exports.CameraModesEnum.FollowPed;
    }
    return samp.callNative("GetPlayerCameraMode", "i", playerId);
};
SampNatives.setVehicleZAngle = (vehicleId, angle) => {
    return samp.callNative("SetVehicleZAngle", "if", vehicleId, angle) === 1;
};
SampNatives.getVehicleZAngle = (vehicleId) => {
    if (!SampNatives.isValidVehicle(vehicleId)) {
        return 0;
    }
    return samp.callNative("GetVehicleZAngle", "iF", vehicleId);
};
SampNatives.setVehicleVirtualWorld = (vehicleId, worldId) => {
    return samp.callNative("SetVehicleVirtualWorld", "ii", vehicleId, worldId) === 1;
};
SampNatives.getVehicleVirtualWorld = (vehicleId) => {
    if (!SampNatives.isValidVehicle(vehicleId)) {
        return 0;
    }
    return samp.callNative("GetVehicleVirtualWorld", "i", vehicleId);
};
SampNatives.linkVehicleToInterior = (vehicleId, interiorId) => {
    return samp.callNative("LinkVehicleToInterior", "ii", vehicleId, interiorId) === 1;
};
SampNatives.getVehicleDistanceFromPoint = (vehicleId, x, y, z) => {
    if (!SampNatives.isValidVehicle(vehicleId)) {
        return Number.POSITIVE_INFINITY;
    }
    return samp.callNativeFloat("GetVehicleDistanceFromPoint", "ifff", vehicleId, x, y, z);
};
SampNatives.getPlayerDistanceFromPoint = (playerId, x, y, z) => {
    if (!SampNatives.isPlayerConnected(playerId)) {
        return Number.POSITIVE_INFINITY;
    }
    return samp.callNativeFloat("GetPlayerDistanceFromPoint", "ifff", playerId, x, y, z);
};
SampNatives.setPlayerChatBubble = (playerId, text, color, drawdistance, expiretime) => {
    return samp.callNative("SetPlayerChatBubble", "isifi", playerId, text, parseInt(color + "FF", 16), drawdistance, expiretime) === 1;
};

const CONFIG = {
    entity: {
        invalidId: -1,
    },
    player: {
        team: 0,
        color: "FFFFFF",
        skin: 0,
        cash: 0,
        spawn: {
            position: new Vector3(),
            rotation: 0,
            world: 0,
            interior: 0,
        },
    },
    vehicle: {
        interior: 0,
        plate: "",
        primaryColor: -1,
        secondaryColor: -1,
        respawnDelay: -1,
        siren: false,
        params: {
            engine: "off",
            lights: "off",
            alarm: "off",
            doors: "unlocked",
            bonnet: "closed",
            boot: "closed",
            objective: "off",
        },
    },
    message: {
        color: "FFFFFF",
    },
    chatBubble: {
        color: "FFFFFF",
        distance: 12,
        expire: 5000,
    },
    textLabel: {
        color: "FFFFFF",
        distance: 10,
        world: 0,
        testLos: true,
    },
    playerAttachedObjects: {
        limit: 10,
    },
};

class PlayerAnimations {
    constructor(player) {
        this.player = player;
    }
    set(library, name, speed, loop, lockX, lockY, freeze, time, forceSync = true) {
        return SampNatives.applyAnimation(this.player.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync);
    }
    clear() {
        return SampNatives.clearAnimations(this.player.id, true);
    }
    get currentIndex() {
        return SampNatives.getPlayerAnimationIndex(this.player.id);
    }
}

class PlayerDialogFactory {
    static async new(player) {
        const existing = this.promises.get(player.id);
        if (existing) {
            existing(undefined);
        }
        return new Promise((resolve) => {
            this.promises.set(player.id, resolve);
        });
    }
    static destroy(player, response) {
        const existing = this.promises.get(player.id);
        if (existing) {
            existing(response);
        }
        this.promises.delete(player.id);
    }
}
PlayerDialogFactory.promises = new Map();

class PlayerDialog {
    constructor(player) {
        this.player = player;
        this.show = new PlayerDialogShow(this.player);
    }
    async hide(response) {
        PlayerDialogFactory.destroy(this.player, response);
        SampNatives.hidePlayerDialog(this.player.id);
    }
}
class PlayerDialogShow {
    constructor(player) {
        this.player = player;
    }
    async list(caption, items, primaryButton, secondaryButton = "") {
        SampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.List, caption, items.join("\n"), primaryButton, secondaryButton);
        return PlayerDialogFactory.new(this.player);
    }
    async tablist(caption, items, primaryButton, secondaryButton = "") {
        SampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.Tablist, caption, items.map((columns) => columns.join("\t")).join("\n"), primaryButton, secondaryButton);
        return PlayerDialogFactory.new(this.player);
    }
    async tablistWithHeaders(caption, headers, items, primaryButton, secondaryButton = "") {
        let headerString = "";
        let itemsString = "";
        if (typeof headers === "string") {
            headerString = headers;
            headers = [headers];
        }
        else {
            headerString = headers.join("\t");
        }
        if (typeof items[0] === "string") {
            itemsString = items.join("\n");
            items = [items];
        }
        else {
            itemsString = items.map((columns) => columns.join("\t")).join("\n");
        }
        SampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.TablistHeaders, caption, headerString + "\n" + itemsString, primaryButton, secondaryButton);
        return PlayerDialogFactory.new(this.player);
    }
    async messageBox(caption, info, primaryButton, secondaryButton = "") {
        SampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.MessageBox, caption, info, primaryButton, secondaryButton);
        return PlayerDialogFactory.new(this.player);
    }
    async input(caption, info, primaryButton, secondaryButton = "") {
        SampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.Input, caption, info, primaryButton, secondaryButton);
        return PlayerDialogFactory.new(this.player);
    }
    async password(caption, info, primaryButton, secondaryButton = "") {
        SampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.Password, caption, info, primaryButton, secondaryButton);
        return PlayerDialogFactory.new(this.player);
    }
}

class PlayerWeapons {
    constructor(player) {
        this.player = player;
    }
    setSkill(weapon, level) {
        return SampNatives.setPlayerSkillLevel(this.player.id, weapon, level);
    }
    add(weapon, ammo) {
        return SampNatives.givePlayerWeapon(this.player.id, weapon, ammo);
    }
    remove(weapon) {
        const weapons = this.all;
        const holding = this.holding;
        this.reset();
        for (const weaponData of weapons) {
            if (weaponData.model !== weapon) {
                this.add(weaponData.model, weaponData.ammo);
            }
        }
        if (holding !== weapon) {
            this.holding = holding;
        }
        else {
            this.holding = exports.WeaponsEnum.Fist;
        }
    }
    reset() {
        return SampNatives.resetPlayerWeapons(this.player.id);
    }
    at(slot) {
        return SampNatives.getPlayerWeaponData(this.player.id, slot);
    }
    set holding(weapon) {
        SampNatives.setPlayerArmedWeapon(this.player.id, weapon);
    }
    get holding() {
        return SampNatives.getPlayerWeapon(this.player.id);
    }
    get all() {
        const weapons = [];
        const values = Object.values(exports.WeaponSlotsEnum).filter((v) => !isNaN(Number(v)));
        for (const value of values) {
            const weapon = this.at(value);
            if (weapon) {
                weapons.push(weapon);
            }
        }
        return weapons;
    }
}

class Entity {
    constructor(id) {
        this.id = id;
        this.variables = new Map();
    }
    setVariable(name, value) {
        this.variables.set(name, value);
    }
    getVariable(name) {
        return this.variables.get(name);
    }
    deleteVariable(name) {
        return this.variables.delete(name);
    }
    set exists(value) {
        this.id = CONFIG.entity.invalidId;
    }
    get exists() {
        return this.id !== CONFIG.entity.invalidId;
    }
}

class VehicleParams {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this._engine = CONFIG.vehicle.params.engine;
        this._lights = CONFIG.vehicle.params.lights;
        this._alarm = CONFIG.vehicle.params.alarm;
        this._doors = CONFIG.vehicle.params.doors;
        this._bonnet = CONFIG.vehicle.params.bonnet;
        this._boot = CONFIG.vehicle.params.boot;
        this._objective = CONFIG.vehicle.params.objective;
        SampNatives.setVehicleParamsEx(vehicle.id, this._engine === "on", this._lights === "on", this._alarm === "on", this._doors === "locked", this._bonnet === "open", this._boot === "open", this._objective === "on");
    }
    set engine(value) {
        this._engine = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, this._engine === "on", params.lights, params.alarm, params.doors, params.bonnet, params.boot, params.objective);
    }
    get engine() {
        return this._engine;
    }
    set lights(value) {
        this._lights = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, this._lights === "on", params.alarm, params.doors, params.bonnet, params.boot, params.objective);
    }
    get lights() {
        return this._lights;
    }
    set alarm(value) {
        this._alarm = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, this._alarm === "on", params.doors, params.bonnet, params.boot, params.objective);
    }
    get alarm() {
        return this._alarm;
    }
    set doors(value) {
        this._doors = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, this._doors === "locked", params.bonnet, params.boot, params.objective);
    }
    get doors() {
        return this._doors;
    }
    set hood(value) {
        this._bonnet = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, params.doors, this._bonnet === "open", params.boot, params.objective);
    }
    get hood() {
        return this._bonnet;
    }
    set trunk(value) {
        this._boot = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, params.doors, params.bonnet, this._boot === "open", params.objective);
    }
    get trunk() {
        return this._boot;
    }
    set objective(value) {
        this._objective = value;
        const params = SampNatives.getVehicleParamsEx(this.vehicle.id);
        SampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, params.doors, params.bonnet, params.boot, this._objective === "on");
    }
    get objective() {
        return this._objective;
    }
}

class VehicleTextLabels {
    constructor(vehicle) {
        this.vehicle = vehicle;
        this.labels = new Set();
    }
    attach(label, offset) {
        if (label.attached) {
            return false;
        }
        if (!SampNatives.attach3DTextLabelToVehicle(label.id, this.vehicle.id, offset.x, offset.y, offset.z)) {
            return false;
        }
        this.labels.add(label);
        label.attached = true;
        return true;
    }
    get all() {
        for (const label of this.labels) {
            if (!label.exists) {
                this.labels.delete(label);
            }
        }
        return this.labels;
    }
}

class VehicleMp extends Entity {
    constructor(id, model, primaryColor, secondaryColor) {
        super(id);
        this.model = model;
        this.occupants = new Set();
        this.params = new VehicleParams(this);
        this.textLabels = new VehicleTextLabels(this);
        this._interior = CONFIG.vehicle.interior;
        this._plate = CONFIG.vehicle.plate;
        this._primaryColor = primaryColor;
        this._secondaryColor = secondaryColor;
        SampNatives.linkVehicleToInterior(this.id, this._interior);
        SampNatives.setVehicleNumberPlate(this.id, this._plate);
    }
    set position(position) {
        SampNatives.setPlayerPosition(this.id, position.x, position.y, position.z);
    }
    get position() {
        return SampNatives.getPlayerPosition(this.id);
    }
    set velocity(velocity) {
        SampNatives.setVehicleVelocity(this.id, velocity);
    }
    get velocity() {
        return SampNatives.getVehicleVelocity(this.id);
    }
    set rotation(angle) {
        SampNatives.setVehicleZAngle(this.id, angle);
    }
    get rotation() {
        return SampNatives.getVehicleZAngle(this.id);
    }
    set world(value) {
        SampNatives.setVehicleVirtualWorld(this.id, value);
    }
    get world() {
        return SampNatives.getVehicleVirtualWorld(this.id);
    }
    set interior(interior) {
        this._interior = interior;
        SampNatives.linkVehicleToInterior(this.id, interior);
    }
    get interior() {
        return this._interior;
    }
    set health(health) {
        SampNatives.setVehicleHealth(this.id, health);
    }
    get health() {
        return SampNatives.getVehicleHealth(this.id);
    }
    set primaryColor(color) {
        this._primaryColor = color;
        SampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor);
    }
    get primaryColor() {
        return this._primaryColor;
    }
    set secondaryColor(color) {
        this._secondaryColor = color;
        SampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor);
    }
    get secondaryColor() {
        return this._secondaryColor;
    }
    set plate(plate) {
        this._plate = plate;
        SampNatives.setVehicleNumberPlate(this.id, plate);
    }
    get plate() {
        return this._plate;
    }
}

class VehicleMpFactory {
    static new(vehicleId, model, primaryColor, secondaryColor) {
        if (this.at(vehicleId)) {
            return undefined;
        }
        const vehicle = new VehicleMp(vehicleId, model, primaryColor, secondaryColor);
        this.pool.set(vehicleId, vehicle);
        return vehicle;
    }
    static destroy(vehicle) {
        const deleted = this.pool.delete(vehicle.id);
        vehicle.exists = false;
        return deleted;
    }
    static at(id) {
        return this.pool.get(id);
    }
    static get all() {
        return this.pool.values();
    }
}
VehicleMpFactory.pool = new Map();

class VehiclesMp {
    new(model, position, rotation, primaryColor = CONFIG.vehicle.primaryColor, secondaryColor = CONFIG.vehicle.secondaryColor, respawnDelay = CONFIG.vehicle.respawnDelay, siren = CONFIG.vehicle.siren) {
        const vehicleId = SampNatives.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren);
        if (vehicleId === undefined) {
            return undefined;
        }
        return VehicleMpFactory.new(vehicleId, model, primaryColor, secondaryColor);
    }
    destroy(vehicle) {
        SampNatives.destroyVehicle(vehicle.id);
        VehicleMpFactory.destroy(vehicle);
    }
    at(id) {
        return VehicleMpFactory.at(id);
    }
    getClosest(position, range, world, interior) {
        const vehicles = new Map();
        for (const vehicle of this.all) {
            if (world !== undefined && vehicle.world !== world) {
                continue;
            }
            if (interior !== undefined && vehicle.interior !== interior) {
                continue;
            }
            const distance = vehicle.position.distance(position);
            if (distance < range) {
                vehicles.set(vehicle, distance);
            }
        }
        return vehicles;
    }
    get all() {
        return VehicleMpFactory.all;
    }
}

const vehiclesMp = new VehiclesMp();

eventsMp.on("playerStateChange", (player, newState, oldState) => {
    if ((newState === exports.PlayerStatesEnum.Passenger || newState === exports.PlayerStatesEnum.Driver) &&
        oldState !== exports.PlayerStatesEnum.Passenger &&
        oldState !== exports.PlayerStatesEnum.Driver) {
        const currentVehicle = player.vehicle;
        if (currentVehicle === undefined) {
            return;
        }
        player.setVariable("internal::lastVehicleId", currentVehicle.id);
        eventsMp.emit("playerEnterVehicle", player, currentVehicle);
    }
    else if ((oldState === exports.PlayerStatesEnum.Passenger || oldState === exports.PlayerStatesEnum.Driver) &&
        newState !== exports.PlayerStatesEnum.Passenger &&
        newState !== exports.PlayerStatesEnum.Driver) {
        const lastVehicleId = player.getVariable("internal::lastVehicleId");
        if (lastVehicleId === undefined) {
            return;
        }
        player.deleteVariable("internal::lastVehicleId");
        eventsMp.emit("playerExitVehicle", player, vehiclesMp.at(lastVehicleId));
    }
});
function putInVehicleWithEvent(player, vehicle, seat) {
    const oldVehicle = player.vehicle;
    if (!oldVehicle || oldVehicle === vehicle) {
        return SampNatives.putPlayerInVehicle(player.id, vehicle.id, seat);
    }
    eventsMp.emit("playerExitVehicle", player, oldVehicle);
    SampNatives.putPlayerInVehicle(player.id, vehicle.id, seat);
    eventsMp.emit("playerEnterVehicle", player, vehicle);
    return true;
}

class PlayerTextLabels {
    constructor(player) {
        this.player = player;
        this.labels = new Set();
    }
    attach(label, offset) {
        if (label.attached) {
            return false;
        }
        if (!SampNatives.attach3DTextLabelToPlayer(label.id, this.player.id, offset.x, offset.y, offset.z)) {
            return false;
        }
        this.labels.add(label);
        label.attached = true;
        return true;
    }
    get all() {
        for (const label of this.labels) {
            if (!label.exists) {
                this.labels.delete(label);
            }
        }
        return this.labels;
    }
}

class PlayerAttachedObject extends Entity {
    constructor(slot, model, bone, offset, rotation, scale, firstMaterialColor, secondMaterialColor) {
        super(slot);
        this.model = model;
        this.bone = bone;
        this.offset = offset;
        this.rotation = rotation;
        this.scale = scale;
        this.firstMaterialColor = firstMaterialColor;
        this.secondMaterialColor = secondMaterialColor;
    }
}

class PlayerAttachedObjects {
    constructor(player) {
        this.player = player;
        this.attachedObjects = new Array(CONFIG.playerAttachedObjects.limit).fill(undefined);
    }
    new(model, bone, offset, rotation, scale, firstMaterialColor, secondMaterialColor) {
        const slot = this.attachedObjects.indexOf(undefined);
        if (slot === -1) {
            return undefined;
        }
        const success = SampNatives.setPlayerAttachedObject(this.player.id, slot, model, bone, offset.x, offset.y, offset.z, rotation.x, rotation.y, rotation.z, scale.x, scale.y, scale.z, firstMaterialColor, secondMaterialColor);
        if (success) {
            this.attachedObjects[slot] = new PlayerAttachedObject(slot, model, bone, offset, rotation, scale, firstMaterialColor, secondMaterialColor);
            return this.attachedObjects[slot];
        }
        return undefined;
    }
    destroy(object) {
        SampNatives.removePlayerAttachedObject(this.player.id, object.id);
        this.attachedObjects[object.id] = undefined;
        object.exists = false;
    }
    destroyAll() {
        for (const object of this.attachedObjects) {
            if (object) {
                this.destroy(object);
            }
        }
    }
}

class PlayerMp extends Entity {
    constructor(id) {
        super(id);
        this.dialog = new PlayerDialog(this);
        this.weapons = new PlayerWeapons(this);
        this.animations = new PlayerAnimations(this);
        this.textLabels = new PlayerTextLabels(this);
        this.attachedObjects = new PlayerAttachedObjects(this);
        this._name = SampNatives.getPlayerName(this.id);
        this._color = CONFIG.player.color;
        this._cash = CONFIG.player.cash;
        this._skin = CONFIG.player.skin;
        this._spectating = true;
        SampNatives.setPlayerColor(this.id, this._color);
        SampNatives.givePlayerMoney(this.id, this._cash);
        SampNatives.setPlayerSkin(this.id, this._skin);
        SampNatives.setPlayerTeam(this.id, CONFIG.player.team);
        SampNatives.togglePlayerSpectating(this.id, this._spectating);
    }
    sendMessage(message, color = CONFIG.message.color) {
        return SampNatives.sendClientMessage(this.id, color, message);
    }
    spawn(position = CONFIG.player.spawn.position, rotation = CONFIG.player.spawn.rotation, world = CONFIG.player.spawn.world, interior = CONFIG.player.spawn.interior) {
        if (!this.spectating) {
            if (this.state === exports.PlayerStatesEnum.Wasted) {
                // If in class selection
                SampNatives.spawnPlayer(this.id);
            }
            return;
        }
        this.world = world;
        this.interior = interior;
        SampNatives.setSpawnInfo(this.id, CONFIG.player.team, this.skin, position, rotation);
        this.spectating = false;
    }
    kick(delay = 10) {
        if (delay <= 0) {
            return SampNatives.kick(this.id);
        }
        setTimeout(() => {
            SampNatives.kick(this.id);
        }, delay);
    }
    set spectating(spectating) {
        this._spectating = spectating;
        SampNatives.togglePlayerSpectating(this.id, spectating);
    }
    get spectating() {
        return this._spectating;
    }
    set position(position) {
        SampNatives.setPlayerPosition(this.id, position.x, position.y, position.z);
    }
    get position() {
        return SampNatives.getPlayerPosition(this.id);
    }
    set specialAction(action) {
        SampNatives.setPlayerSpecialAction(this.id, action);
    }
    get specialAction() {
        return SampNatives.getPlayerSpecialAction(this.id);
    }
    set skin(skin) {
        this._skin = skin;
        SampNatives.setPlayerSkin(this.id, skin);
    }
    get skin() {
        return this._skin;
    }
    set rotation(rotation) {
        SampNatives.setPlayerRotation(this.id, rotation);
    }
    get rotation() {
        return SampNatives.getPlayerRotation(this.id);
    }
    set name(name) {
        this._name = name;
        SampNatives.setPlayerName(this.id, name);
    }
    get name() {
        return this._name;
    }
    set world(value) {
        SampNatives.setPlayerVirtualWorld(this.id, value);
    }
    get world() {
        return SampNatives.getPlayerVirtualWorld(this.id);
    }
    set interior(value) {
        SampNatives.setPlayerInterior(this.id, value);
    }
    get interior() {
        return SampNatives.getPlayerInterior(this.id);
    }
    set health(value) {
        SampNatives.setPlayerHealth(this.id, value);
    }
    get health() {
        return SampNatives.getPlayerHealth(this.id);
    }
    set armour(value) {
        SampNatives.setPlayerArmour(this.id, value);
    }
    get armour() {
        return SampNatives.getPlayerArmour(this.id);
    }
    set color(hex) {
        this._color = hex;
        SampNatives.setPlayerColor(this.id, hex);
    }
    get color() {
        return this._color;
    }
    get ip() {
        return SampNatives.getPlayerIp(this.id);
    }
    get ping() {
        return SampNatives.getPlayerPing(this.id);
    }
    get gpci() {
        return SampNatives.gpci(this.id);
    }
    set cash(value) {
        SampNatives.resetPlayerMoney(this.id);
        SampNatives.givePlayerMoney(this.id, value);
        this._cash = value;
    }
    get cash() {
        return this._cash;
    }
    set score(value) {
        SampNatives.setPlayerScore(this.id, value);
    }
    get score() {
        return SampNatives.getPlayerScore(this.id);
    }
    get cameraMode() {
        return SampNatives.getPlayerCameraMode(this.id);
    }
    setChatBubble(text, color = CONFIG.chatBubble.color, drawDistance = CONFIG.chatBubble.distance, expireTime = CONFIG.chatBubble.expire) {
        return SampNatives.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime);
    }
    get spawned() {
        const state = this.state;
        if (state === undefined) {
            return undefined;
        }
        return state !== exports.PlayerStatesEnum.Wasted && state !== exports.PlayerStatesEnum.Spectating && state !== exports.PlayerStatesEnum.None;
    }
    get state() {
        return SampNatives.getPlayerState(this.id);
    }
    putIntoVehicle(vehicle, seat = exports.VehicleSeatsEnum.Driver) {
        return putInVehicleWithEvent(this, vehicle, seat);
    }
    get vehicle() {
        const vehicleId = SampNatives.getPlayerVehicleId(this.id);
        if (vehicleId === undefined) {
            return undefined;
        }
        return vehiclesMp.at(vehicleId);
    }
    get vehicleSeat() {
        return SampNatives.getPlayerVehicleSeat(this.id);
    }
}

class PlayerMpFactory {
    static new(id) {
        if (this.at(id)) {
            return undefined;
        }
        const player = new PlayerMp(id);
        this.pool.set(id, player);
        return player;
    }
    static destroy(player) {
        const deleted = this.pool.delete(player.id);
        player.exists = false;
        return deleted;
    }
    static at(id) {
        return this.pool.get(id);
    }
    static get all() {
        return this.pool.values();
    }
}
PlayerMpFactory.pool = new Map();

// TODO: find the actual issue and fix it
// Weird issue: if you kick a player in the "playerConnect" event, they get a crash/timeout
// So I'm fixing it by triggering "playerConnect" with a little bit of delay
const playerTimeoutIds = new Map();
samp.on("OnPlayerConnect", (playerId) => {
    SampNatives.togglePlayerSpectating(playerId, true); // TODO: remove this when the issue is fixed
    const timeoutId = setTimeout(() => {
        playerTimeoutIds.delete(playerId);
        const player = PlayerMpFactory.new(playerId);
        if (player) {
            eventsMp.emit("playerConnect", player);
        }
    }, 1000);
    playerTimeoutIds.set(playerId, timeoutId);
});
samp.on("OnPlayerDisconnect", (playerId, reason) => {
    clearTimeout(playerTimeoutIds.get(playerId));
    playerTimeoutIds.delete(playerId);
    const player = PlayerMpFactory.at(playerId);
    if (player) {
        eventsMp.emit("playerDisconnect", player, reason);
        PlayerMpFactory.destroy(player);
    }
});

class PlayersMp {
    at(id) {
        return PlayerMpFactory.at(id);
    }
    broadcast(message, color = CONFIG.message.color) {
        SampNatives.sendClientMessageToAll(color, message);
    }
    getClosest(position, range, world, interior) {
        const players = new Map();
        for (const player of this.all) {
            if (world !== undefined && player.world !== world) {
                continue;
            }
            if (interior !== undefined && player.interior !== interior) {
                continue;
            }
            const distance = player.position.distance(position);
            if (distance < range) {
                players.set(player, distance);
            }
        }
        return players;
    }
    get all() {
        return PlayerMpFactory.all;
    }
}

const playersMp = new PlayersMp();

samp.on("OnPlayerSpawn", (playerId) => {
    const player = playersMp.at(playerId);
    if (player === undefined) {
        return;
    }
    SampNatives.setPlayerTeam(playerId, CONFIG.player.team);
    if (player.getVariable("internal::firstSpawn") === undefined) {
        player.setVariable("internal::firstSpawn", true);
        eventsMp.emit("playerFirstSpawn", player);
    }
    eventsMp.emit("playerSpawn", player);
});
samp.on("OnPlayerRequestClass", (playerId, classId) => {
    const player = playersMp.at(playerId);
    if (player !== undefined) {
        player.spawn();
    }
});
samp.on("OnPlayerText", (playerId, text) => {
    const player = playersMp.at(playerId);
    if (player !== undefined) {
        eventsMp.emit("playerText", player, text);
    }
    return 0;
});
samp.on("OnPlayerStateChange", (playerId, newState, oldState) => {
    const player = playersMp.at(playerId);
    if (player !== undefined) {
        eventsMp.emit("playerStateChange", player, newState, oldState);
    }
});
samp.on("OnPlayerEnterVehicle", (playerId, vehicleId, asPassenger) => {
    const player = playersMp.at(playerId);
    const vehicle = vehiclesMp.at(vehicleId);
    if (player !== undefined && vehicle !== undefined) {
        eventsMp.emit("playerStartEnterVehicle", player, vehicle, asPassenger);
    }
});
samp.on("OnPlayerExitVehicle", (playerId, vehicleId) => {
    const player = playersMp.at(playerId);
    const vehicle = vehiclesMp.at(vehicleId);
    if (player !== undefined && vehicle !== undefined) {
        eventsMp.emit("playerStartExitVehicle", player, vehicle);
    }
});
samp.on("OnPlayerDeath", (playerId, killerId, weapon) => {
    const player = playersMp.at(playerId);
    if (player) {
        eventsMp.emit("playerDeath", player, playersMp.at(killerId), weapon);
    }
});
samp.on("OnPlayerTakeDamage", (playerId, issuerId, amount, weapon, bodyPart) => {
    const player = playersMp.at(playerId);
    if (player) {
        eventsMp.emit("playerDamage", player, playersMp.at(issuerId), amount, weapon, bodyPart);
    }
});
samp.on("OnPlayerWeaponShot", (playerId, weapon, hitType, hitId, fX, fY, fZ) => {
    const player = playersMp.at(playerId);
    if (player) {
        const hitEntity = hitType === exports.HitTypesEnum.Player ? playersMp.at(hitId) : hitType === exports.HitTypesEnum.Vehicle ? vehiclesMp.at(hitId) : undefined;
        eventsMp.emit("playerShoot", player, weapon, hitEntity, new Vector3(fX, fY, fZ));
    }
    return 1;
});

samp.on("OnDialogResponse", (playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playersMp.at(playerId);
    if (player) {
        PlayerDialogFactory.destroy(player, { button: responseParam === 1 ? "main" : "second", item: listItemParam, input: inputText });
    }
});
eventsMp.on("playerDisconnect", (player) => {
    PlayerDialogFactory.destroy(player, undefined);
});

class TextLabelMp extends Entity {
    constructor(id, text, color) {
        super(id);
        this.attached = false;
        this._text = text;
        this._color = color;
    }
    set text(text) {
        if (SampNatives.update3DTextLabelText(this.id, this._color, text)) {
            this._text = text;
        }
    }
    get text() {
        return this._text;
    }
}

class TextLabelMpFactory {
    static new(id, text, color) {
        if (this.at(id)) {
            return undefined;
        }
        const label = new TextLabelMp(id, text, color);
        this.pool.set(id, label);
        return label;
    }
    static destroy(label) {
        const deleted = this.pool.delete(label.id);
        label.exists = false;
        return deleted;
    }
    static at(id) {
        return this.pool.get(id);
    }
}
TextLabelMpFactory.pool = new Map();

class TextLabelsMp {
    constructor() {
        this.at = TextLabelMpFactory.at;
    }
    new(text, color, position, drawDistance = CONFIG.textLabel.distance, world = CONFIG.textLabel.world, testLos = CONFIG.textLabel.testLos) {
        const labelId = SampNatives.create3DTextLabel(text, color, position.x, position.y, position.z, drawDistance, world, testLos);
        if (labelId === undefined) {
            return undefined;
        }
        return TextLabelMpFactory.new(labelId, text, color);
    }
    destroy(label) {
        SampNatives.delete3DTextLabel(label.id);
        return TextLabelMpFactory.destroy(label);
    }
}

const textLabelsMp = new TextLabelsMp();

eventsMp.on("playerDisconnect", (player) => {
    for (const label of player.textLabels.all) {
        textLabelsMp.destroy(label);
    }
});

eventsMp.on("playerEnterVehicle", (player, vehicle) => {
    vehicle.occupants.add(player);
});
eventsMp.on("playerExitVehicle", (player, vehicle) => {
    vehicle?.occupants.delete(player);
});
eventsMp.on("playerDisconnect", (player) => {
    player.vehicle?.occupants.delete(player);
});

SampNatives.manualVehicleEngineAndLights();

eventsMp.on("vehicleDestroy", (vehicle) => {
    for (const label of vehicle.textLabels.all) {
        textLabelsMp.destroy(label);
    }
});

class CommandMp {
    constructor(name, aliases, callback) {
        this.name = name;
        this.aliases = aliases;
        this.callback = callback;
    }
}

class CommandMpFactory {
    static new(name, aliases, callback) {
        if (aliases.includes(name)) {
            throw new Error(`Command ${name} cannot be an alias of itself`);
        }
        if (CommandMpFactory.at(name)) {
            throw new Error(`Command ${name} already exists`);
        }
        for (const alias of aliases) {
            if (CommandMpFactory.at(alias)) {
                throw new Error(`You're using alias ${alias} for command ${name}, but that alias already exists as another command`);
            }
        }
        for (const command of CommandMpFactory.all) {
            if (command.aliases.includes(name)) {
                throw new Error(`Command name ${name} is used as an alias for command ${command.name}`);
            }
            if (aliases.some((alias) => command.aliases.includes(alias))) {
                throw new Error(`Command ${name} shares the same aliases as command ${command.name}`);
            }
        }
        const command = new CommandMp(name, aliases, callback);
        CommandMpFactory.pool.set(name, command);
        for (const alias of aliases) {
            CommandMpFactory.pool.set(alias, command);
        }
        return command;
    }
    static at(name) {
        return CommandMpFactory.pool.get(name);
    }
    static get all() {
        return CommandMpFactory.pool.values();
    }
}
// command/alias -> command
CommandMpFactory.pool = new Map();

samp.on("OnPlayerCommandText", (playerId, cmdText) => {
    const player = playersMp.at(playerId);
    if (!player) {
        return 1;
    }
    const params = cmdText.trim().split(/\s+/);
    const commandStr = params[0].toLowerCase();
    params.shift();
    if (commandStr === "/") {
        return 1;
    }
    const command = CommandMpFactory.at(commandStr);
    if (command) {
        eventsMp.emit("playerCommand", player, commandStr, command, () => command.callback(player, ...params));
    }
    else {
        eventsMp.emit("playerCommand", player, commandStr, undefined, () => { });
    }
    return 1;
});

class ServerMp {
    constructor() {
        this._name = "open gf server";
        this._language = "en";
        this._website = "open.mp";
        this._map = "San Andreas";
        this._mode = "Freeroam";
        this._stuntBonuses = false;
        this._nameTagDistance = 20;
        this._hour = 18;
        this._weather = 1;
        this.name = this._name;
        this.language = this._language;
        this.website = this._website;
        this.map = this._map;
        this.mode = this._mode;
        this.stuntBonuses = this._stuntBonuses;
        this.nameTagDistance = this._nameTagDistance;
        this.hour = this._hour;
        this.weather = this._weather;
    }
    set name(name) {
        this._name = name;
        SampNatives.sendRconCommand("name " + this._name);
    }
    get name() {
        return this._name;
    }
    set language(language) {
        this._language = language;
        SampNatives.sendRconCommand("language " + this._language);
    }
    get language() {
        return this._language;
    }
    set website(website) {
        this._website = website;
        SampNatives.sendRconCommand("website " + this._website);
    }
    get website() {
        return this._website;
    }
    set map(map) {
        this._map = map;
        SampNatives.sendRconCommand("game.map " + this._map);
    }
    get map() {
        return this._map;
    }
    set mode(mode) {
        this._mode = mode;
        SampNatives.sendRconCommand("game.mode " + this._mode);
    }
    get mode() {
        return this._mode;
    }
    set stuntBonuses(stuntBonuses) {
        this._stuntBonuses = stuntBonuses;
        SampNatives.enableStuntBonusForAll(this._stuntBonuses);
    }
    get stuntBonuses() {
        return this._stuntBonuses;
    }
    set nameTagDistance(nameTagDistance) {
        this._nameTagDistance = nameTagDistance;
        SampNatives.setNameTagDrawDistance(this._nameTagDistance);
    }
    get nameTagDistance() {
        return this._nameTagDistance;
    }
    set hour(hour) {
        this._hour = hour;
        SampNatives.setWorldTime(this._hour);
    }
    get hour() {
        return this._hour;
    }
    set weather(weather) {
        this._weather = weather;
        SampNatives.setWeather(this._weather);
    }
    get weather() {
        return this._weather;
    }
    get tickRate() {
        return SampNatives.getServerTickRate();
    }
}

class CommandsMp {
    constructor() {
        this.add = CommandMpFactory.new;
    }
    get all() {
        return CommandMpFactory.all;
    }
}

const serverMp = new ServerMp();

const commandsMp = new CommandsMp();

exports.og = void 0;
(function (og) {
    og.events = eventsMp;
    og.server = serverMp;
    og.players = playersMp;
    og.vehicles = vehiclesMp;
    og.commands = commandsMp;
    og.textLabels = textLabelsMp;
    og.Vector3 = Vector3;
})(exports.og || (exports.og = {}));

exports.CommandMp = CommandMp;
exports.PlayerMp = PlayerMp;
exports.ServerMp = ServerMp;
exports.TextLabelMp = TextLabelMp;
exports.Vector3 = Vector3;
exports.VehicleMp = VehicleMp;
