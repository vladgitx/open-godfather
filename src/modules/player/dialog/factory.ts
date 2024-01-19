import { PlayerMp } from "../instance"
import { DialogResponse } from "./@types/response"

// TODO: delete dialog on player disconnect and dialog response events
export class PlayerDialogFactory {
	static promises = new Map<number, (result: DialogResponse) => void>()

	static async new(player: PlayerMp): Promise<DialogResponse> {
		const existing = this.promises.get(player.id)
		if (existing) {
			existing({ response: undefined, listItem: undefined, inputText: undefined })
		}

		return new Promise((resolve) => {
			this.promises.set(player.id, resolve)
		})
	}

	static destroy(player: PlayerMp, response?: DialogResponse) {
		const existing = this.promises.get(player.id)
		if (existing) {
			existing(response || { response: undefined, listItem: undefined, inputText: undefined })
		}

		this.promises.delete(player.id)
	}
}
