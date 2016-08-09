const dateUtils = require('./dateUtils');
const OpeningTimes = require('./OpeningTimes');

function pharmacyMapper(pharmacyList) {
  const viewModels = [];
  pharmacyList.forEach((item, index) => {
    const model = {
      label: 'Pharmacy',
      name: item.content.organisationSummary.name,
      distanceInKms: item.content.organisationSummary.Distance,
      coords: {
        latitude: item.content.organisationSummary.geographicCoordinates.latitude,
        longitude: item.content.organisationSummary.geographicCoordinates.longitude,
      },
      addressLine: item.content.organisationSummary.address.addressLine,
      postcode: item.content.organisationSummary.address.postcode,
      telephone: item.content.organisationSummary.contact.telephone,
    };
    if (item.openingTimes !== undefined) {
      const ot = new OpeningTimes(item.openingTimes);
      model.openNow = ot.isOpen(dateUtils.now());
      model.openingHoursMessage = ot.getOpeningHoursMessage(dateUtils.now());
      // TODO: assign ot to model.openingTimes but had problems with
      // nunjucks calling, for example, service.openingTimes.getFormattedOpeningTimes()
      // which was throwing an exception 
      model.openingTimes = ot.getFormattedOpeningTimes();
    }

    viewModels[index] = model;
  });
  return viewModels;
}

module.exports = pharmacyMapper;
