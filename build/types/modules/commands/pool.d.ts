import { CommandMpFactory } from "./factory";
export declare class CommandsMp {
    constructor();
    add: typeof CommandMpFactory.new;
    get all(): IterableIterator<import("./instance").CommandMp>;
}
