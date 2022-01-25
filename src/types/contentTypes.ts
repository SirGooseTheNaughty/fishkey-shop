export interface ContentShort {
    id: string;
    name: string;
    description: string;
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

export interface User {
    id: string;
    role: string;
    ownedFish: string[];
}