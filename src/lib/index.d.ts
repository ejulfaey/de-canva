export type ShapeType = {
    type: string;
    id?: string;
    x?: number;
    y?: number;
    draggable?: boolean;
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontSize?: string;
    align?: string;
    width?: number;
    height?: number;
    [key: string]: string | number | boolean | undefined;
};
