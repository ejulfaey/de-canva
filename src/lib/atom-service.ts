import { atomWithStorage } from 'jotai/utils'

export type ShapeType = {
    type: string;
    id?: string;
    x?: number;
    y?: number;
    [key: string]: string | number | undefined;
};


export const ShapeAtom = atomWithStorage<ShapeType[]>('shapes', []);
