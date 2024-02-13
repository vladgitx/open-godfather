import { PlayerMp } from "../instance";
import { TDialogResponse } from "./@internal/types";
import { TInputDialogResponse, TListDialogResponse, TMessageDialogResponse } from "./@types/response";
export declare class PlayerDialog {
    private player;
    readonly show: PlayerDialogShow;
    constructor(player: PlayerMp);
    hide(response?: TDialogResponse): Promise<void>;
}
declare class PlayerDialogShow {
    private player;
    constructor(player: PlayerMp);
    list(caption: string, items: string[], primaryButton: string, secondaryButton?: string): Promise<TListDialogResponse | undefined>;
    tablist(caption: string, items: string[][], primaryButton: string, secondaryButton?: string): Promise<TListDialogResponse | undefined>;
    tablistWithHeaders(caption: string, headers: string | string[], items: string[] | string[][], primaryButton: string, secondaryButton?: string): Promise<TListDialogResponse | undefined>;
    messageBox(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<TMessageDialogResponse | undefined>;
    input(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<TInputDialogResponse | undefined>;
    password(caption: string, info: string, primaryButton: string, secondaryButton?: string): Promise<TInputDialogResponse | undefined>;
}
export {};
