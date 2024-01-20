import { WeaponSkillsEnum, WeaponSlotsEnum, WeaponsEnum } from "../../../shared/enums";
import { PlayerMp } from "../instance";
export declare class PlayerWeapons {
    private player;
    constructor(player: PlayerMp);
    setSkill(weapon: WeaponSkillsEnum, level: number): boolean;
    add(weapon: WeaponsEnum, ammo: number): boolean;
    remove(weapon: WeaponsEnum): void;
    reset(): boolean;
    at(slot: WeaponSlotsEnum): {
        model: WeaponsEnum;
        ammo: number;
    } | undefined;
    set holding(weapon: WeaponsEnum);
    get holding(): WeaponsEnum;
    get all(): {
        model: WeaponsEnum;
        ammo: number;
    }[];
}
