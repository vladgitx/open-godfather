import { DialogStylesEnum } from "../../../shared/enums";
import { PlayerMp } from "../instance";
import { DialogResponse } from "./@types/response";
export declare class PlayerDialog {
    private player;
    constructor(player: PlayerMp);
    show(styleId: DialogStylesEnum, caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<DialogResponse>;
    hide(response?: DialogResponse): Promise<void>;
}
