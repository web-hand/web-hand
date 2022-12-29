export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export interface IPoint3D extends Coordinates3D {
  distanceTo(point: IPoint3D): number;
}
