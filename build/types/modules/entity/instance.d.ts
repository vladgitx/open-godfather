/// <reference types="@types/node" />
export declare class Entity {
    id: number;
    private variables;
    constructor(id: number);
    setTimeout(callback: () => void, delay: number): NodeJS.Timeout;
    setInterval(callback: () => void, delay: number): NodeJS.Timeout;
    setVariable(name: string, value: any): void;
    getVariable(name: string): any;
    deleteVariable(name: string): boolean;
    set exists(value: boolean);
    get exists(): boolean;
}
