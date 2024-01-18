import { DialogStyles } from "../../../shared/enums";
import SampNatives from "../../../shared/samp-natives";

type DialogResponse = { answered: boolean; response: boolean; listItem: number; inputText: string };

// Map structure: Player ID -> Promise resolve function
const playerDialogPromiseResolve = new Map<number, (result: DialogResponse) => void>();

SampNatives.on("OnDialogResponse", (playerId: number, dialogId: number, response: number, listItem: number, inputText: string) => {
    const resolve = playerDialogPromiseResolve.get(playerId);
    if (resolve) {
        resolve({ answered: true, response: response === 1, listItem, inputText });
        playerDialogPromiseResolve.delete(playerId);
    }
});

SampNatives.on("OnPlayerDisconnect", (playerId: number) => {
    // Resolve the promise with `answered` as false for the disconnected player
    const resolve = playerDialogPromiseResolve.get(playerId);
    if (resolve) {
        resolve({ answered: false, response: false, listItem: -1, inputText: "" });
        playerDialogPromiseResolve.delete(playerId);
    }
});

export function showPlayerDialog(playerId: number, styleId: DialogStyles, caption: string, info: string, primaryButton: string, secondaryButton = ""): Promise<DialogResponse> {
    // Resolve any existing dialog promise for the same player with `answered` as false
    const existingResolve = playerDialogPromiseResolve.get(playerId);
    if (existingResolve) {
        existingResolve({ answered: false, response: false, listItem: -1, inputText: "" });
    }

    return new Promise((resolve) => {
        playerDialogPromiseResolve.set(playerId, resolve);
        SampNatives.showPlayerDialog(playerId, Math.floor(Math.random() * 32767), styleId, caption, info, primaryButton, secondaryButton);
    });
}

export function hidePlayerDialog(playerId: number) {
    const resolve = playerDialogPromiseResolve.get(playerId);
    if (resolve) {
        resolve({ answered: false, response: false, listItem: -1, inputText: "" });
        playerDialogPromiseResolve.delete(playerId);
    }
    return SampNatives.showPlayerDialog(playerId, -1, DialogStyles.MessageBox, "", "", "", "");
}
