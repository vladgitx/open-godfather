export const DIALOG_STYLES = {
    "message-box": 0,
    input: 1,
    list: 2,
    password: 3,
    tablist: 4,
    "tablist-headers": 5,
} as const

export type DialogStyle = keyof typeof DIALOG_STYLES

export const WEAPONS = {
    fist: 0,
    "brass-knuckles": 1,
    "golf-club": 2,
    nightstick: 3,
    knife: 4,
    "baseball-bat": 5,
    shovel: 6,
    "pool-cue": 7,
    katana: 8,
    chainsaw: 9,
    "purple-dildo": 10,
    dildo: 11,
    vibrator: 12,
    "silver-vibrator": 13,
    flower: 14,
    cane: 15,
    grenade: 16,
    "tear-gas": 17,
    "molotov-cocktail": 18,
    colt45: 22,
    "silenced-colt45": 23,
    "desert-eagle": 24,
    shotgun: 25,
    "sawnoff-shotgun": 26,
    "combat-shotgun": 27,
    uzi: 28,
    mp5: 29,
    ak47: 30,
    m4: 31,
    tec9: 32,
    "country-rifle": 33,
    sniper: 34,
    "rocket-launcher": 35,
    "heat-seeker": 36,
    flamethrower: 37,
    minigun: 38,
    satchel: 39,
    detonator: 40,
    spraycan: 41,
    "fire-extinguisher": 42,
    camera: 43,
    "night-vision-goggles": 44,
    "thermal-goggles": 45,
    parachute: 46,
    vehicle: 49,
    "helicopter-blades": 50,
    explosion: 51,
    drown: 53,
    collision: 54,
} as const

export type Weapon = keyof typeof WEAPONS

export const BODY_PARTS = {
    torso: 3,
    groin: 4,
    "left-arm": 5,
    "right-arm": 6,
    "left-leg": 7,
    "right-leg": 8,
    head: 9,
} as const

export type BodyPart = keyof typeof BODY_PARTS

export const CAMERA_CUT_STYLES = { move: 1, cut: 2 } as const

export type CameraCutStyle = keyof typeof CAMERA_CUT_STYLES

export const PLAYER_STATES = {
    none: 0,
    "on-foot": 1,
    driver: 2,
    passenger: 3,
    "exit-vehicle": 4,
    "enter-vehicle-driver": 5,
    "enter-vehicle-passenger": 6,
    wasted: 7,
    spawned: 8,
    spectating: 9,
} as const

export type PlayerState = keyof typeof PLAYER_STATES

export const PLAYER_BONES = {
    spine: 1,
    head: 2,
    "left-upper-arm": 3,
    "right-upper-arm": 4,
    "left-hand": 5,
    "right-hand": 6,
    "left-thigh": 7,
    "right-thigh": 8,
    "left-foot": 9,
    "right-foot": 10,
    "right-calf": 11,
    "left-calf": 12,
    "left-forearm": 13,
    "right-forearm": 14,
    "left-clavicle": 15,
    "right-clavicle": 16,
    neck: 17,
    jaw: 18,
} as const

export type PlayerBone = keyof typeof PLAYER_BONES

export const KICK_REASONS = { crash: 0, quit: 1, kick: 2, custom: 3, "mode-end": 4 } as const

export type KickReason = keyof typeof KICK_REASONS

export const SPECIAL_ACTIONS = {
    none: 0,
    duck: 1,
    "use-jetpack": 2,
    "enter-vehicle": 3,
    "exit-vehicle": 4,
    dance1: 5,
    dance2: 6,
    dance3: 7,
    dance4: 8,
    "hands-up": 10,
    "use-cellphone": 11,
    sitting: 12,
    "stop-use-cellphone": 13,
    "drink-beer": 20,
    "smoke-ciggy": 21,
    "drink-wine": 22,
    "drink-sprunk": 23,
    cuffed: 24,
    carry: 25,
    pissing: 68,
} as const

export type SpecialAction = keyof typeof SPECIAL_ACTIONS

