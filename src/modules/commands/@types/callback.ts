import { type PlayerMp } from "../../player"

export type CommandCallback = (player: PlayerMp, ...params: (string | undefined)[]) => void | Promise<void>
