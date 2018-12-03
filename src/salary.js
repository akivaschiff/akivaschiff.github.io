const DAY_TYPE_REGULAR = 0;
const DAY_TYPE_FRIDAY = 1;
const DAY_TYPE_SHABBAT = 2;

const ZONE_1 = 1;
const ZONE_2 = 2;
const ZONE_3 = 3;
const ZONE_4 = 4;

const BONUS_20 = 20;
const BONUS_40 = 40;
const BONUS_50 = 50;
const BONUS_75 = 75;
const BONUS_100 = 100;

function calculateHours(mishmarotHours) {
	console.log(mishmarotHours);
}

function isHoliday(mishmeretHour) {
	return false;
}

function isHolidayEvening(mishmeretHour) {
	return false;
}

function getZone(mishmeretHour) {
	const hour = mishmeretHour.hourStart.hour();
	if (hour >= 7 && hour < 13) {
		return ZONE_1;
	} else if (hour >= 13 && hour < 19) {
		return ZONE_2;
	} else if (hour >= 19 && hour < 1) {
		return ZONE_3;
	} else if (hour >= 1 && hour < 7) {
		return ZONE_4;
	}
}

function getDayType(mishmeretHour) {
	const date = mishmeretHour.hourStart;
	const isFriday = mishmeretHour.hourStart.day() === 5;
	const isShabbat = mishmeretHour.hourStart.day() === 6;
	const isWeekday = !isFriday && !isShabbat;
	if (isWeekday) {
		return DAY_TYPE_REGULAR;
	} else if (isFriday || isHolidayEvening(mishmeretHour)) {
		return DAY_TYPE_FRIDAY;
	} else if (isShabbat || isHoliday(mishmeretHour)) {
		return DAY_TYPE_SHABBAT;
	}
}

function calculateBonus(mishmeret) {

}


//       function fetchJewishHolidays() {
//         // https://www.hebcal.com/home/195/jewish-calendar-rest-api
// //      year=now – “now” for current year, or 4-digit YYYY such as 2003
// //      month=x – “x” for entire Gregorian year, or use a numeric month (1=January, 6=June, etc.)
//         https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=off&mod=on&nx=off&year=now&month=x&ss=off&mf=on&c=off&s=off
//       }
