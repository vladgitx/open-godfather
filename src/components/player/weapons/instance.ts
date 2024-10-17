import { nativeFunctions } from "@/wrapper"
import { type Player } from "../entity"
import { type Weapon, WEAPON_SKILLS, WEAPON_SLOTS, WEAPONS, type WeaponSkill, type WeaponSlot } from "@/utils/enums"
import { getEnumKeyByValue, typedObjectKeys } from "@/utils/miscellaneous"

export class PlayerWeapons {
    constructor(private player: Player) {}

    setSkill(weapon: WeaponSkill, level: number) {
        nativeFunctions.setPlayerSkillLevel(this.player.sampId, WEAPON_SKILLS[weapon], level)
    }

    add(weapon: Weapon, ammo: number) {
        return nativeFunctions.givePlayerWeapon(this.player.sampId, WEAPONS[weapon], ammo)
    }

    remove(weapon: Weapon) {
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
            this.holding = "fist"
        }
    }

    reset() {
        return nativeFunctions.resetPlayerWeapons(this.player.sampId)
    }

    at(slot: WeaponSlot) {
        const data = nativeFunctions.getPlayerWeaponData(this.player.sampId, WEAPON_SLOTS[slot])

        return data ? { model: getEnumKeyByValue(WEAPONS, data.model)!, ammo: data.ammo } : undefined
    }

    set holding(weapon: Weapon) {
        nativeFunctions.setPlayerArmedWeapon(this.player.sampId, WEAPONS[weapon])
    }

    get holding() {
        return getEnumKeyByValue(WEAPONS, nativeFunctions.getPlayerWeapon(this.player.sampId)) ?? "fist"
    }

    get all() {
        const weapons: { model: Weapon; ammo: number }[] = []

        const weaponSlots = typedObjectKeys(WEAPON_SLOTS)

        for (const weaponSlot of weaponSlots) {
            const weapon = this.at(weaponSlot)

            if (weapon) {
                weapons.push(weapon)
            }
        }

        return weapons
    }
}
