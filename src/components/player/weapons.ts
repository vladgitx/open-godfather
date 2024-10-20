import { gameNatives } from "@/wrapper/game"
import { type Player } from "./entity"
import { type Weapon, WEAPON_SKILLS, WEAPON_SLOTS, WEAPONS, type WeaponSkill, type WeaponSlot } from "@/wrapper/game/enums.public"
import { getEnumKeyByValue, typedObjectKeys } from "@/lib/utils"

export class PlayerWeapons {
    constructor(private player: Player) {}

    setSkill(weapon: WeaponSkill, level: number) {
        gameNatives.setPlayerSkillLevel(this.player.id, WEAPON_SKILLS[weapon], level)
    }

    add(weapon: Weapon, ammo: number) {
        return gameNatives.givePlayerWeapon(this.player.id, WEAPONS[weapon], ammo)
    }

    setAmmo(weapon: Weapon, ammo: number) {
        gameNatives.setPlayerAmmo(this.player.id, WEAPONS[weapon], ammo)
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
        return gameNatives.resetPlayerWeapons(this.player.id)
    }

    at(slot: WeaponSlot) {
        const { model: weapon, ammo } = gameNatives.getPlayerWeaponData(this.player.id, WEAPON_SLOTS[slot])

        if (slot !== "unarmed" && weapon === WEAPONS.fist) {
            return undefined
        }

        return { model: getEnumKeyByValue(WEAPONS, weapon), ammo }
    }

    set holding(weapon: Weapon) {
        gameNatives.setPlayerArmedWeapon(this.player.id, WEAPONS[weapon])
    }

    get holding() {
        return getEnumKeyByValue(WEAPONS, gameNatives.getPlayerWeapon(this.player.id))
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
