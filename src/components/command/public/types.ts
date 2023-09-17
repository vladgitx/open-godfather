import { Player } from "../../player"

export type CommandCallback = (player: Player, ...params: string[]) => void