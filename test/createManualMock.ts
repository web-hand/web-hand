/* eslint-disable */
type FunctionReturnTypes<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K] extends (...args: any) => infer R ? () => R : never;
};

type ClassFieldTypes<T> = {
  [K in keyof T]: T[K];
};

type Writable<T> = {
  -readonly [K in keyof T]: T[K];
};

type ManualMockProperties<T> = Partial<FunctionReturnTypes<T>> & Partial<ClassFieldTypes<T>>;

export function createManualMock<T extends Partial<Record<keyof T, unknown>>>(mockProperties: ManualMockProperties<T>): Writable<T> {
  return { ...mockProperties } as Writable<T>;
}
