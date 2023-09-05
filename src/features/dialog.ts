import { DialogStyleEnum } from ".."
import { SampNode, Natives } from "../scripting-api"

type DialogResponseCallback = (response: boolean, listItem: number, inputText: string) => void
const dialogCallbackMap = new Map<number, DialogResponseCallback>()

SampNode.on("OnDialogResponse", (playerId: number, dialogId: number, response: number, listItem: number, inputText: string) => {
    const callback = dialogCallbackMap.get(dialogId)
    if (callback !== undefined) {
        callback(response === 1, listItem, inputText)
        dialogCallbackMap.delete(dialogId)
    }
})

export function showPlayerDialog(playerId: number, styleId: DialogStyleEnum, caption: string, info: string, button1: string, button2: string, callback?: DialogResponseCallback) {
    const dialogId = Math.floor(Math.random() * 32767)
    if (callback !== undefined) {
        dialogCallbackMap.set(dialogId, callback)
    }
    return Natives.showPlayerDialog(playerId, dialogId, styleId, caption, info, button1, button2)
}

export function hidePlayerDialog(playerId: number) {
    dialogCallbackMap.delete(playerId)
    return Natives.showPlayerDialog(playerId, -1, DialogStyleEnum.MSGBOX, "", "", "", "")
}