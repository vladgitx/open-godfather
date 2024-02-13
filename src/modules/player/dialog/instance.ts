import { DialogStylesEnum } from "../../../shared/enums"
import { SampNatives } from "../../../wrapper"
import { PlayerMp } from "../instance"
import { DialogResponse, InputDialogResponse, ListDialogResponse, MessageDialogResponse } from "./@types/response"
import { PlayerDialogFactory } from "./factory"

export class PlayerDialog {
    readonly show = new PlayerDialogShow(this.player)

    constructor(private player: PlayerMp) {}

    async hide(response?: DialogResponse) {
        PlayerDialogFactory.destroy(this.player, response)
        SampNatives.hidePlayerDialog(this.player.id)
    }
}

class PlayerDialogShow {
    constructor(private player: PlayerMp) {}

    async any(
        style: DialogStylesEnum,
        caption: string,
        info: string,
        primaryButton: string,
        secondaryButton = "",
    ): Promise<DialogResponse> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            style,
            caption,
            info,
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async list(caption: string, items: string[], primaryButton: string, secondaryButton = ""): Promise<ListDialogResponse | undefined> {
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

    async tabList(
        caption: string,
        items: string[][],
        primaryButton: string,
        secondaryButton = "",
    ): Promise<ListDialogResponse | undefined> {
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

    async tabListWithHeaders(
        caption: string,
        headers: string[],
        items: string[][],
        primaryButton: string,
        secondaryButton = "",
    ): Promise<ListDialogResponse | undefined> {
        SampNatives.showPlayerDialog(
            this.player.id,
            Math.floor(Math.random() * 32767),
            DialogStylesEnum.TablistHeaders,
            caption,
            headers.join("\t") + "\n" + items.map((columns) => columns.join("\t")).join("\n"),
            primaryButton,
            secondaryButton,
        )

        return PlayerDialogFactory.new(this.player)
    }

    async message(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<MessageDialogResponse | undefined> {
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

    async input(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<InputDialogResponse | undefined> {
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

    async password(caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<InputDialogResponse | undefined> {
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
