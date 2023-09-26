import { Weapons } from "./enums"

export function isBulletWeapon(weapon: Weapons) {
    return (weapon >= Weapons.Colt45 && weapon <= Weapons.Sniper) || weapon === Weapons.Minigun
}

export function isMeleeWeapon(weapon: Weapons) {
    return weapon >= Weapons.Fist && weapon <= Weapons.Cane
}

export function isBladeWeapon(weapon: Weapons) {
    return weapon === Weapons.Knife || weapon === Weapons.Katana || weapon === Weapons.Chainsaw || weapon === Weapons.HelicopterBlades
}

export function isExplosiveWeapon(weapon: Weapons) {
    return weapon === Weapons.Grenade || weapon === Weapons.MolotovCocktail || weapon === Weapons.RocketLauncher || weapon === Weapons.HeatSeeker || weapon === Weapons.Flamethrower || weapon === Weapons.Satchel || weapon === Weapons.Explosion
}