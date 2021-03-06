const chai = require('chai');
const completeOriginalUrl = require('../../../app/lib/completeOriginalUrl');

const expect = chai.expect;

describe('completeOriginalUrl', () => {
  const reqMock = { hostname: 'beta.nhs.uk', originalUrl: '/service-search/find-a-pharmacy/results?location=ls' };
  const expectedUrl = 'https://beta.nhs.uk/service-search/find-a-pharmacy/results?location=ls';
  it('should return the current URL via https', () => {
    const url = completeOriginalUrl(reqMock);
    expect(url).to.equal(expectedUrl);
  });
});
