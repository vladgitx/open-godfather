import { DialogStylesEnum } from "../../../shared/enums";
import { PlayerMp } from "../instance";
import { DialogResponse, InputDialogResponse, ListDialogResponse, MessageDialogResponse } from "./@types/response";
export declare class PlayerDialog {
    private player;
    readonly show: PlayerDialogShow;
    constructor(player: PlayerMp);
    hide(response?: DialogResponse): Promise<void>;
}
declare class PlayerDialogShow {
    private player;
    constructor(player: PlayerMp);
    any(style: DialogStylesEnum, caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<DialogResponse>;
    list(caption: string, items: string[], primaryButton: string, secondaryButton?: string): Promise<ListDialogResponse | undefined>;
    tabList(caption: string, items: string[][], primaryButton: string, secondaryButton?: string): Promise<ListDialogResponse | undefined>;
    tabListWithHeaders(caption: string, headers: string[], items: string[][], primaryButton: string, secondaryButton?: string): Promise<ListDialogResponse | undefined>;
    message(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<MessageDialogResponse | undefined>;
    input(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<InputDialogResponse | undefined>;
    password(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<InputDialogResponse | undefined>;
}
export {};
