import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Point3D } from '../../../src/structures/Point3D/Point3D';

describe(Point3D.name, () => {
  describe(Point3D.prototype.distanceTo.name, () => {
    it('should return the correct distance for two points with different coordinates', () => {
      const point1 = new Point3D(1, 2, 3);
      const point2 = new Point3D(4, 5, 6);
      expect(point1.distanceTo(point2)).to.be.closeTo(5.196152422706632, 0.0001);
    });

    it('should return 0 for two points with same coordinates', () => {
      const point1 = new Point3D(1, 2, 3);
      const point2 = new Point3D(1, 2, 3);
      expect(point1.distanceTo(point2)).to.equal(0);
    });

    it('should return the correct distance for two points with negative coordinates', () => {
      const point1 = new Point3D(-1, -2, -3);
      const point2 = new Point3D(-4, -5, -6);
      expect(point1.distanceTo(point2)).to.be.closeTo(5.19615242270663, 0.0001);
    });
  });
});
