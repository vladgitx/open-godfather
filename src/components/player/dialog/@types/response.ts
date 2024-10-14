export type ListDialogResponse =
    | {
          action: true
          item: number
      }
    | {
          action: false
          item?: never
      }

export interface MessageDialogResponse {
    action: boolean
}

export type InputDialogResponse =
    | {
          action: true
          input: string
      }
    | {
          action: false
          input?: never
      }

export type DialogResponse = ListDialogResponse & InputDialogResponse & MessageDialogResponse
