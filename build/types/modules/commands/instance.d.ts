import { type CommandCallback } from "./@types/callback";
export declare class CommandMp {
    readonly name: string;
    readonly aliases: string[];
    readonly callback: CommandCallback;
    constructor(name: string, aliases: string[], callback: CommandCallback);
}
