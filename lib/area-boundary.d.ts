import { Vector, Boundary } from './interfaces';
export declare class AreaBoundary {
    center: Vector;
    width: number;
    height: number;
    x: number;
    y: number;
    constructor(area: Boundary);
    contains(point: any): boolean;
    intersects(range: AreaBoundary): boolean;
}
