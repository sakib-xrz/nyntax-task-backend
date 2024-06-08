function calculateRentalCharges(duration, car) {
  const hoursInDay = 24;
  const daysInWeek = 7;

  const weeks = Math.floor(duration / (hoursInDay * daysInWeek));
  duration -= weeks * hoursInDay * daysInWeek;

  const days = Math.floor(duration / hoursInDay);
  duration -= days * hoursInDay;

  const hours = duration;

  const total =
    weeks * car.rates.weekly +
    days * car.rates.daily +
    hours * car.rates.hourly;
  return total;
}

module.exports = {
  calculateRentalCharges,
};
