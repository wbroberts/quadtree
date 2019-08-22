import { AreaBoundary } from './area-boundary';
import { Boundary } from './interfaces';
export declare class QuadTree {
    ctx: CanvasRenderingContext2D;
    protected capacity: number;
    protected items: any[];
    protected boundary: AreaBoundary;
    protected isDivided: boolean;
    topLeft?: QuadTree;
    topRight?: QuadTree;
    bottomLeft?: QuadTree;
    bottomRight?: QuadTree;
    constructor(area: Boundary, ctx: CanvasRenderingContext2D, capacity?: number);
    divide(): void;
    insert(point: any): boolean;
    isFull(): boolean;
    query(range: AreaBoundary, array?: any[]): any[];
}
