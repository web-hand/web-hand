export interface Coordinates3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface ReadonlyPoint3D extends Coordinates3D {
  distanceTo(point: ReadonlyPoint3D): number;
}

export interface IPoint3D extends ReadonlyPoint3D {
  setPosition(position: Coordinates3D): ReadonlyPoint3D;
}
