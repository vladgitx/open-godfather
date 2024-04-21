import { CommandCallback } from "./@types/callback";
import { CommandMp } from "./instance";
declare class CommandFactory {
    private pool;
    new(name: string, aliases: string[], callback: CommandCallback): CommandMp;
    at(name: string): CommandMp | undefined;
    get all(): IterableIterator<CommandMp>;
}
export declare const commandFactory: CommandFactory;
export {};
