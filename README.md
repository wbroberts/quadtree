# Quadtree

Check out a live [demo](https://www.quadtree.williambarronroberts.com) of this quadtree being in action with a canvas element.

`npm install wbroberts-quadtree`

```javascript
import { QuadTree, AreaBoundary } from 'wbroberts-quadtree';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const qTree = new QuadTree(
  { x: 0, y: 0, width: canvas.width, height: canvas.height },
  ctx,
  4
);
const point = { x: 10, y: 10, radius: 10, data: null };

qTree.insert(point); // Inserts it into the quadtree. If the quadtree has more than 4 points, it divides into four more quadtrees.

const area = new AreaBoundary({
  x: 0,
  y: 0,
  width: 20,
  height: 20,
});
const query = qTree.query(area);

console.log(query); // [{ x: 10, y: 10, radius: 10, data: null }]

const area2 = new AreaBoundary({
  x: 20,
  y: 20,
  width: 20,
  height: 20,
});
const query2 = qTree.query(area2);

console.log(query2); // []
```

This project was to learn about quadtree data structures. My goal was to successfully create one that I would be able to use in 2d canvas games for the web (primarily mine).
