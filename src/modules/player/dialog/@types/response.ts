export type ListDialogResponse = {
    action: boolean
    item: number
}

export type MessageDialogResponse = {
    action: boolean
}

export type InputDialogResponse = {
    action: boolean
    input: string
}

export type DialogResponse = ListDialogResponse & InputDialogResponse & MessageDialogResponse