# Quadtree

Check out a live [demo](https://www.quadtree.williambarronroberts.com) of this quadtree being in action with a canvas element.

`npm install wbroberts-quadtree`

```javascript
import { Quadtree, Boundary } from 'wbroberts-quadtree';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;

const qTree = new Quadtree(
  { x: 0, y: 0, width: canvas.width, height: canvas.height },
  ctx,
  4
);
const point = { x: 10, y: 10, radius: 10, data: null };

qTree.insert(point); // Inserts it into the quadtree. If the quadtree has more than 4 points, it divides into four more quadtrees.

const area = new Boundary({
  x: 0,
  y: 0,
  width: 20,
  height: 20,
});
const query = qTree.query(area);

console.log(query); // [{ x: 10, y: 10, radius: 10, data: null }]

const area2 = new Boundary({
  x: 20,
  y: 20,
  width: 20,
  height: 20,
});
const query2 = qTree.query(area2);

console.log(query2); // []
```

This was a project to learn more about data structures, specifically quadtrees (obviously). My goal was to successfully create one that I would be able to use in 2d canvas games for the web (primarily mine). Check out the link up above to see it working in action.
