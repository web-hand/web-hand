import { Coordinates3D, IPoint3D, ReadonlyPoint3D } from './Point3D.types';

const SQUARE_POWER = 2;

export class Point3D implements IPoint3D {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  setPosition(position: Coordinates3D): ReadonlyPoint3D {
    this.x = position.x;
    this.y = position.y;
    this.z = position.z;

    return this;
  }

  distanceTo(point: ReadonlyPoint3D): number {
    const xPart = Math.pow(point.x - this.x, SQUARE_POWER);
    const yPart = Math.pow(point.y - this.y, SQUARE_POWER);
    const zPart = Math.pow(point.z - this.z, SQUARE_POWER);
    return Math.sqrt(xPart + yPart + zPart);
  }
}
