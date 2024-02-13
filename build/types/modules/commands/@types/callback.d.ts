import { PlayerMp } from "../../player";
export type TCommandCallback = (player: PlayerMp, ...params: (string | undefined)[]) => void;
