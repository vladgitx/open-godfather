import { type PlayerMp } from "../instance";
export declare class PlayerAnimations {
    private player;
    constructor(player: PlayerMp);
    set(library: string, name: string, speed: number, loop: boolean, lockX: boolean, lockY: boolean, freeze: boolean, time: number, forceSync?: boolean): void;
    clear(): void;
    get currentIndex(): number;
}
