import { PlayerMp } from "./instance";
declare class PlayerFactory {
    private pool;
    new(id: number): PlayerMp | undefined;
    destroy(player: PlayerMp): void;
    at(id: number): PlayerMp | undefined;
    get all(): IterableIterator<PlayerMp>;
}
export declare const playerFactory: PlayerFactory;
export {};
