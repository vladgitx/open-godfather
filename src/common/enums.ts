export enum WeaponsEnum {
    Fist = 0,
    BrassKnuckles = 1,
    GolfClub = 2,
    Nightstick = 3,
    Knife = 4,
    BaseballBat = 5,
    Shovel = 6,
    PoolCue = 7,
    Katana = 8,
    Chainsaw = 9,
    PurpleDildo = 10,
    Dildo = 11,
    Vibrator = 12,
    SilverVibrator = 13,
    Flower = 14,
    Cane = 15,
    Grenade = 16,
    TearGas = 17,
    MolotovCocktail = 18,
    Colt45 = 22,
    SilencedColt45 = 23,
    DesertEagle = 24,
    Shotgun = 25,
    SawnoffShotgun = 26,
    CombatShotgun = 27,
    Uzi = 28,
    MP5 = 29,
    AK47 = 30,
    M4 = 31,
    Tec9 = 32,
    CountryRifle = 33,
    Sniper = 34,
    RocketLauncher = 35,
    HeatSeeker = 36,
    Flamethrower = 37,
    Minigun = 38,
    Satchel = 39,
    Detonator = 40,
    SprayCan = 41,
    FireExtinguisher = 42,
    Camera = 43,
    NightVisionGoggles = 44,
    ThermalGoggles = 45,
    Parachute = 46,
    Vehicle = 49,
    HelicopterBlades = 50,
    Explosion = 51,
    Drown = 53,
    Collision = 54,
}

export enum DialogStylesEnum {
    MessageBox = 0,
    Input = 1,
    List = 2,
    Password = 3,
    Tablist = 4,
    TablistHeaders = 5,
}

export enum BodyPartsEnum {
    Torso = 3,
    Groin = 4,
    LeftArm = 5,
    RightArm = 6,
    LeftLeg = 7,
    RightLeg = 8,
    Head = 9,
}

export enum CameraCutStylesEnum {
    Move = 1,
    Cut = 2,
}

export enum PlayerStatesEnum {
    None = 0,
    OnFoot = 1,
    Driver = 2,
    Passenger = 3,
    ExitVehicle = 4,
    EnterVehicleDriver = 5,
    EnterVehiclePassenger = 6,
    Wasted = 7,
    Spawned = 8,
    Spectating = 9,
}

export enum PlayerBonesEnum {
    Spine = 1,
    Head = 2,
    LeftUpperArm = 3,
    RightUpperArm = 4,
    LeftHand = 5,
    RightHand = 6,
    LeftThigh = 7,
    RightThigh = 8,
    LeftFoot = 9,
    RightFoot = 10,
    RightCalf = 11,
    LeftCalf = 12,
    LeftForearm = 13,
    RightForearm = 14,
    LeftClavicle = 15,
    RightClavicle = 16,
    Neck = 17,
    Jaw = 18,
}

export enum KickReasonsEnum {
    Crash = 0,
    Quit = 1,
    Kick = 2,
    Custom = 3,
    ModeEnd = 4,
}

export enum SpecialActionsEnum {
    None = 0,
    Duck = 1,
    UseJetpack = 2,
    EnterVehicle = 3,
    ExitVehicle = 4,
    Dance1 = 5,
    Dance2 = 6,
    Dance3 = 7,
    Dance4 = 8,
    HandsUp = 10,
    UseCellphone = 11,
    Sitting = 12,
    StopUseCellphone = 13,
    DrinkBeer = 20,
    SmokeCiggy = 21,
    DrinkWine = 22,
    DrinkSprunk = 23,
    Cuffed = 24,
    Carry = 25,
    Pissing = 68,
}

export enum FightStylesEnum {
    Normal = 4,
    Boxing = 5,
    KungFu = 6,
    KneeHead = 7,
    GrabKick = 15,
    Elbow = 16,
}

export enum WeaponSkillsEnum {
    Colt45 = 0,
    SilencedColt45 = 1,
    DesertEagle = 2,
    Shotgun = 3,
    SawnoffShotgun = 4,
    CombatShotgun = 5,
    Uzi = 6,
    MP5 = 7,
    AK47 = 8,
    M4 = 9,
    Sniper = 10,
}

export enum VehicleSeatsEnum {
    Driver = 0,
    Passenger = 1,
    RearLeft = 2,
    RearRight = 3,
}

export enum CameraModesEnum {
    Train = 3,
    FollowPed = 4,
    SniperAiming = 7,
    RocketLauncherAiming = 8,
    Fixed = 15,
    VehicleFront = 16,
    FollowVehicle = 18,
    FollowBoat = 22,
    WeaponAiming = 46,
    HeatSeekerAiming = 51,
    OtherWeaponAiming = 53,
    PassengerAiming = 55,
    DwHeliChase = 56,
    DwCamMan = 57,
    DwBirdy = 58,
    DwPlaneSpotter = 59,
    DwPlaneCam1 = 62,
    DwPlaneCam2 = 63,
    DwPlaneCam3 = 64,
}

export enum WeaponSlotsEnum {
    Unarmed = 0,
    Melee = 1,
    Pistol = 2,
    Shotgun = 3,
    MachineGun = 4,
    AssaultRifle = 5,
    LongRifle = 6,
    Artillery = 7,
    Explosives = 8,
    Equipment = 9,
    Gift = 10,
    Gadget = 11,
    Detonator = 12,
}

export enum HitTypesEnum {
    None = 0,
    Player = 1,
    Vehicle = 2,
    Object = 3,
    PlayerObject = 4,
}

export enum MaterialTextSizesEnum {
    _32x32 = 10,
    _64x32 = 20,
    _64x64 = 30,
    _128x32 = 40,
    _128x64 = 50,
    _128x128 = 60,
    _256x32 = 70,
    _256x64 = 80,
    _256x128 = 90,
    _256x256 = 100,
    _512x64 = 110,
    _512x128 = 120,
    _512x256 = 130,
    _512x512 = 140,
}

export enum MaterialTextAlignmentsEnum {
    Left = 0,
    Center = 1,
    Right = 2,
}

export enum TextDrawAlignmentsEnum {
    Left = 0,
    Center = 1,
    Right = 2,
}

export enum TextDrawFontsEnum {
    Font_0 = 0,
    Font_1 = 1,
    Font_2 = 2,
    Font_3 = 3,
    Sprite = 4,
    ModelPreview = 5,
}
