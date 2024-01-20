import { CommandCallback } from "./@types/callback";
import { CommandMp } from "./instance";
export declare class CommandMpFactory {
    private static pool;
    static new(name: string, aliases: string[], callback: CommandCallback): CommandMp;
    static at(name: string): CommandMp | undefined;
    static get all(): IterableIterator<CommandMp>;
}
