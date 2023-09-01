export enum WeaponEnum {
    FIST = 0,
    BRASS_KNUCKLES = 1,
    GOLF_CLUB = 2,
    NITE_STICK = 3,
    KNIFE = 4,
    BAT = 5,
    SHOVEL = 6,
    POOL_STICK = 7,
    KATANA = 8,
    CHAINSAW = 9,
    DILDO = 10,
    DILDO2 = 11,
    VIBRATOR = 12,
    VIBRATOR2 = 13,
    FLOWER = 14,
    CANE = 15,
    GRENADE = 16,
    TEARGAS = 17,
    MOLOTOV_COCKTAIL = 18,
    COLT_45 = 22,
    SILENCED = 23,
    DEAGLE = 24,
    SHOTGUN = 25,
    SAWNOFF_SHOTGUN = 26,
    SPAS12_SHOTGUN = 27,
    UZI = 28,
    MP5 = 29,
    AK47 = 30,
    M4 = 31,
    TEC9 = 32,
    RIFLE = 33,
    SNIPER = 34,
    ROCKET_LAUNCHER = 35,
    HEAT_SEEKER = 36,
    FLAMETHROWER = 37,
    MINIGUN = 38,
    SATCHEL = 39,
    BOMB = 40,
    SPRAY_CAN = 41,
    FIRE_EXTINGUISHER = 42,
    CAMERA = 43,
    NIGHT_VISION_GOGGLES = 44,
    THERMAL_GOGGLES = 45,
    PARACHUTE = 46,
    VEHICLE = 49,
    DROWN = 53,
    COLLISION = 54,
}

export enum DialogStyleEnum {
    MSGBOX = 0,
    INPUT = 1,
    LIST = 2,
    PASSWORD = 3,
    TABLIST = 4,
    TABLIST_HEADERS = 5,
}

export enum BodyPartEnum {
    TORSO = 3,
    GROIN = 4,
    LEFT_ARM = 5,
    RIGHT_ARM = 6,
    LEFT_LEG = 7,
    RIGHT_LEG = 8,
    HEAD = 9,
}

export enum PlayerStateEnum {
    NONE = 0,
    ON_FOOT = 1,
    DRIVER = 2,
    PASSENGER = 3,
    EXIT_VEHICLE = 4, // (used internally)
    ENTER_VEHICLE_DRIVER = 5, // (used internally)
    ENTER_VEHICLE_PASSENGER = 6, // (used internally)
    WASTED = 7,
    SPAWNED = 8,
    SPECTATING = 9,
}

export enum KickReasonEnum {
    CRASH = 0,
    QUIT = 1,
    KICK = 2,
    CUSTOM = 3,
    MODE_END = 4,
}

export enum SpecialActionEnum {
    NONE = 0,
    DUCK = 1,
    USE_JETPACK = 2,
    ENTER_VEHICLE = 3,
    EXIT_VEHICLE = 4,
    DANCE_1 = 5,
    DANCE_2 = 6,
    DANCE_3 = 7,
    DANCE_4 = 8,
    HANDS_UP = 10,
    USE_CELLPHONE = 11,
    SITTING = 12,
    STOP_USE_CELLPHONE = 13,
    DRINK_BEER = 20,
    SMOKE_CIGGY = 21,
    DRINK_WINE = 22,
    DRINK_SPRUNK = 23,
    CUFFED = 24,
    CARRY = 25,
    PISSING = 68,
}

export enum FightStyleEnum {
    NORMAL = 4,
    BOXING = 5,
    KUNG_FU = 6,
    KNEE_HEAD = 7,
    GRAB_KICK = 15,
    ELBOW = 16
}

export enum WeaponSkillEnum {
    PISTOL = 0,
    PISTOL_SILENCED = 1,
    DESERT_EAGLE = 2,
    SHOTGUN = 3,
    SAWNOFF_SHOTGUN = 4,
    SPAS12_SHOTGUN = 5,
    UZI = 6,
    MP5 = 7,
    AK47 = 8,
    M4 = 9,
    SNIPER = 10
}