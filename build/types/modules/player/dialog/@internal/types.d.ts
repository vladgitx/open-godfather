export type TDialogButton = "main" | "second";
export type TDialogItem = number;
export type TDialogInput = string;
export type TDialogResponse = {
    button: TDialogButton;
    item: TDialogItem;
    input: TDialogInput;
} | undefined;
