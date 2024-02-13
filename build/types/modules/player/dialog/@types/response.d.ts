type Button = "main" | "second";
type Item = number;
type Input = string;
export type DialogResponse = {
    button: Button;
    item: Item;
    input: Input;
} | undefined;
export type ListDialogResponse = {
    button: Button;
    item: Item;
};
export type MessageDialogResponse = {
    button: Button;
};
export type InputDialogResponse = {
    button: Button;
    input: Input;
};
export {};
