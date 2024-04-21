declare class CommandHandler {
    add: (name: string, aliases: string[], callback: import(".").CommandCallback) => import("./instance").CommandMp;
    all: IterableIterator<import("./instance").CommandMp>;
}
export declare const commandHandler: CommandHandler;
export {};
