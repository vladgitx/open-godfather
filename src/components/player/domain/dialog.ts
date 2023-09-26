import { DialogStyles } from "../../../shared/enums"
import SampNatives from "../../../shared/samp-natives"

type DialogResponseCallback = (response: boolean, listItem: number, inputText: string) => void
const dialogCallbackMap = new Map<number, DialogResponseCallback>()

SampNatives.on("OnDialogResponse", (playerId: number, dialogId: number, response: number, listItem: number, inputText: string) => {
    const callback = dialogCallbackMap.get(dialogId)
    if (callback !== undefined) {
        callback(response === 1, listItem, inputText)
        dialogCallbackMap.delete(dialogId)
    }
})

export function showPlayerDialog(playerId: number, styleId: DialogStyles, caption: string, info: string, primaryButton: string, secondaryButton = "", callback?: DialogResponseCallback) {
    const dialogId = Math.floor(Math.random() * 32767)
    if (callback !== undefined) {
        dialogCallbackMap.set(dialogId, callback)
    }
    return SampNatives.showPlayerDialog(playerId, dialogId, styleId, caption, info, primaryButton, secondaryButton)
}

export function hidePlayerDialog(playerId: number) {
    dialogCallbackMap.delete(playerId)
    return SampNatives.showPlayerDialog(playerId, -1, DialogStyles.MessageBox, "", "", "", "")
}