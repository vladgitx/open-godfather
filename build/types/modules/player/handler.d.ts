import { Vector3 } from "../vector3";
import { PlayerMp } from ".";
declare class PlayerHandler {
    at(id: number): PlayerMp | undefined;
    broadcast(message: string, color?: string): void;
    getClosest(position: Vector3, range: number, world?: number, interior?: number): Map<PlayerMp, number>;
    get all(): IterableIterator<PlayerMp>;
}
export declare const playerHandler: PlayerHandler;
export {};