export const FIGHT_STYLES = { normal: 4, boxing: 5, "kung-fu": 6, "knee-head": 7, "grab-kick": 15, elbow: 16 } as const

export type FightStyle = keyof typeof FIGHT_STYLES

export const WEAPON_SKILLS = {
    colt45: 0,
    "silenced-colt45": 1,
    "desert-eagle": 2,
    shotgun: 3,
    "sawnoff-shotgun": 4,
    "combat-shotgun": 5,
    uzi: 6,
    mp5: 7,
    ak47: 8,
    m4: 9,
    sniper: 10,
} as const

export type WeaponSkill = keyof typeof WEAPON_SKILLS

export const VEHICLE_SEATS = { driver: 0, passenger: 1, "rear-left": 2, "rear-right": 3 } as const

export type VehicleSeat = keyof typeof VEHICLE_SEATS

export const CAMERA_MODES = {
    train: 3,
    "follow-ped": 4,
    "sniper-aiming": 7,
    "rocket-launcher-aiming": 8,
    fixed: 15,
    "vehicle-front": 16,
    "follow-vehicle": 18,
    "follow-boat": 22,
    "weapon-aiming": 46,
    "heat-seeker-aiming": 51,
    "other-weapon-aiming": 53,
    "passenger-aiming": 55,
    "dw-heli-chase": 56,
    "dw-cam-man": 57,
    "dw-birdy": 58,
    "dw-plane-spotter": 59,
    "dw-plane-cam1": 62,
    "dw-plane-cam2": 63,
    "dw-plane-cam3": 64,
} as const

export type CameraMode = keyof typeof CAMERA_MODES

export const WEAPON_SLOTS = {
    unarmed: 0,
    melee: 1,
    pistol: 2,
    shotgun: 3,
    "machine-gun": 4,
    "assault-rifle": 5,
    "long-rifle": 6,
    artillery: 7,
    explosives: 8,
    equipment: 9,
    gift: 10,
    gadget: 11,
    detonator: 12,
} as const

export type WeaponSlot = keyof typeof WEAPON_SLOTS

export const HIT_TYPES = { none: 0, player: 1, vehicle: 2, object: 3, "player-object": 4 } as const

export type HitType = keyof typeof HIT_TYPES

export const MATERIAL_TEXT_SIZES = {
    "32x32": 10,
    "64x32": 20,
    "64x64": 30,
    "128x32": 40,
    "128x64": 50,
    "128x128": 60,
    "256x32": 70,
    "256x64": 80,
    "256x128": 90,
    "256x256": 100,
    "512x64": 110,
    "512x128": 120,
    "512x256": 130,
    "512x512": 140,
} as const

export type MaterialTextSize = keyof typeof MATERIAL_TEXT_SIZES

export const MATERIAL_TEXT_ALIGNMENTS = { left: 0, center: 1, right: 2 } as const

export type MaterialTextAlignment = keyof typeof MATERIAL_TEXT_ALIGNMENTS

export const TEXT_DRAW_ALIGNMENTS = { left: 0, center: 1, right: 2 } as const

export type TextDrawAlignment = keyof typeof TEXT_DRAW_ALIGNMENTS

export const TEXT_DRAW_FONTS = { font0: 0, font1: 1, font2: 2, font3: 3, sprite: 4, "model-preview": 5 } as const

export type TextDrawFont = keyof typeof TEXT_DRAW_FONTS

export const VEHICLE_WINDOW_STATES = {
    open: 0,
    closed: 1,
} as const

export type VehicleWindowState = keyof typeof VEHICLE_WINDOW_STATES

export const SPECTATE_MODES = {
    normal: 1,
    fixed: 2,
    side: 3,
} as const

export type SpectateMode = keyof typeof SPECTATE_MODES

export const SPECTATE_TYPES = {
    none: 0,
    vehicle: 1,
    player: 2,
} as const

export type SpectateType = keyof typeof SPECTATE_TYPES
