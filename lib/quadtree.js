"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var area_boundary_1 = require("./area-boundary");
var QuadTree = /** @class */ (function () {
    function QuadTree(area, ctx, capacity) {
        if (capacity === void 0) { capacity = 3; }
        this.ctx = ctx;
        this.capacity = capacity;
        this.items = [];
        this.isDivided = false;
        this.boundary = new area_boundary_1.AreaBoundary(area);
    }
    QuadTree.prototype.divide = function () {
        var halfWidth = this.boundary.width / 2;
        var halfHeight = this.boundary.height / 2;
        this.topLeft = new QuadTree({
            x: this.boundary.x,
            y: this.boundary.y,
            width: halfWidth,
            height: halfHeight
        }, this.ctx);
        this.topRight = new QuadTree({
            x: this.boundary.x + halfWidth,
            y: this.boundary.y,
            width: halfWidth,
            height: halfHeight
        }, this.ctx);
        this.bottomLeft = new QuadTree({
            x: this.boundary.x,
            y: this.boundary.y + halfHeight,
            width: halfWidth,
            height: halfHeight
        }, this.ctx);
        this.bottomRight = new QuadTree({
            x: this.boundary.x + halfWidth,
            y: this.boundary.y + halfHeight,
            width: halfWidth,
            height: halfHeight
        }, this.ctx);
        this.isDivided = true;
    };
    QuadTree.prototype.insert = function (point) {
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
        return (this.topLeft.insert(point) ||
            this.topRight.insert(point) ||
            this.bottomLeft.insert(point) ||
            this.bottomRight.insert(point));
    };
    QuadTree.prototype.isFull = function () {
        return this.items.length === this.capacity;
    };
    QuadTree.prototype.query = function (range, array) {
        if (array === void 0) { array = []; }
        if (!this.boundary.intersects(range)) {
            return array;
        }
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var p = _a[_i];
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
    };
    return QuadTree;
}());
exports.QuadTree = QuadTree;
//# sourceMappingURL=quadtree.js.map