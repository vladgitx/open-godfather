import { TDialogButton, TDialogInput, TDialogItem } from "../@internal/types";
export type TListDialogResponse = {
    button: TDialogButton;
    item: TDialogItem;
};
export type TMessageDialogResponse = {
    button: TDialogButton;
};
export type TInputDialogResponse = {
    button: TDialogButton;
    input: TDialogInput;
};
