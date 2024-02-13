import { TCommandCallback } from "./@types/callback";
export declare class CommandMp {
    readonly name: string;
    readonly aliases: string[];
    readonly callback: TCommandCallback;
    constructor(name: string, aliases: string[], callback: TCommandCallback);
}
