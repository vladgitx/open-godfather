import { gameNatives } from "@/wrapper/game"
import { type Player } from "../entity"
import { EntityPromises } from "@/lib/entity"
import { DIALOG_STYLES, type DialogStyle } from "@/wrapper/game/enums.public"

const MAX_DIALOG_ID = 32767 // Used when generating a random dialog ID

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

export const dialogPromises = new EntityPromises<Player, DialogResponse>()

export class PlayerDialog {
    constructor(private player: Player) {}

    get show() {
        return new PlayerDialogShow(this.player)
    }

    hide() {
        dialogPromises.reject(this.player, new Error("Dialog was hidden from player"))
        gameNatives.hidePlayerDialog(this.player.id)
    }
}

class PlayerDialogShow {
    constructor(private player: Player) {}

    async list(caption: string, items: string[], primaryButton: string, secondaryButton = ""): Promise<ListDialogResponse> {
        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES.list,
            caption || " ",
            items.join("\n") || "\n",
            primaryButton || " ",
            secondaryButton,
        )

        if (items.length === 0) {
            return { action: false }
        }

        return dialogPromises.new(this.player)
    }

    async tablist(caption: string, items: string[][], primaryButton: string, secondaryButton = ""): Promise<ListDialogResponse> {
        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES.tablist,
            caption || " ",
            items.map((columns) => columns.join("\t")).join("\n") || "\n",
            primaryButton || " ",
            secondaryButton,
        )

        if (items.length === 0) {
            return { action: false }
        }

        return dialogPromises.new(this.player)
    }

    async tablistWithHeaders(
        caption: string,
        headers: string | string[],
        items: string[] | string[][],
        primaryButton: string,
        secondaryButton = "",
    ): Promise<ListDialogResponse> {
        let headerString = ""
        let itemsString = ""

        if (typeof headers === "string") {
            headerString = headers
            headers = [headers]
        } else {
            headerString = headers.join("\t")
        }

        if (typeof items[0] === "string") {
            itemsString = items.join("\n")
            items = [items as string[]]
        } else {
            itemsString = (items as string[][]).map((columns) => columns.join("\t")).join("\n")
        }

        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES["tablist-headers"],
            caption || " ",
            (headerString || "\n") + "\n" + (itemsString || "\n"),
            primaryButton || " ",
            secondaryButton,
        )

        if (items.length === 0) {
            return { action: false }
        }

        return dialogPromises.new(this.player)
    }

    async messageBox(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<MessageDialogResponse> {
        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES["message-box"],
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        return dialogPromises.new(this.player)
    }

    async input(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<InputDialogResponse> {
        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES.input,
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        return dialogPromises.new(this.player)
    }

    async password(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<InputDialogResponse> {
        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES.password,
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        return dialogPromises.new(this.player)
    }

    noPromise(style: DialogStyle, caption: string, info: string, primaryButton: string, secondaryButton = "") {
        gameNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DIALOG_STYLES[style],
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        dialogPromises.reject(this.player, new Error("A 'no promise' dialog overrided the previous dialog promise"))
    }
}
