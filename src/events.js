const NORMAL_LENGTH = 8;
const KNOWN_MISHMAROT = {
  'משמרת': NORMAL_LENGTH,
  'משמרת לילה': NORMAL_LENGTH,
  'משמרת ערב': NORMAL_LENGTH,
  'משמרת בוקר': NORMAL_LENGTH,
}

async function getMishmarotHours() {
  const mishmarot = await getAllMishmarotEvents();
  return _.flatten(_.map(mishmarot, breakMishmeretToHours));
}

function breakMishmeretToHours(mishmeret) {
  return _.chain(getMishmeretHours(mishmeret))
  .range()
  .map(i => _.assign({
    hourStart: mishmeret.startTime.clone().add(i, 'hours'),
  }, mishmeret))
  .value();
}

async function getAllMishmarotEvents() {
  const eventResponse = await gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': moment().subtract(4, 'month').toISOString(),
    'timeMax': moment().toISOString(),
    'singleEvents': true,
    'showDeleted': false,
    'maxResults': 1000,
  });

  return _.chain(eventResponse.result.items)
    .filter(isMishmeret)
    .map(formatEvent)
    .sortBy('startTime')
    .value();
}

function getMishmeretHours(event) {
  if (KNOWN_MISHMAROT[event.summary]) {
    return KNOWN_MISHMAROT[event.summary];
  } else {
    const endHourString = getEndHourFromSummary(event);
    return _.chain(12)
      .range()
      .find(i => event.startTime.clone().add(i, 'hours').format('H') === endHourString)
      .value();    
  }
}

function getEndHourFromSummary(event) {
  try {
    const hour = event.summary.replace('משמרת', '').replace(/ /g, '').split('-')[1];
    if (!Number.parseInt(hour)) {
      throw new Error(`${hour} isnt an hour!`);
    }
    return hour;
  } catch (e) {
    warn(`couldnt understand how many hours in ${event.summary} from the date ${event.startTime.format('YY-MM-DD HH:mm')}. Assuming 8.`);
    console.error(e);
  }
  return event.startTime.clone().add(NORMAL_LENGTH, 'hours').format('H');
}

function formatEvent(event) {
  return {
    startTime: moment(event.start.dateTime),
    endTime: moment(event.end.dateTime),
    summary: event.summary.trim(),
  }
}

function isMishmeret(event) {
  return event.summary.startsWith('משמרת')
}

