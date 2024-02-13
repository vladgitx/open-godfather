import { PlayerMp } from "../instance";
import { TDialogResponse } from "./@internal/types";
export declare class PlayerDialogFactory {
    static promises: Map<number, (result: TDialogResponse) => void>;
    static new(player: PlayerMp): Promise<TDialogResponse>;
    static destroy(player: PlayerMp, response: TDialogResponse): void;
}
