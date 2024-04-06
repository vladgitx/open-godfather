export declare class Entity {
    id: number;
    private variables;
    private cleanupCallbacks;
    constructor(id: number);
    onCleanup(callback: () => void): void;
    setVariable(name: string, value: any): void;
    getVariable(name: string): any;
    deleteVariable(name: string): boolean;
    set exists(value: false);
    get exists(): boolean;
}
