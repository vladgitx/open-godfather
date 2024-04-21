export interface ListDialogResponse {
    action: boolean
    item: number
}

export interface MessageDialogResponse {
    action: boolean
}

export interface InputDialogResponse {
    action: boolean
    input: string
}

export type DialogResponse = ListDialogResponse & InputDialogResponse & MessageDialogResponse
