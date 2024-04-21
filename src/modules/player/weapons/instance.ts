import { type WeaponSkillsEnum, WeaponSlotsEnum, WeaponsEnum } from "@/shared/enums"
import { sampNatives } from "@/wrapper"
import { type PlayerMp } from "../instance"

export class PlayerWeapons {
    constructor(private player: PlayerMp) {}

    setSkill(weapon: WeaponSkillsEnum, level: number) {
        return sampNatives.setPlayerSkillLevel(this.player.id, weapon, level)
    }

    add(weapon: WeaponsEnum, ammo: number) {
        return sampNatives.givePlayerWeapon(this.player.id, weapon, ammo)
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
        return sampNatives.resetPlayerWeapons(this.player.id)
    }

    at(slot: WeaponSlotsEnum) {
        return sampNatives.getPlayerWeaponData(this.player.id, slot)
    }

    set holding(weapon: WeaponsEnum) {
        sampNatives.setPlayerArmedWeapon(this.player.id, weapon)
    }

    get holding() {
        return sampNatives.getPlayerWeapon(this.player.id)
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
