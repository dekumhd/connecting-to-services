const testUrl = process.env.BACKSTOP_TEST_URL || 'https://beta.nhs.uk';
const testSiteUrl = `${testUrl}/find-a-pharmacy/`;

module.exports = [
  {
    clickSelector: '',
    cookiePath: 'backstop_data/engine_scripts/cookies.json',
    delay: 0,
    expect: 0,
    hideSelectors: [],
    hoverSelector: '',
    label: 'search page',
    misMatchThreshold: 0.1,
    postInteractionWait: 0,
    readyEvent: '',
    readySelector: '',
    referenceUrl: '',
    removeSelectors: [],
    requireSameDimensions: true,
    selectorExpansion: true,
    selectors: [],
    url: testSiteUrl,
  },
  {
    clickSelector: '',
    cookiePath: 'backstop_data/engine_scripts/cookies.json',
    delay: 2000,
    expect: 0,
    hideSelectors: ['.callout--info'],
    hoverSelector: '',
    label: 'results page',
    misMatchThreshold: 0.1,
    postInteractionWait: 0,
    readyEvent: '',
    readySelector: '',
    referenceUrl: '',
    removeSelectors: [],
    requireSameDimensions: true,
    selectorExpansion: true,
    selectors: [],
    url: `${testSiteUrl}results?location=Liverpool&open=false`,
  },
  {
    clickSelector: '',
    cookiePath: 'backstop_data/engine_scripts/cookies.json',
    delay: 2000,
    expect: 0,
    hideSelectors: ['.callout--info'],
    hoverSelector: '',
    label: "we can't find page",
    misMatchThreshold: 0.1,
    postInteractionWait: 0,
    readyEvent: '',
    readySelector: '',
    referenceUrl: '',
    removeSelectors: [],
    requireSameDimensions: true,
    selectorExpansion: true,
    selectors: [],
    url: `${testSiteUrl}results?location=Glasgow&open=false`,
  },
];
