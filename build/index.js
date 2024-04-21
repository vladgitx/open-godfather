'use strict';

var EventEmitter = require('events');

/* eslint-disable @typescript-eslint/no-misused-promises */
class Dispatcher extends EventEmitter {
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
const dispatcher = new Dispatcher();

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
        return new Vector3(newX, newY, z ?? this.z);
    }
}

class SampNatives {
    constructor() {
        this.manualVehicleEngineAndLights = () => {
            return samp.callNative("ManualVehicleEngineAndLights", "");
        };
        this.setVehicleParamsEx = (vehicleId, engine, lights, alarm, doors, bonnet, boot, objective) => {
            return samp.callNative("SetVehicleParamsEx", "iiiiiiii", vehicleId, engine, lights, alarm, doors, bonnet, boot, objective) === 1;
        };
        this.setVehicleNumberPlate = (vehicleId, numberplate) => {
            return samp.callNative("SetVehicleNumberPlate", "is", vehicleId, numberplate) === 1;
        };
        this.getVehicleParamsEx = (vehicleId) => {
            if (!this.isValidVehicle(vehicleId)) {
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
        this.getServerTickRate = () => {
            return samp.callNative("GetServerTickRate", "");
        };
        this.getVehicleVelocity = (vehicleId) => {
            if (!this.isValidVehicle(vehicleId)) {
                return new Vector3();
            }
            const res = samp.callNative("GetVehicleVelocity", "iFFF", vehicleId);
            return new Vector3(res[0], res[1], res[2]);
        };
        this.getWeaponName = (weaponId) => {
            if (weaponId < exports.WeaponsEnum.Fist || weaponId > exports.WeaponsEnum.Collision) {
                return "invalid_weapon";
            }
            return samp.callNative("GetWeaponName", "iSi", weaponId, 32);
        };
        this.setVehicleVelocity = (vehicleId, velocity) => {
            return samp.callNative("SetVehicleVelocity", "ifff", vehicleId, velocity.x, velocity.y, velocity.z) === 1;
        };
        this.setPlayerSkillLevel = (playerId, skillType, level) => {
            return samp.callNative("SetPlayerSkillLevel", "iii", playerId, skillType, level) === 1;
        };
        this.setPlayerColor = (playerId, color) => {
            samp.callNative("SetPlayerColor", "ii", playerId, parseInt(color + "FF", 16));
        };
        this.setWeather = (weatherId) => {
            samp.callNative("SetWeather", "i", weatherId);
        };
        this.setWorldTime = (hour) => {
            samp.callNative("SetWorldTime", "i", hour);
        };
        this.setNameTagDrawDistance = (distance) => {
            samp.callNative("SetNameTagDrawDistance", "f", distance);
        };
        this.enableStuntBonusForAll = (enable) => {
            samp.callNative("EnableStuntBonusForAll", "i", enable ? 1 : 0);
        };
        this.sendRconCommand = (command) => {
            samp.callNative("SendRconCommand", "s", command);
        };
        this.changeVehicleColor = (vehicleId, color1, color2) => {
            return samp.callNative("ChangeVehicleColor", "iii", vehicleId, color1, color2) === 1;
        };
        this.setPlayerAttachedObject = (playerId, index, modelid, bone, fOffsetX = 0, fOffsetY = 0, fOffsetZ = 0, fRotX = 0, fRotY = 0, fRotZ = 0, fScaleX = 1, fScaleY = 1, fScaleZ = 1, materialcolor1, materialcolor2) => {
            const values = [playerId, index, modelid, bone, fOffsetX, fOffsetY, fOffsetZ, fRotX, fRotY, fRotZ, fScaleX, fScaleY, fScaleZ];
            if (materialcolor1 !== undefined) {
                values.push(parseInt(materialcolor1 + "FF", 16));
            }
            if (materialcolor2 !== undefined) {
                values.push(parseInt(materialcolor2 + "FF", 16));
            }
            return samp.callNative("SetPlayerAttachedObject", "iiiifffffffffii", ...values) === 1;
        };
        this.removePlayerAttachedObject = (playerId, index) => {
            return samp.callNative("RemovePlayerAttachedObject", "ii", playerId, index) === 1;
        };
        this.isPlayerAttachedObjectSlotUsed = (playerId, index) => {
            return samp.callNative("IsPlayerAttachedObjectSlotUsed", "ii", playerId, index) === 1;
        };
        this.editAttachedObject = (playerId, index) => {
            return samp.callNative("EditAttachedObject", "ii", playerId, index) === 1;
        };
        this.destroyVehicle = (vehicleId) => {
            return samp.callNative("DestroyVehicle", "i", vehicleId) === 1;
        };
        this.createVehicle = (modelId, position, rotation, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false) => {
            const vehicleId = samp.callNative("CreateVehicle", "iffffiiii", modelId, position.x, position.y, position.z, rotation, primaryColor, secondaryColor, respawnDelay, addSiren);
            if (vehicleId === 65535 || vehicleId === 0) {
                return undefined;
            }
            return vehicleId;
        };
        this.showPlayerDialog = (playerId, dialogId, styleId, caption, info, button1, button2) => {
            return samp.callNative("ShowPlayerDialog", "iiissss", playerId, dialogId, styleId, caption, info, button1, button2) === 1;
        };
        this.setPlayerTeam = (playerId, teamId) => {
            return samp.callNative("SetPlayerTeam", "ii", playerId, teamId) === 1;
        };
        this.create3DTextLabel = (text, color, X, Y, Z, DrawDistance, virtualworld, testLOS) => {
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
        this.delete3DTextLabel = (id) => {
            return samp.callNative("Delete3DTextLabel", "i", id) === 1;
        };
        this.attach3DTextLabelToPlayer = (id, playerId, OffsetX, OffsetY, OffsetZ) => {
            return samp.callNative("Attach3DTextLabelToPlayer", "iifff", id, playerId, OffsetX, OffsetY, OffsetZ) === 1;
        };
        this.attach3DTextLabelToVehicle = (id, vehicleId, OffsetX, OffsetY, OffsetZ) => {
            return samp.callNative("Attach3DTextLabelToVehicle", "iifff", id, vehicleId, OffsetX, OffsetY, OffsetZ) === 1;
        };
        this.update3DTextLabelText = (id, color, text) => {
            if (text) {
                samp.callNative("Update3DTextLabelText", "iis", id, parseInt(color + "FF", 16), text);
                return true;
            }
            return false;
        };
        this.setPlayerScore = (playerId, score) => {
            return samp.callNative("SetPlayerScore", "ii", playerId, score) === 1;
        };
        this.getPlayerScore = (playerId) => {
            if (!this.isPlayerConnected(playerId)) {
                return 0;
            }
            return samp.callNative("GetPlayerScore", "i", playerId);
        };
        this.isPlayerInRangeOfPoint = (playerId, range, x, y, z) => {
            return samp.callNative("IsPlayerInRangeOfPoint", "iffff", playerId, range, x, y, z) === 1;
        };
        this.setVehiclePosition = (vehicleId, x, y, z) => {
            return samp.callNative("SetVehiclePos", "ifff", vehicleId, x, y, z) === 1;
        };
        this.applyAnimation = (playerId, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync) => {
            samp.callNative("ApplyAnimation", "issfiiiiii", playerId, animlib, animname, fDelta, loop, lockx, locky, freeze, time, forcesync);
        };
        this.clearAnimations = (playerId, forcesync) => {
            samp.callNative("ClearAnimations", "ii", playerId, forcesync);
        };
        this.getPlayerAnimationIndex = (playerId) => {
            return samp.callNative("GetPlayerAnimationIndex", "i", playerId);
        };
        this.getAnimationName = (index) => {
            const res = samp.callNative("GetAnimationName", "iSiSi", index, 32, 32);
            if (res.length < 2) {
                return undefined;
            }
            return {
                library: res[0],
                name: res[1],
            };
        };
        this.getPlayerVehicleSeat = (playerId) => {
            const res = samp.callNative("GetPlayerVehicleSeat", "i", playerId);
            if (res === -1) {
                return undefined;
            }
            return res;
        };
        this.getPlayerSpecialAction = (playerId) => {
            return samp.callNative("GetPlayerSpecialAction", "i", playerId);
        };
        this.setPlayerSpecialAction = (playerId, actionId) => {
            return samp.callNative("SetPlayerSpecialAction", "ii", playerId, actionId) === 1;
        };
        this.gpci = (playerId) => {
            if (!this.isPlayerConnected(playerId)) {
                return "invalid_gpci";
            }
            return samp.callNative("gpci", "iSi", playerId, 61);
        };
        this.getPlayerIp = (playerId) => {
            if (!this.isPlayerConnected(playerId)) {
                return "255.255.255.255";
            }
            return samp.callNative("GetPlayerIp", "iSi", playerId, 17);
        };
        this.getPlayerPing = (playerId) => {
            return samp.callNative("GetPlayerPing", "i", playerId);
        };
        this.givePlayerMoney = (playerId, money) => {
            return samp.callNative("GivePlayerMoney", "ii", playerId, money) === 1;
        };
        this.resetPlayerMoney = (playerId) => {
            return samp.callNative("ResetPlayerMoney", "i", playerId) === 1;
        };
        this.givePlayerWeapon = (playerId, weaponId, ammo) => {
            return samp.callNative("GivePlayerWeapon", "iii", playerId, weaponId, ammo) === 1;
        };
        this.getPlayerWeapon = (playerId) => {
            if (!this.isPlayerConnected(playerId)) {
                return exports.WeaponsEnum.Fist;
            }
            return samp.callNative("GetPlayerWeapon", "i", playerId);
        };
        this.resetPlayerWeapons = (playerId) => {
            return samp.callNative("ResetPlayerWeapons", "i", playerId) === 1;
        };
        this.setPlayerArmedWeapon = (playerId, weaponId) => {
            return samp.callNative("SetPlayerArmedWeapon", "ii", playerId, weaponId) === 1;
        };
        this.setPlayerSkin = (playerId, skinId) => {
            return samp.callNative("SetPlayerSkin", "ii", playerId, skinId) === 1;
        };
        this.getVehiclePosition = (vehicleId) => {
            if (!this.isValidVehicle(vehicleId)) {
                return new Vector3();
            }
            const pos = samp.callNative("GetVehiclePos", "iFFF", vehicleId);
            return new Vector3(pos[0], pos[1], pos[2]);
        };
        this.getPlayerWeaponData = (playerId, slot) => {
            if (!this.isPlayerConnected(playerId)) {
                return undefined;
            }
            const res = samp.callNative("GetPlayerWeaponData", "iiII", playerId, slot);
            if (res.length < 2) {
                return undefined;
            }
            if (slot !== exports.WeaponSlotsEnum.Unarmed && res[0] === 0) {
                return undefined;
            }
            return {
                model: res[0],
                ammo: res[1],
            };
        };
        this.getPlayerCameraMode = (playerId) => {
            if (!this.isPlayerConnected(playerId)) {
                return exports.CameraModesEnum.FollowPed;
            }
            return samp.callNative("GetPlayerCameraMode", "i", playerId);
        };
        this.setVehicleZAngle = (vehicleId, angle) => {
            return samp.callNative("SetVehicleZAngle", "if", vehicleId, angle) === 1;
        };
        this.getVehicleZAngle = (vehicleId) => {
            if (!this.isValidVehicle(vehicleId)) {
                return 0;
            }
            return samp.callNative("GetVehicleZAngle", "iF", vehicleId);
        };
        this.setVehicleVirtualWorld = (vehicleId, worldId) => {
            return samp.callNative("SetVehicleVirtualWorld", "ii", vehicleId, worldId) === 1;
        };
        this.getVehicleVirtualWorld = (vehicleId) => {
            if (!this.isValidVehicle(vehicleId)) {
                return 0;
            }
            return samp.callNative("GetVehicleVirtualWorld", "i", vehicleId);
        };
        this.linkVehicleToInterior = (vehicleId, interiorId) => {
            return samp.callNative("LinkVehicleToInterior", "ii", vehicleId, interiorId) === 1;
        };
        this.getVehicleDistanceFromPoint = (vehicleId, x, y, z) => {
            if (!this.isValidVehicle(vehicleId)) {
                return Number.POSITIVE_INFINITY;
            }
            return samp.callNativeFloat("GetVehicleDistanceFromPoint", "ifff", vehicleId, x, y, z);
        };
        this.getPlayerDistanceFromPoint = (playerId, x, y, z) => {
            if (!this.isPlayerConnected(playerId)) {
                return Number.POSITIVE_INFINITY;
            }
            return samp.callNativeFloat("GetPlayerDistanceFromPoint", "ifff", playerId, x, y, z);
        };
        this.setPlayerChatBubble = (playerId, text, color, drawdistance, expiretime) => {
            return samp.callNative("SetPlayerChatBubble", "isifi", playerId, text, parseInt(color + "FF", 16), drawdistance, expiretime) === 1;
        };
    }
    hidePlayerDialog(playerId) {
        samp.callNative("HidePlayerDialog", "i", playerId);
    }
    setPlayerName(playerId, name) {
        return samp.callNative("SetPlayerName", "is", playerId, name) === 1;
    }
    setPlayerInterior(playerId, interior) {
        return samp.callNative("SetPlayerInterior", "ii", playerId, interior) === 1;
    }
    getPlayerInterior(playerId) {
        return samp.callNative("GetPlayerInterior", "i", playerId);
    }
    setPlayerVirtualWorld(playerId, world) {
        return samp.callNative("SetPlayerVirtualWorld", "ii", playerId, world) === 1;
    }
    getPlayerVirtualWorld(playerId) {
        return samp.callNative("GetPlayerVirtualWorld", "i", playerId);
    }
    setSpawnInfo(playerId, team, skinId, position, rotation, weapons = []) {
        const weapon1 = weapons[0]?.weapon ?? exports.WeaponsEnum.Fist;
        const weapon1ammo = weapons[0]?.ammo ?? 0;
        const weapon2 = weapons[1]?.weapon ?? exports.WeaponsEnum.Fist;
        const weapon2ammo = weapons[1]?.ammo ?? 0;
        const weapon3 = weapons[2]?.weapon ?? exports.WeaponsEnum.Fist;
        const weapon3ammo = weapons[2]?.ammo ?? 0;
        samp.callNative("SetSpawnInfo", "iiiffffiiiiii", playerId, team, skinId, position.x, position.y, position.z, rotation, weapon1, weapon1ammo, weapon2, weapon2ammo, weapon3, weapon3ammo);
    }
    kick(playerId) {
        samp.callNative("Kick", "i", playerId);
    }
    spawnPlayer(playerId) {
        return samp.callNative("SpawnPlayer", "i", playerId) === 1;
    }
    togglePlayerSpectating(playerId, toggle) {
        return samp.callNative("TogglePlayerSpectating", "ii", playerId, toggle ? 1 : 0) === 1;
    }
    sendClientMessage(playerId, color, message) {
        if (message.length > 90) {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`);
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), `... ${message.slice(90)}`);
        }
        else {
            samp.callNative("SendClientMessage", "iis", playerId, parseInt(color + "FF", 16), message);
        }
    }
    getPlayerName(playerId) {
        if (!this.isPlayerConnected(playerId)) {
            return "invalid_name";
        }
        return samp.callNative("GetPlayerName", "iSi", playerId, 24);
    }
    isPlayerConnected(playerId) {
        return samp.callNative("IsPlayerConnected", "i", playerId) === 1;
    }
    getPlayerPosition(playerId) {
        if (!this.isPlayerConnected(playerId)) {
            return new Vector3();
        }
        const pos = samp.callNative("GetPlayerPos", "iFFF", playerId);
        return new Vector3(pos[0], pos[1], pos[2]);
    }
    setPlayerPosition(playerId, x, y, z) {
        return samp.callNative("SetPlayerPos", "ifff", playerId, x, y, z) === 1;
    }
    setPlayerHealth(playerId, health) {
        return samp.callNative("SetPlayerHealth", "if", playerId, health) === 1;
    }
    getPlayerHealth(playerId) {
        if (!this.isPlayerConnected(playerId)) {
            return 100;
        }
        return samp.callNative("GetPlayerHealth", "iF", playerId);
    }
    setPlayerArmour(playerId, armour) {
        return samp.callNative("SetPlayerArmour", "if", playerId, armour) === 1;
    }
    getPlayerArmour(playerId) {
        if (!this.isPlayerConnected(playerId)) {
            return 0;
        }
        return samp.callNative("GetPlayerArmour", "iF", playerId);
    }
    putPlayerInVehicle(playerId, vehicleId, seat = exports.VehicleSeatsEnum.Driver) {
        return samp.callNative("PutPlayerInVehicle", "iii", playerId, vehicleId, seat) === 1;
    }
    getPlayerVehicleId(playerId) {
        const vehicleId = samp.callNative("GetPlayerVehicleID", "i", playerId);
        if (vehicleId === 0) {
            return undefined;
        }
        return vehicleId;
    }
    getPlayerState(playerId) {
        if (!this.isPlayerConnected(playerId)) {
            return undefined;
        }
        return samp.callNative("GetPlayerState", "i", playerId);
    }
    setPlayerRotation(playerId, rotation) {
        return samp.callNative("SetPlayerFacingAngle", "if", playerId, rotation) === 1;
    }
    getPlayerRotation(playerId) {
        if (!this.isPlayerConnected(playerId)) {
            return 0;
        }
        return samp.callNative("GetPlayerFacingAngle", "iF", playerId);
    }
    sendClientMessageToAll(color, message) {
        if (message.length > 90) {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `${message.slice(0, 90)} ...`);
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), `... ${message.slice(90)}`);
        }
        else {
            samp.callNative("SendClientMessageToAll", "is", parseInt(color + "FF", 16), message);
        }
    }
    getVehicleModel(vehicleId) {
        const modelId = samp.callNative("GetVehicleModel", "i", vehicleId);
        if (modelId === 0) {
            return undefined;
        }
        return modelId;
    }
    getVehicleHealth(vehicleId) {
        if (!this.isValidVehicle(vehicleId)) {
            return 1000;
        }
        return samp.callNative("GetVehicleHealth", "iF", vehicleId);
    }
    setVehicleHealth(vehicleId, health) {
        return samp.callNative("SetVehicleHealth", "if", vehicleId, health) === 1;
    }
    isValidVehicle(vehicleId) {
        return samp.callNative("IsValidVehicle", "i", vehicleId) === 1;
    }
}
const sampNatives = new SampNatives();

class NativeEvents {
    onPlayerConnect(callback) {
        samp.on("OnPlayerConnect", callback);
    }
    onPlayerDisconnect(callback) {
        samp.on("OnPlayerDisconnect", callback);
    }
    onPlayerSpawn(callback) {
        samp.on("OnPlayerSpawn", callback);
    }
    onPlayerDeath(callback) {
        samp.on("OnPlayerDeath", callback);
    }
    onPlayerText(callback) {
        samp.on("OnPlayerText", callback);
    }
    onPlayerCommandText(callback) {
        samp.on("OnPlayerCommandText", callback);
    }
    onPlayerRequestClass(callback) {
        samp.on("OnPlayerRequestClass", callback);
    }
    onPlayerEnterVehicle(callback) {
        samp.on("OnPlayerEnterVehicle", callback);
    }
    onPlayerExitVehicle(callback) {
        samp.on("OnPlayerExitVehicle", callback);
    }
    onPlayerStateChange(callback) {
        samp.on("OnPlayerStateChange", callback);
    }
    onPlayerTakeDamage(callback) {
        samp.on("OnPlayerTakeDamage", callback);
    }
    onPlayerWeaponShot(callback) {
        samp.on("OnPlayerWeaponShot", callback);
    }
    onDialogResponse(callback) {
        samp.on("OnDialogResponse", callback);
    }
    onGameModeExit(callback) {
        samp.on("OnGameModeExit", callback);
    }
    onGameModeInit(callback) {
        samp.on("OnGameModeInit", callback);
    }
}
const nativeEvents = new NativeEvents();

nativeEvents.onGameModeInit(() => {
    dispatcher.emit("init");
});

nativeEvents.onGameModeExit(() => {
    dispatcher.emit("exit");
});

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
            position: new Vector3(0, 0, 3),
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

class Entity {
    constructor(id) {
        this.id = id;
        this.variables = new Map();
        this.cleanupCallbacks = [];
    }
    onCleanup(callback) {
        this.cleanupCallbacks.push(callback);
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
        for (const callback of this.cleanupCallbacks) {
            callback();
        }
        this.cleanupCallbacks = [];
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
        sampNatives.setVehicleParamsEx(vehicle.id, this._engine === "on", this._lights === "on", this._alarm === "on", this._doors === "locked", this._bonnet === "open", this._boot === "open", this._objective === "on");
    }
    set engine(value) {
        this._engine = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, this._engine === "on", params.lights, params.alarm, params.doors, params.bonnet, params.boot, params.objective);
    }
    get engine() {
        return this._engine;
    }
    set lights(value) {
        this._lights = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, this._lights === "on", params.alarm, params.doors, params.bonnet, params.boot, params.objective);
    }
    get lights() {
        return this._lights;
    }
    set alarm(value) {
        this._alarm = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, this._alarm === "on", params.doors, params.bonnet, params.boot, params.objective);
    }
    get alarm() {
        return this._alarm;
    }
    set doors(value) {
        this._doors = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, this._doors === "locked", params.bonnet, params.boot, params.objective);
    }
    get doors() {
        return this._doors;
    }
    set hood(value) {
        this._bonnet = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, params.doors, this._bonnet === "open", params.boot, params.objective);
    }
    get hood() {
        return this._bonnet;
    }
    set trunk(value) {
        this._boot = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, params.doors, params.bonnet, this._boot === "open", params.objective);
    }
    get trunk() {
        return this._boot;
    }
    set objective(value) {
        this._objective = value;
        const params = sampNatives.getVehicleParamsEx(this.vehicle.id);
        sampNatives.setVehicleParamsEx(this.vehicle.id, params.engine, params.lights, params.alarm, params.doors, params.bonnet, params.boot, this._objective === "on");
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
        if (!sampNatives.attach3DTextLabelToVehicle(label.id, this.vehicle.id, offset.x, offset.y, offset.z)) {
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
        sampNatives.linkVehicleToInterior(this.id, this._interior);
        sampNatives.setVehicleNumberPlate(this.id, this._plate);
    }
    set position(position) {
        sampNatives.setPlayerPosition(this.id, position.x, position.y, position.z);
    }
    get position() {
        return sampNatives.getPlayerPosition(this.id);
    }
    set velocity(velocity) {
        sampNatives.setVehicleVelocity(this.id, velocity);
    }
    get velocity() {
        return sampNatives.getVehicleVelocity(this.id);
    }
    set rotation(angle) {
        sampNatives.setVehicleZAngle(this.id, angle);
    }
    get rotation() {
        return sampNatives.getVehicleZAngle(this.id);
    }
    set world(value) {
        sampNatives.setVehicleVirtualWorld(this.id, value);
    }
    get world() {
        return sampNatives.getVehicleVirtualWorld(this.id);
    }
    set interior(interior) {
        this._interior = interior;
        sampNatives.linkVehicleToInterior(this.id, interior);
    }
    get interior() {
        return this._interior;
    }
    set health(health) {
        sampNatives.setVehicleHealth(this.id, health);
    }
    get health() {
        return sampNatives.getVehicleHealth(this.id);
    }
    set primaryColor(color) {
        this._primaryColor = color;
        sampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor);
    }
    get primaryColor() {
        return this._primaryColor;
    }
    set secondaryColor(color) {
        this._secondaryColor = color;
        sampNatives.changeVehicleColor(this.id, this._primaryColor, this._secondaryColor);
    }
    get secondaryColor() {
        return this._secondaryColor;
    }
    set plate(plate) {
        this._plate = plate;
        sampNatives.setVehicleNumberPlate(this.id, plate);
    }
    get plate() {
        return this._plate;
    }
}

class VehicleFactory {
    constructor() {
        this.pool = new Map();
    }
    new(vehicleId, model, primaryColor, secondaryColor) {
        if (this.at(vehicleId)) {
            return undefined;
        }
        const vehicle = new VehicleMp(vehicleId, model, primaryColor, secondaryColor);
        this.pool.set(vehicleId, vehicle);
        return vehicle;
    }
    destroy(vehicle) {
        this.pool.delete(vehicle.id);
        vehicle.exists = false;
    }
    at(id) {
        return this.pool.get(id);
    }
    get all() {
        return this.pool.values();
    }
}
const vehicleFactory = new VehicleFactory();

class VehicleHandler {
    new(model, position, rotation, primaryColor = CONFIG.vehicle.primaryColor, secondaryColor = CONFIG.vehicle.secondaryColor, respawnDelay = CONFIG.vehicle.respawnDelay, siren = CONFIG.vehicle.siren) {
        const vehicleId = sampNatives.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren);
        if (vehicleId === undefined) {
            return undefined;
        }
        return vehicleFactory.new(vehicleId, model, primaryColor, secondaryColor);
    }
    destroy(vehicle) {
        sampNatives.destroyVehicle(vehicle.id);
        vehicleFactory.destroy(vehicle);
    }
    at(id) {
        return vehicleFactory.at(id);
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
        return vehicleFactory.all;
    }
}
const vehicleHandler = new VehicleHandler();

class PlayerAnimations {
    constructor(player) {
        this.player = player;
    }
    set(library, name, speed, loop, lockX, lockY, freeze, time, forceSync = true) {
        sampNatives.applyAnimation(this.player.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync);
    }
    clear() {
        sampNatives.clearAnimations(this.player.id, true);
    }
    get currentIndex() {
        return sampNatives.getPlayerAnimationIndex(this.player.id);
    }
}

class PlayerDialogFactory {
    constructor() {
        this.promises = new Map();
    }
    async new(player) {
        const existing = this.promises.get(player.id);
        if (existing) {
            existing(undefined);
        }
        return new Promise((resolve) => {
            this.promises.set(player.id, resolve);
        });
    }
    destroy(player, response) {
        const existing = this.promises.get(player.id);
        if (existing) {
            existing(response);
        }
        this.promises.delete(player.id);
    }
}
const playerDialogFactory = new PlayerDialogFactory();

class PlayerDialog {
    constructor(player) {
        this.player = player;
        this.show = new PlayerDialogShow(this.player);
    }
    hide(response) {
        playerDialogFactory.destroy(this.player, response);
        sampNatives.hidePlayerDialog(this.player.id);
    }
}
class PlayerDialogShow {
    constructor(player) {
        this.player = player;
    }
    async list(caption, items, primaryButton, secondaryButton = "") {
        sampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.List, caption, items.join("\n"), primaryButton, secondaryButton);
        return playerDialogFactory.new(this.player);
    }
    async tablist(caption, items, primaryButton, secondaryButton = "") {
        sampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.Tablist, caption, items.map((columns) => columns.join("\t")).join("\n"), primaryButton, secondaryButton);
        return playerDialogFactory.new(this.player);
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
        sampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.TablistHeaders, caption, headerString + "\n" + itemsString, primaryButton, secondaryButton);
        return playerDialogFactory.new(this.player);
    }
    async messageBox(caption, info, primaryButton, secondaryButton = "") {
        sampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.MessageBox, caption, info, primaryButton, secondaryButton);
        return playerDialogFactory.new(this.player);
    }
    async input(caption, info, primaryButton, secondaryButton = "") {
        sampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.Input, caption, info, primaryButton, secondaryButton);
        return playerDialogFactory.new(this.player);
    }
    async password(caption, info, primaryButton, secondaryButton = "") {
        sampNatives.showPlayerDialog(this.player.id, Math.floor(Math.random() * 32767), exports.DialogStylesEnum.Password, caption, info, primaryButton, secondaryButton);
        return playerDialogFactory.new(this.player);
    }
}

class PlayerWeapons {
    constructor(player) {
        this.player = player;
    }
    setSkill(weapon, level) {
        return sampNatives.setPlayerSkillLevel(this.player.id, weapon, level);
    }
    add(weapon, ammo) {
        return sampNatives.givePlayerWeapon(this.player.id, weapon, ammo);
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
        return sampNatives.resetPlayerWeapons(this.player.id);
    }
    at(slot) {
        return sampNatives.getPlayerWeaponData(this.player.id, slot);
    }
    set holding(weapon) {
        sampNatives.setPlayerArmedWeapon(this.player.id, weapon);
    }
    get holding() {
        return sampNatives.getPlayerWeapon(this.player.id);
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

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    if ((newState === exports.PlayerStatesEnum.Passenger || newState === exports.PlayerStatesEnum.Driver) &&
        oldState !== exports.PlayerStatesEnum.Passenger &&
        oldState !== exports.PlayerStatesEnum.Driver) {
        const currentVehicle = player.vehicle;
        if (currentVehicle === undefined) {
            return;
        }
        player.setVariable("internal::lastVehicleId", currentVehicle.id);
        dispatcher.emit("playerEnterVehicle", player, currentVehicle);
    }
    else if ((oldState === exports.PlayerStatesEnum.Passenger || oldState === exports.PlayerStatesEnum.Driver) &&
        newState !== exports.PlayerStatesEnum.Passenger &&
        newState !== exports.PlayerStatesEnum.Driver) {
        const lastVehicleId = player.getVariable("internal::lastVehicleId");
        if (lastVehicleId === undefined) {
            return;
        }
        player.deleteVariable("internal::lastVehicleId");
        dispatcher.emit("playerExitVehicle", player, vehicleHandler.at(lastVehicleId));
    }
});
function putInVehicleWithEvent(player, vehicle, seat) {
    const oldVehicle = player.vehicle;
    if (!oldVehicle || oldVehicle === vehicle) {
        return sampNatives.putPlayerInVehicle(player.id, vehicle.id, seat);
    }
    dispatcher.emit("playerExitVehicle", player, oldVehicle);
    sampNatives.putPlayerInVehicle(player.id, vehicle.id, seat);
    dispatcher.emit("playerEnterVehicle", player, vehicle);
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
        if (!sampNatives.attach3DTextLabelToPlayer(label.id, this.player.id, offset.x, offset.y, offset.z)) {
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
        const success = sampNatives.setPlayerAttachedObject(this.player.id, slot, model, bone, offset?.x, offset?.y, offset?.z, rotation?.x, rotation?.y, rotation?.z, scale?.x, scale?.y, scale?.z, firstMaterialColor, secondMaterialColor);
        if (success) {
            this.attachedObjects[slot] = new PlayerAttachedObject(slot, model, bone, offset ?? new Vector3(0, 0, 0), rotation ?? new Vector3(0, 0, 0), scale ?? new Vector3(1, 1, 1), firstMaterialColor ?? "", secondMaterialColor ?? "");
            return this.attachedObjects[slot];
        }
        return undefined;
    }
    destroy(object) {
        sampNatives.removePlayerAttachedObject(this.player.id, object.id);
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
        this._name = sampNatives.getPlayerName(this.id);
        this._color = CONFIG.player.color;
        this._cash = CONFIG.player.cash;
        this._skin = CONFIG.player.skin;
        this._spectating = true;
        sampNatives.setPlayerColor(this.id, this._color);
        sampNatives.givePlayerMoney(this.id, this._cash);
        sampNatives.setPlayerSkin(this.id, this._skin);
        sampNatives.setPlayerTeam(this.id, CONFIG.player.team);
        sampNatives.togglePlayerSpectating(this.id, this._spectating);
    }
    sendMessage(message, color = CONFIG.message.color) {
        sampNatives.sendClientMessage(this.id, color, message);
    }
    spawn(position = CONFIG.player.spawn.position, rotation = CONFIG.player.spawn.rotation, world = CONFIG.player.spawn.world, interior = CONFIG.player.spawn.interior) {
        if (!this.spectating) {
            if (this.state === exports.PlayerStatesEnum.Wasted) {
                // If in class selection
                sampNatives.spawnPlayer(this.id);
            }
            return;
        }
        this.world = world;
        this.interior = interior;
        sampNatives.setSpawnInfo(this.id, CONFIG.player.team, this.skin, position, rotation);
        this.spectating = false;
    }
    kick(delay = 10) {
        if (delay <= 0) {
            sampNatives.kick(this.id);
            return;
        }
        setTimeout(() => {
            sampNatives.kick(this.id);
        }, delay);
    }
    set spectating(spectating) {
        this._spectating = spectating;
        sampNatives.togglePlayerSpectating(this.id, spectating);
    }
    get spectating() {
        return this._spectating;
    }
    set position(position) {
        sampNatives.setPlayerPosition(this.id, position.x, position.y, position.z);
    }
    get position() {
        return sampNatives.getPlayerPosition(this.id);
    }
    set specialAction(action) {
        sampNatives.setPlayerSpecialAction(this.id, action);
    }
    get specialAction() {
        return sampNatives.getPlayerSpecialAction(this.id);
    }
    set skin(skin) {
        this._skin = skin;
        sampNatives.setPlayerSkin(this.id, skin);
    }
    get skin() {
        return this._skin;
    }
    set rotation(rotation) {
        sampNatives.setPlayerRotation(this.id, rotation);
    }
    get rotation() {
        return sampNatives.getPlayerRotation(this.id);
    }
    set name(name) {
        this._name = name;
        sampNatives.setPlayerName(this.id, name);
    }
    get name() {
        return this._name;
    }
    set world(value) {
        sampNatives.setPlayerVirtualWorld(this.id, value);
    }
    get world() {
        return sampNatives.getPlayerVirtualWorld(this.id);
    }
    set interior(value) {
        sampNatives.setPlayerInterior(this.id, value);
    }
    get interior() {
        return sampNatives.getPlayerInterior(this.id);
    }
    set health(value) {
        sampNatives.setPlayerHealth(this.id, value);
    }
    get health() {
        return sampNatives.getPlayerHealth(this.id);
    }
    set armour(value) {
        sampNatives.setPlayerArmour(this.id, value);
    }
    get armour() {
        return sampNatives.getPlayerArmour(this.id);
    }
    set color(hex) {
        this._color = hex;
        sampNatives.setPlayerColor(this.id, hex);
    }
    get color() {
        return this._color;
    }
    get ip() {
        return sampNatives.getPlayerIp(this.id);
    }
    get ping() {
        return sampNatives.getPlayerPing(this.id);
    }
    get gpci() {
        return sampNatives.gpci(this.id);
    }
    set cash(value) {
        sampNatives.resetPlayerMoney(this.id);
        sampNatives.givePlayerMoney(this.id, value);
        this._cash = value;
    }
    get cash() {
        return this._cash;
    }
    set score(value) {
        sampNatives.setPlayerScore(this.id, value);
    }
    get score() {
        return sampNatives.getPlayerScore(this.id);
    }
    get cameraMode() {
        return sampNatives.getPlayerCameraMode(this.id);
    }
    setChatBubble(text, color = CONFIG.chatBubble.color, drawDistance = CONFIG.chatBubble.distance, expireTime = CONFIG.chatBubble.expire) {
        return sampNatives.setPlayerChatBubble(this.id, text, color, drawDistance, expireTime);
    }
    get spawned() {
        const state = this.state;
        if (state === undefined) {
            return undefined;
        }
        return state !== exports.PlayerStatesEnum.Wasted && state !== exports.PlayerStatesEnum.Spectating && state !== exports.PlayerStatesEnum.None;
    }
    get state() {
        return sampNatives.getPlayerState(this.id);
    }
    putIntoVehicle(vehicle, seat = exports.VehicleSeatsEnum.Driver) {
        return putInVehicleWithEvent(this, vehicle, seat);
    }
    get vehicle() {
        const vehicleId = sampNatives.getPlayerVehicleId(this.id);
        if (vehicleId === undefined) {
            return undefined;
        }
        return vehicleHandler.at(vehicleId);
    }
    get vehicleSeat() {
        return sampNatives.getPlayerVehicleSeat(this.id);
    }
}

class PlayerFactory {
    constructor() {
        this.pool = new Map();
    }
    new(id) {
        if (this.at(id)) {
            return undefined;
        }
        const player = new PlayerMp(id);
        this.pool.set(id, player);
        return player;
    }
    destroy(player) {
        this.pool.delete(player.id);
        player.exists = false;
    }
    at(id) {
        return this.pool.get(id);
    }
    get all() {
        return this.pool.values();
    }
}
const playerFactory = new PlayerFactory();

// TODO: find the actual issue and fix it
// Weird issue: if you kick a player in the "playerConnect" event, they get a crash/timeout
// So I'm fixing it by triggering "playerConnect" with a little bit of delay
const playerTimeoutIds = new Map();
nativeEvents.onPlayerConnect((playerId) => {
    sampNatives.togglePlayerSpectating(playerId, true); // TODO: remove this when the issue is fixed
    const timeoutId = setTimeout(() => {
        playerTimeoutIds.delete(playerId);
        const player = playerFactory.new(playerId);
        if (player) {
            dispatcher.emit("playerConnect", player);
        }
    }, 1000);
    playerTimeoutIds.set(playerId, timeoutId);
});
nativeEvents.onPlayerDisconnect((playerId, reason) => {
    clearTimeout(playerTimeoutIds.get(playerId));
    playerTimeoutIds.delete(playerId);
    const player = playerFactory.at(playerId);
    if (player) {
        dispatcher.emit("playerDisconnect", player, reason);
        playerFactory.destroy(player);
    }
});

class PlayerHandler {
    at(id) {
        return playerFactory.at(id);
    }
    broadcast(message, color = CONFIG.message.color) {
        sampNatives.sendClientMessageToAll(color, message);
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
        return playerFactory.all;
    }
}
const playerHandler = new PlayerHandler();

nativeEvents.onPlayerSpawn((playerId) => {
    const player = playerHandler.at(playerId);
    if (player === undefined) {
        return;
    }
    sampNatives.setPlayerTeam(playerId, CONFIG.player.team);
    if (player.getVariable("internal::firstSpawn") === undefined) {
        player.setVariable("internal::firstSpawn", true);
        dispatcher.emit("playerFirstSpawn", player);
    }
    dispatcher.emit("playerSpawn", player);
});
nativeEvents.onPlayerRequestClass((playerId) => {
    const player = playerHandler.at(playerId);
    if (player !== undefined) {
        player.spawn();
    }
});
nativeEvents.onPlayerText((playerId, text) => {
    const player = playerHandler.at(playerId);
    if (player !== undefined) {
        dispatcher.emit("playerText", player, text);
    }
    return 0;
});
nativeEvents.onPlayerStateChange((playerId, newState, oldState) => {
    const player = playerHandler.at(playerId);
    if (player !== undefined) {
        dispatcher.emit("playerStateChange", player, newState, oldState);
    }
});
nativeEvents.onPlayerEnterVehicle((playerId, vehicleId, asPassenger) => {
    const player = playerHandler.at(playerId);
    const vehicle = vehicleHandler.at(vehicleId);
    if (player !== undefined && vehicle !== undefined) {
        dispatcher.emit("playerStartEnterVehicle", player, vehicle, asPassenger);
    }
});
nativeEvents.onPlayerExitVehicle((playerId, vehicleId) => {
    const player = playerHandler.at(playerId);
    const vehicle = vehicleHandler.at(vehicleId);
    if (player !== undefined && vehicle !== undefined) {
        dispatcher.emit("playerStartExitVehicle", player, vehicle);
    }
});
nativeEvents.onPlayerDeath((playerId, killerId, weapon) => {
    const player = playerHandler.at(playerId);
    if (player) {
        dispatcher.emit("playerDeath", player, playerHandler.at(killerId), weapon);
    }
});
nativeEvents.onPlayerTakeDamage((playerId, issuerId, amount, weapon, bodyPart) => {
    const player = playerHandler.at(playerId);
    if (player) {
        dispatcher.emit("playerDamage", player, playerHandler.at(issuerId), amount, weapon, bodyPart);
    }
});
nativeEvents.onPlayerWeaponShot((playerId, weapon, hitType, hitId, fX, fY, fZ) => {
    const player = playerHandler.at(playerId);
    if (player) {
        const hitEntity = hitType === exports.HitTypesEnum.Player
            ? playerHandler.at(hitId)
            : hitType === exports.HitTypesEnum.Vehicle
                ? vehicleHandler.at(hitId)
                : undefined;
        dispatcher.emit("playerShoot", player, weapon, hitEntity, new Vector3(fX, fY, fZ));
    }
    return 1;
});

nativeEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playerHandler.at(playerId);
    if (player) {
        playerDialogFactory.destroy(player, { action: responseParam, item: listItemParam, input: inputText });
    }
});
dispatcher.on("playerDisconnect", (player) => {
    playerDialogFactory.destroy(player, undefined);
});

class TextLabelMp extends Entity {
    constructor(id, text, color) {
        super(id);
        this.attached = false;
        this._text = text;
        this._color = color;
    }
    set text(text) {
        if (sampNatives.update3DTextLabelText(this.id, this._color, text)) {
            this._text = text;
        }
    }
    get text() {
        return this._text;
    }
}

class TextLabelFactory {
    constructor() {
        this.pool = new Map();
    }
    new(id, text, color) {
        if (this.at(id)) {
            return undefined;
        }
        const label = new TextLabelMp(id, text, color);
        this.pool.set(id, label);
        return label;
    }
    destroy(label) {
        this.pool.delete(label.id);
        label.exists = false;
    }
    at(id) {
        return this.pool.get(id);
    }
}
const textLabelFactory = new TextLabelFactory();

class TextLabelHandler {
    new(text, color, position, drawDistance = CONFIG.textLabel.distance, world = CONFIG.textLabel.world, testLos = CONFIG.textLabel.testLos) {
        const labelId = sampNatives.create3DTextLabel(text, color, position.x, position.y, position.z, drawDistance, world, testLos);
        if (labelId === undefined) {
            return undefined;
        }
        return textLabelFactory.new(labelId, text, color);
    }
    destroy(label) {
        sampNatives.delete3DTextLabel(label.id);
        textLabelFactory.destroy(label);
    }
    at(id) {
        return textLabelFactory.at(id);
    }
}
const textLabelHandler = new TextLabelHandler();

dispatcher.on("playerDisconnect", (player) => {
    for (const label of player.textLabels.all) {
        textLabelHandler.destroy(label);
    }
});

dispatcher.on("playerEnterVehicle", (player, vehicle) => {
    vehicle.occupants.add(player);
});
dispatcher.on("playerExitVehicle", (player, vehicle) => {
    vehicle?.occupants.delete(player);
});
dispatcher.on("playerDisconnect", (player) => {
    player.vehicle?.occupants.delete(player);
});

sampNatives.manualVehicleEngineAndLights();

dispatcher.on("vehicleDestroy", (vehicle) => {
    for (const label of vehicle.textLabels.all) {
        textLabelHandler.destroy(label);
    }
});

class CommandMp {
    constructor(name, aliases, callback) {
        this.name = name;
        this.aliases = aliases;
        this.callback = callback;
    }
}

class CommandFactory {
    constructor() {
        this.pool = new Map();
        this.new = (name, aliases, callback) => {
            if (aliases.includes(name)) {
                throw new Error(`Command ${name} cannot be an alias of itself`);
            }
            if (this.at(name)) {
                // It throws a TypeError at runtime if the function is not an arrow function
                throw new Error(`Command ${name} already exists`);
            }
            for (const alias of aliases) {
                if (this.at(alias)) {
                    throw new Error(`You're using alias ${alias} for command ${name}, but that alias already exists as another command`);
                }
            }
            for (const command of this.all) {
                if (command.aliases.includes(name)) {
                    throw new Error(`Command name ${name} is used as an alias for command ${command.name}`);
                }
                if (aliases.some((alias) => command.aliases.includes(alias))) {
                    throw new Error(`Command ${name} shares the same aliases as command ${command.name}`);
                }
            }
            const command = new CommandMp(name, aliases, callback);
            this.pool.set(name, command);
            for (const alias of aliases) {
                this.pool.set(alias, command);
            }
            return command;
        };
    }
    at(name) {
        return this.pool.get(name);
    }
    get all() {
        return this.pool.values();
    }
}
const commandFactory = new CommandFactory();

nativeEvents.onPlayerCommandText((playerId, cmdText) => {
    const player = playerHandler.at(playerId);
    if (!player) {
        return 1;
    }
    const params = cmdText.trim().split(/\s+/);
    const commandStr = params[0].toLowerCase();
    params.shift();
    if (commandStr === "/") {
        return 1;
    }
    const command = commandFactory.at(commandStr);
    if (command) {
        dispatcher.emit("playerCommand", player, commandStr, command, () => command.callback(player, ...params));
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        dispatcher.emit("playerCommand", player, commandStr, undefined, () => { });
    }
    return 1;
});

class MultiplayerServer {
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
    sendRconCommand(command) {
        sampNatives.sendRconCommand(command);
    }
    set name(name) {
        this._name = name;
        sampNatives.sendRconCommand("name " + this._name);
    }
    get name() {
        return this._name;
    }
    set language(language) {
        this._language = language;
        sampNatives.sendRconCommand("language " + this._language);
    }
    get language() {
        return this._language;
    }
    set website(website) {
        this._website = website;
        sampNatives.sendRconCommand("website " + this._website);
    }
    get website() {
        return this._website;
    }
    set map(map) {
        this._map = map;
        sampNatives.sendRconCommand("game.map " + this._map);
    }
    get map() {
        return this._map;
    }
    set mode(mode) {
        this._mode = mode;
        sampNatives.sendRconCommand("game.mode " + this._mode);
    }
    get mode() {
        return this._mode;
    }
    set stuntBonuses(stuntBonuses) {
        this._stuntBonuses = stuntBonuses;
        sampNatives.enableStuntBonusForAll(this._stuntBonuses);
    }
    get stuntBonuses() {
        return this._stuntBonuses;
    }
    set nameTagDistance(nameTagDistance) {
        this._nameTagDistance = nameTagDistance;
        sampNatives.setNameTagDrawDistance(this._nameTagDistance);
    }
    get nameTagDistance() {
        return this._nameTagDistance;
    }
    set hour(hour) {
        this._hour = hour;
        sampNatives.setWorldTime(this._hour);
    }
    get hour() {
        return this._hour;
    }
    set weather(weather) {
        this._weather = weather;
        sampNatives.setWeather(this._weather);
    }
    get weather() {
        return this._weather;
    }
    get tickRate() {
        return sampNatives.getServerTickRate();
    }
}
const mpServer = new MultiplayerServer();

class CommandHandler {
    constructor() {
        this.add = commandFactory.new;
        this.all = commandFactory.all;
    }
}
const commandHandler = new CommandHandler();

var ogExport = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Vector3: Vector3,
    commands: commandHandler,
    events: dispatcher,
    players: playerHandler,
    server: mpServer,
    textLabels: textLabelHandler,
    vehicles: vehicleHandler
});

exports.og = ogExport;
