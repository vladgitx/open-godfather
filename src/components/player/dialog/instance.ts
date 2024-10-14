import { DialogStylesEnum } from "@/lib/enums"
import { nativeFunctions } from "@/natives"
import { type Player } from "../entity"
import type { DialogResponse, InputDialogResponse, ListDialogResponse, MessageDialogResponse } from "./@types/response"
import { EntityPromises } from "@/lib/entity"

const MAX_DIALOG_ID = 32767 // Used when generating a random dialog ID
export const dialogPromises = new EntityPromises<Player, DialogResponse>()

export class PlayerDialog {
    readonly show = new PlayerDialogShow(this.player)

    constructor(private player: Player) {}

    hide() {
        dialogPromises.reject(this.player, new Error("Dialog was hidden from player"))
        nativeFunctions.hidePlayerDialog(this.player.id)
    }
}

class PlayerDialogShow {
    constructor(private player: Player) {}

    async list(caption: string, items: string[], primaryButton: string, secondaryButton = ""): Promise<ListDialogResponse> {
        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DialogStylesEnum.List,
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
        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DialogStylesEnum.Tablist,
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

        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DialogStylesEnum.TablistHeaders,
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
        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DialogStylesEnum.MessageBox,
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        return dialogPromises.new(this.player)
    }

    async input(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<InputDialogResponse> {
        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DialogStylesEnum.Input,
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        return dialogPromises.new(this.player)
    }

    async password(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<InputDialogResponse> {
        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            DialogStylesEnum.Password,
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        return dialogPromises.new(this.player)
    }

    noPromise(style: DialogStylesEnum, caption: string, info: string, primaryButton: string, secondaryButton = "") {
        nativeFunctions.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * MAX_DIALOG_ID),
            style,
            caption || " ",
            info || " ",
            primaryButton || " ",
            secondaryButton,
        )

        dialogPromises.reject(this.player, new Error("A 'no promise' dialog overrided the previous dialog promise"))
    }
}
