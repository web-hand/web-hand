import * as sinon from 'sinon';
import { beforeEach, describe, it } from 'mocha';
import { expect } from 'chai';
import { HandTrackingService } from '../../../../src/services/HandTrackingService/HandTrackingService';
import { IHandTrackingService } from '../../../../src/services/HandTrackingService/HandTrackingService.type';

describe(HandTrackingService.name, () => {
  let handTrackingService: IHandTrackingService;
  beforeEach(() => {
    handTrackingService = new HandTrackingService();
  });
  describe(HandTrackingService.prototype.start.name, () => {
    it('should NOT call initialize if service was already initialized', () => {});
    it('should call initialize method if service was aleatory initialized', () => {});
  });
});
