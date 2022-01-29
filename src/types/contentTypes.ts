export interface ContentShort {
    id: string;
    name: string;
    description: string;
    additional?: string;
    tags: string[];
    price: number;
    video: string;
}

export interface ContentExtended {
    id: string;
    warning?: string;
    prep: string;
    params: [{
        param: string;
        desc: string;
    }];
    code: string;
}

export interface ContentFull extends Partial<ContentShort>, Partial<ContentExtended> {}

export interface User {
    id: string;
    role: string;
    ownedFish: string[];
}