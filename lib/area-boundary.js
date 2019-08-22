"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AreaBoundary = /** @class */ (function () {
    function AreaBoundary(area) {
        this.width = area.width;
        this.height = area.height;
        this.x = area.x;
        this.y = area.y;
        this.center = {
            x: (this.x + this.width) / 2,
            y: (this.y + this.height) / 2
        };
    }
    AreaBoundary.prototype.contains = function (point) {
        var left = this.x;
        var right = this.x + this.width;
        var top = this.y;
        var bottom = this.y + this.height;
        return point.x >= left && point.x <= right && point.y >= top && point.y <= bottom;
    };
    AreaBoundary.prototype.intersects = function (range) {
        return !(range.x > this.x + this.width ||
            range.y > this.y + this.height ||
            range.x + range.width < this.x ||
            range.y + range.height < this.y);
    };
    return AreaBoundary;
}());
exports.AreaBoundary = AreaBoundary;
//# sourceMappingURL=area-boundary.js.map