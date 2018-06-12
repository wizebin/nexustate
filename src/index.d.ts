import ShardedNexustate from './ShardedNexustate';

type NexustateTransform = (any) => any;

type NexustateSetOptions = {
    immediatePersist: boolean,
    noNotify: boolean,
};

type NexustateKeyChange = {
    keyChange: string | string[],
    alias: string | string[],
    key: string | string[],
    value: any,
};

type NexustateChangeCallback = (NexustateKeyChange) => void;

type NexustateListener = {
    key: string | string[],
    alias: string,
    callback: NexustateChangeCallback,
    transform: NexustateTransform,
};

type NexuscriptListener = {
    key: string | string[],
    callback: NexustateChangeCallback,
    alias: string | string[],
    component: any,
    transform: NexustateTransform,
    noChildUpdates: boolean,
};

type KeyType = string | string[];

export class Nexustate {
    constructor(...args: any[]);

    setPersistenceFunctions(save: (string, any) => boolean, load: (string) => any): void;

    setPersist(shouldPersist: boolean): void;

    set(object: object, options: NexustateSetOptions): object[];

    setKey(key: KeyType, value: any, options: NexustateSetOptions): object;

    get(key: KeyType): any;

    delete(key: KeyType, options: NexustateSetOptions): void;

    push(key: KeyType, value: any, options: NexustateSetOptions): any;

    getForListener(listener: NexustateListener, keyChange): NexustateKeyChange;

    persist(immediate: boolean): void;

    listen(listener: NexuscriptListener): void;

    unlisten(key: KeyType, callback: NexustateChangeCallback): void;

    unlistenComponent(component: any, basePath?: KeyType): void;
}

export function getNexustate(name: string, options: any): Nexustate;

export function getShardedNexustate(): ShardedNexustate;

export { ShardedNexustate, getShardedNexustate };
