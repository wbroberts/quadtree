import { Boundary } from '../boundary/boundary';

export class Quadtree {
  protected items: any[] = [];
  protected isDivided: boolean = false;

  topLeft: Quadtree = null;
  topRight: Quadtree = null;
  bottomLeft: Quadtree = null;
  bottomRight: Quadtree = null;

  constructor (public boundary: Boundary, protected capacity = 3) { }

  divide(): void {
    const halfWidth = this.boundary.width / 2;
    const halfHeight = this.boundary.height / 2;

    this.topLeft = new Quadtree(
      new Boundary({
        x: this.boundary.x,
        y: this.boundary.y,
        width: halfWidth,
        height: halfHeight
      })
    );

    this.topRight = new Quadtree(
      new Boundary({
        x: this.boundary.x + halfWidth,
        y: this.boundary.y,
        width: halfWidth,
        height: halfHeight
      })
    );

    this.bottomLeft = new Quadtree(
      new Boundary({
        x: this.boundary.x,
        y: this.boundary.y + halfHeight,
        width: halfWidth,
        height: halfHeight
      })
    );

    this.bottomRight = new Quadtree(
      new Boundary({
        x: this.boundary.x + halfWidth,
        y: this.boundary.y + halfHeight,
        width: halfWidth,
        height: halfHeight
      })
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

  query(range: Boundary, array: any[] = []): any[] {
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
