import { DialogStylesEnum } from "../../../shared/enums"
import { SampNatives } from "../../../natives"
import { PlayerMp } from "../instance"
import { DialogResponse } from "./@types/response"
import { PlayerDialogFactory } from "./factory"

export class PlayerDialog {
	constructor(private player: PlayerMp) {}

	async show(styleId: DialogStylesEnum, caption: string, info: string, primaryButton: string, secondaryButton = "") {
		SampNatives.showPlayerDialog(
			this.player.id,
			Math.floor(Math.random() * 32767),
			styleId,
			caption,
			info,
			primaryButton,
			secondaryButton,
		)
		return PlayerDialogFactory.new(this.player)
	}

	async hide(response?: DialogResponse) {
		PlayerDialogFactory.destroy(this.player, response)
		SampNatives.showPlayerDialog(this.player.id, -1, DialogStylesEnum.MessageBox, "", "", "", "")
	}
}
