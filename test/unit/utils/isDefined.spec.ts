import { describe, it } from 'mocha';
import { expect } from 'chai';
import { isDefined } from '../../../src/utils/isDefined';

describe(isDefined.name, () => {
  describe('Defined values', () => {
    it(`should return true if true`, () => {
      expect(isDefined(true)).to.be.true;
    });
    it(`should return true if positive number`, () => {
      expect(isDefined(1)).to.be.true;
    });
    it(`should return true if positive BigInt`, () => {
      expect(isDefined(1n)).to.be.true;
    });
    it(`should return true if negative BigInt`, () => {
      expect(isDefined(-1n)).to.be.true;
    });
    it(`should return true if Infinity`, () => {
      expect(isDefined(Infinity)).to.be.true;
    });
    it(`should return true if -Infinity`, () => {
      expect(isDefined(-Infinity)).to.be.true;
    });
    it(`should return true if negative number`, () => {
      expect(isDefined(-1)).to.be.true;
    });
    it(`should return true if 'false' string`, () => {
      expect(isDefined('false')).to.be.true;
    });
    it(`should return true if '0' string`, () => {
      expect(isDefined('0')).to.be.true;
    });
    it(`should return true if any string longer than 0`, () => {
      expect(isDefined('.')).to.be.true;
    });
    it(`should return true if empty object {}`, () => {
      expect(isDefined({})).to.be.true;
    });
    it(`should return true if empty array []`, () => {
      expect(isDefined([])).to.be.true;
    });
    it(`should return true if Date object`, () => {
      expect(isDefined(new Date())).to.be.true;
    });
    it(`should return true if false`, () => {
      expect(isDefined(false)).to.be.true;
    });
    it(`should return true if 0`, () => {
      expect(isDefined(0)).to.be.true;
    });
    it(`should return true if -0`, () => {
      expect(isDefined(-0)).to.be.true;
    });
    it(`should return true if BigInt 0`, () => {
      expect(isDefined(0n)).to.be.true;
    });
    it(`should return true if negative BigInt 0`, () => {
      expect(isDefined(-0n)).to.be.true;
    });
    it(`should return true if empty string`, () => {
      expect(isDefined('')).to.be.true;
    });
    it(`should return true if NaN`, () => {
      expect(isDefined(NaN)).to.be.true;
    });
  });
  describe('Undefined values', () => {
    it(`should return false if null`, () => {
      expect(isDefined(null)).to.be.false;
    });
    it(`should return false if undefined`, () => {
      expect(isDefined(undefined)).to.be.false;
    });
  });
});
