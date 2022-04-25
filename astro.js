// self invoking function that will create the object at load time
var astro = (function () {
  const ARC_MINUTES_PER_DEGREE = 60,
    ARC_SECONDS_PER_ARC_MINUTE = 60,
    ARC_SECONDS_PER_DEGREE =
      ARC_MINUTES_PER_DEGREE * ARC_SECONDS_PER_ARC_MINUTE,
    MILLISECONDS_PER_SECOND = 1000,
    RADIANS_PER_DAY = Math.PI * 2,
    SECONDS_PER_MINUTE = 60,
    MINUTES_PER_HOUR = 60,
    SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR,
    HOURS_PER_DAY = 24,
    MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY,
    SECONDS_PER_DAY = SECONDS_PER_MINUTE * MINUTES_PER_DAY,
    MILLISECONDS_PER_DAY = SECONDS_PER_DAY * MILLISECONDS_PER_SECOND,
    EPOCH_MILLIS_AT_2000_01_01_12_00_00 = 946728000000,
    CLOCK_HOURS_PER_SIDEREAL_HOUR =
      1 +
      1 /
        (365 + 5 / HOURS_PER_DAY + 48 / MINUTES_PER_DAY + 46 / SECONDS_PER_DAY);

  var hmsToDegrees = function (h, m, s) {
    return (h * 180.0) / 12.0 + m / 4.0 + s / 240.0;
  };
  var dmsToDegrees = function (d, m, s) {
    return d * 1.0 + m / 60.0 + s / 3600.0;
  };
  var degreesToRadians = function (d) {
    return (d * Math.PI) / 180.0;
  };
  var radiansToDegrees = function (r) {
    return (r * 180.0) / Math.PI;
  };
  var hmsToRadians = function (h, m, s) {
    return degreesToRadians(hmsToDegrees(h, m, s));
  };
  var dmsToRadians = function (h, m, s) {
    return degreesToRadians(dmsToDegrees(h, m, s));
  };
  var transitTimeSiderealRadians = function (raH, raM, raS) {
    // just the Right Ascension converted to radians (latitude nor declination)
    return hmsToRadians(raH, raM, raS);
  };
  var riseTimeSiderealRadians = function (
    raH,
    raM,
    raS,
    decD,
    decM,
    decH,
    latitudeInDegrees
  ) {
    // need the declination and the latitude to figure out the rise time
    return (
      hmsToRadians(raH, raM, raS) -
      Math.acos(
        -Math.tan(dmsToRadians(decD, decM, decH)) *
          Math.tan(degreesToRadians(latitudeInDegrees))
      )
    );
  };
  var setTimeSiderealRadians = function (
    raH,
    raM,
    raS,
    decD,
    decM,
    decH,
    latitudeInDegrees
  ) {
    // need the declination and the latitude to figure out the set time
    return (
      hmsToRadians(raH, raM, raS) +
      Math.acos(
        -Math.tan(dmsToRadians(decD, decM, decH)) *
          Math.tan(degreesToRadians(latitudeInDegrees))
      )
    );
  };
  var convertDateAndUtcTimeToLocalTime = function (date, utcTime) {
    return new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        utcTime.substr(0, 2),
        utcTime.substr(3, 2),
        utcTime.substr(6, 2)
      )
    );
  };
  // this will convert the sidereal time (in radians) to UTC time base upon the date and the longitude of the observer
  var radiansToUtcTime = function (radians, date, lngRadians) {
    // get millis between date and 01JAN1970
    var millis = date.getTime();

    const daysSince_2000_01_01_12 =
        (millis - EPOCH_MILLIS_AT_2000_01_01_12_00_00) / MILLISECONDS_PER_DAY,
      prevMidDay = Math.floor(daysSince_2000_01_01_12),
      // https://aa.usno.navy.mil/faq/docs/GAST.php
      days = unmod(
        radians,
        4.894961212735792 + lngRadians,
        6.30038809898489,
        2 * Math.PI,
        prevMidDay,
        prevMidDay + 1
      )[0],
      millisSinceEpoch =
        days * MILLISECONDS_PER_DAY + EPOCH_MILLIS_AT_2000_01_01_12_00_00,
      millisSinceStartOfDay = millisSinceEpoch % MILLISECONDS_PER_DAY,
      hoursSinceStartOfDay =
        millisSinceStartOfDay / (MILLISECONDS_PER_SECOND * SECONDS_PER_HOUR);
    return hoursToClockTime(hoursSinceStartOfDay) + " UTC";
  };

  // other unexported utilities
  var hoursToClockTime = function (timeInHours) {
    const hours = Math.floor(timeInHours),
      minutes = Math.floor((timeInHours - hours) * MINUTES_PER_HOUR),
      seconds = Math.floor(
        (timeInHours - hours - minutes / MINUTES_PER_HOUR) * SECONDS_PER_HOUR
      );

    return `${zeroPad(hours, 2)}:${zeroPad(minutes, 2)}:${zeroPad(seconds, 2)}`;
  };

  var unmod = function (r, a, b, m, x_0, x_1) {
    // find all 'n' such that x_0 <= (n * m + r - a) / b <= x_1
    const from_n = Math.ceil((x_0 * b + a - r) / m),
      to_n = Math.floor((x_1 * b + a - r) / m);
    const x_values = [];
    for (let n = from_n; n <= to_n; n++) {
      x_values.push((n * m + r - a) / b);
    }
    return x_values;
  };

  var zeroPad = function (num, len) {
    return num.toString().padStart(len, "0");
  };

  // expose the public methods here
  return {
    hmsToDegrees: hmsToDegrees,
    dmsToDegrees: dmsToDegrees,
    degreesToRadians: degreesToRadians,
    radiansToDegrees: radiansToDegrees,
    hmsToRadians: hmsToRadians,
    dmsToRadians: dmsToRadians,
    riseTimeSiderealRadians: riseTimeSiderealRadians,
    transitTimeSiderealRadians: transitTimeSiderealRadians,
    setTimeSiderealRadians: setTimeSiderealRadians,
    radiansToUtcTime: radiansToUtcTime,
    convertDateAndUtcTimeToLocalTime: convertDateAndUtcTimeToLocalTime,
  };
})();