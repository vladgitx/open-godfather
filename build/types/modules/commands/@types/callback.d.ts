import { PlayerMp } from "../../player";
export type CommandCallback = (player: PlayerMp, ...params: string[]) => void;
