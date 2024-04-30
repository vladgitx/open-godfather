export type ListDialogResponse =
    | {
          action: true
          item: number
      }
    | {
          action: false
          item: undefined
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
          input: undefined
      }

export type DialogResponse = ListDialogResponse & InputDialogResponse & MessageDialogResponse
