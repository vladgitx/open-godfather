import { DialogStylesEnum } from "../../../shared/enums"
import { SampNatives } from "../../../wrapper"
import { PlayerMp } from "../instance"
import { TDialogResponse } from "./@internal/types"
import { TInputDialogResponse, TListDialogResponse, TMessageDialogResponse } from "./@types/response"
import { PlayerDialogFactory } from "./factory"

export class PlayerDialog {
    readonly show = new PlayerDialogShow(this.player)

    constructor(private player: PlayerMp) {}

    async hide(response?: TDialogResponse) {
        PlayerDialogFactory.destroy(this.player, response)
        SampNatives.hidePlayerDialog(this.player.id)
    }
}

class PlayerDialogShow {
    constructor(private player: PlayerMp) {}

    async list(caption: string, items: string[], primaryButton: string, secondaryButton = ""): Promise<TListDialogResponse | undefined> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.List,
            caption,
            items.join("\n"),
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async tablist(
        caption: string,
        items: string[][],
        primaryButton: string,
        secondaryButton = "",
    ): Promise<TListDialogResponse | undefined> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.Tablist,
            caption,
            items.map((columns) => columns.join("\t")).join("\n"),
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async tablistWithHeaders(
        caption: string,
        headers: string | string[],
        items: string[] | string[][],
        primaryButton: string,
        secondaryButton = "",
    ): Promise<TListDialogResponse | undefined> {
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

        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.TablistHeaders,
            caption,
            headerString + "\n" + itemsString,
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async messageBox(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<TMessageDialogResponse | undefined> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.MessageBox,
            caption,
            info,
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async input(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<TInputDialogResponse | undefined> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.Input,
            caption,
            info,
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async password(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<TInputDialogResponse | undefined> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.Password,
            caption,
            info,
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }
}
