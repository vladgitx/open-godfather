export declare class Entity {
    id: number;
    private variables;
    constructor(id: number);
    setVariable(name: string, value: any): void;
    getVariable(name: string): any;
    deleteVariable(name: string): boolean;
    set exists(value: boolean);
    get exists(): boolean;
}
