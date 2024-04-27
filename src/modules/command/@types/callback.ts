import { type Player } from "../../player"

export type CommandCallback = (player: Player, ...params: (string | undefined)[]) => void | Promise<void>
