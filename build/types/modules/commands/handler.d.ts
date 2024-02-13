import { CommandMpFactory } from "./factory";
export declare class CommandMpHandler {
    constructor();
    add: typeof CommandMpFactory.new;
    get all(): IterableIterator<import("./instance").CommandMp>;
}
