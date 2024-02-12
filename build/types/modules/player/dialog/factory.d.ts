import { PlayerMp } from "../instance";
import { DialogResponse } from "./@types/response";
export declare class PlayerDialogFactory {
    static promises: Map<number, (result: DialogResponse) => void>;
    static new(player: PlayerMp): Promise<DialogResponse>;
    static destroy(player: PlayerMp, response: DialogResponse): void;
}
