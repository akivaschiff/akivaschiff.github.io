function formatData(hours) {
	const months = [];
	const shiftsByMonth = _.chain(hours)
		.uniqBy(hour => hour.startTime.toString())
		.countBy(hour => hour.startTime.format('MMMM'))
		.value();

	const hoursByMonth = _.countBy(hours, hour => hour.hourStart.format('MMMM'));

	return _.merge(
		_.mapValues(shiftsByMonth, value => { return { shiftsPerMonth: value } }),
		_.mapValues(hoursByMonth, value => { return { hoursPerMonth: value } }),
	);
}