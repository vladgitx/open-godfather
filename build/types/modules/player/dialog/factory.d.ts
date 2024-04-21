import { type PlayerMp } from "../instance";
import type { DialogResponse } from "./@types/response";
declare class PlayerDialogFactory {
    private promises;
    new(player: PlayerMp): Promise<DialogResponse | undefined>;
    destroy(player: PlayerMp, response: DialogResponse | undefined): void;
}
export declare const playerDialogFactory: PlayerDialogFactory;
export {};
