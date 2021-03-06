const log = require('./logger');
const locate = require('./locate');
const messages = require('./messages');
const zeroPostcodeResults = require('../lib/promCounters').zeroPostcodeResultsViews;

async function lookup(res, next) {
  const location = res.locals.location;
  try {
    log.info({ postcodeLookupRequest: { location } }, 'postcode-lookup-start');
    const result = await locate.byPostcode(location);
    if (result) {
      log.info(`Postcode lookup success for ${location}`);
      res.locals.coordinates = {
        latitude: result.latitude,
        longitude: result.longitude,
      };
      res.locals.countries = result.countries;
      next();
    } else {
      log.info(`Postcode lookup 404 for ${location}`);
      zeroPostcodeResults.inc(1);
      next({ message: messages.invalidPostcodeMessage(location), type: 'invalid-postcode' });
    }
  } catch (e) {
    log.error(e, 'Postcode lookup error');
    next({ message: e.message, type: 'postcode-lookup-error' });
  }
}

module.exports = {
  lookup,
};
