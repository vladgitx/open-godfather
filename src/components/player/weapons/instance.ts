import { type WeaponSkillsEnum, WeaponSlotsEnum, WeaponsEnum } from "@/utils/enums"
import { nativeFunctions } from "@/wrapper"
import { type Player } from "../entity"

export class PlayerWeapons {
    constructor(private player: Player) {}

    setSkill(weapon: WeaponSkillsEnum, level: number) {
        return nativeFunctions.setPlayerSkillLevel(this.player.sampId, weapon, level)
    }

    add(weapon: WeaponsEnum, ammo: number) {
        return nativeFunctions.givePlayerWeapon(this.player.sampId, weapon, ammo)
    }

    remove(weapon: WeaponsEnum) {
        const weapons = this.all
        const holding = this.holding

        this.reset()

        for (const weaponData of weapons) {
            if (weaponData.model !== weapon) {
                this.add(weaponData.model, weaponData.ammo)
            }
        }

        if (holding !== weapon) {
            this.holding = holding
        } else {
            this.holding = WeaponsEnum.Fist
        }
    }

    reset() {
        return nativeFunctions.resetPlayerWeapons(this.player.sampId)
    }

    at(slot: WeaponSlotsEnum) {
        return nativeFunctions.getPlayerWeaponData(this.player.sampId, slot)
    }

    set holding(weapon: WeaponsEnum) {
        nativeFunctions.setPlayerArmedWeapon(this.player.sampId, weapon)
    }

    get holding() {
        return nativeFunctions.getPlayerWeapon(this.player.sampId)
    }

    get all() {
        const weapons: { model: WeaponsEnum; ammo: number }[] = []

        const values = Object.values(WeaponSlotsEnum).filter((v) => !isNaN(Number(v)))
        for (const value of values) {
            const weapon = this.at(value as WeaponSlotsEnum)
            if (weapon) {
                weapons.push(weapon)
            }
        }

        return weapons
    }
}
