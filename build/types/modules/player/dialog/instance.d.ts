import { type PlayerMp } from "../instance";
import type { DialogResponse, InputDialogResponse, ListDialogResponse, MessageDialogResponse } from "./@types/response";
export declare class PlayerDialog {
    private player;
    readonly show: PlayerDialogShow;
    constructor(player: PlayerMp);
    hide(response?: DialogResponse): void;
}
declare class PlayerDialogShow {
    private player;
    constructor(player: PlayerMp);
    list(caption: string, items: string[], primaryButton: string, secondaryButton?: string): Promise<ListDialogResponse | undefined>;
    tablist(caption: string, items: string[][], primaryButton: string, secondaryButton?: string): Promise<ListDialogResponse | undefined>;
    tablistWithHeaders(caption: string, headers: string | string[], items: string[] | string[][], primaryButton: string, secondaryButton?: string): Promise<ListDialogResponse | undefined>;
    messageBox(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<MessageDialogResponse | undefined>;
    input(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<InputDialogResponse | undefined>;
    password(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<InputDialogResponse | undefined>;
}
export {};
