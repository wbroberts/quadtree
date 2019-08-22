import { AreaBoundary } from './area-boundary';
import { Boundary } from './interfaces';

export class QuadTree {
  protected items: any[] = [];
  protected boundary: AreaBoundary;
  protected isDivided: boolean = false;

  topLeft?: QuadTree;
  topRight?: QuadTree;
  bottomLeft?: QuadTree;
  bottomRight?: QuadTree;

  constructor (area: Boundary, public ctx: CanvasRenderingContext2D, protected capacity = 3) {
    this.boundary = new AreaBoundary(area);
  }

  divide(): void {
    const halfWidth = this.boundary.width / 2;
    const halfHeight = this.boundary.height / 2;

    this.topLeft = new QuadTree(
      {
        x: this.boundary.x,
        y: this.boundary.y,
        width: halfWidth,
        height: halfHeight
      },
      this.ctx
    );

    this.topRight = new QuadTree(
      {
        x: this.boundary.x + halfWidth,
        y: this.boundary.y,
        width: halfWidth,
        height: halfHeight
      },
      this.ctx
    );

    this.bottomLeft = new QuadTree(
      {
        x: this.boundary.x,
        y: this.boundary.y + halfHeight,
        width: halfWidth,
        height: halfHeight
      },
      this.ctx
    );

    this.bottomRight = new QuadTree(
      {
        x: this.boundary.x + halfWidth,
        y: this.boundary.y + halfHeight,
        width: halfWidth,
        height: halfHeight
      },
      this.ctx
    );

    this.isDivided = true;
  }

  insert(point: any): boolean {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.boundary.contains(point) && !this.isFull()) {
      this.items.push(point);
      return true;
    }

    if (!this.isDivided) {
      this.divide();
    }

    return (
      this.topLeft.insert(point) ||
      this.topRight.insert(point) ||
      this.bottomLeft.insert(point) ||
      this.bottomRight.insert(point)
    );
  }

  isFull(): boolean {
    return this.items.length === this.capacity;
  }

  query(range: AreaBoundary, array: any[] = []): any[] {
    if (!this.boundary.intersects(range)) {
      return array;
    }

    for (let p of this.items) {
      if (range.contains(p)) {
        array.push(p);
      }
    }

    if (this.isDivided) {
      this.topLeft.query(range, array);
      this.topRight.query(range, array);
      this.bottomLeft.query(range, array);
      this.bottomRight.query(range, array);
    }

    return array;
  }
}
