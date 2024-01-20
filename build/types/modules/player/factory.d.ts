import { PlayerMp } from "./instance";
export declare class PlayerMpFactory {
    private static pool;
    static new(id: number): PlayerMp | undefined;
    static destroy(player: PlayerMp): boolean;
    static at(id: number): PlayerMp | undefined;
    static get all(): IterableIterator<PlayerMp>;
}
