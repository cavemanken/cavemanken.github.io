var cv = (function () {
  var startDate;
  var raH;
  var raM;
  var raS;
  var decD;
  var decM;
  var decS;
  var lat;
  var lng;
  var riseSetArray = [];
  inputFields = {};

  function init() {
    // default date field to today
    document.getElementById("date").value = new Date()
      .toISOString().substring(0,10);
      var presetLocations = [
        { lat: 35.047, lng: -85.3106, name: "Chattanooga" },
        { lat: 38.11217, lng: -83.532625, name: "Cave Run" },
      ];

    // setup the preset values and links  
    var presetObjects = [
      {
        raH: 00,
        raM: 44,
        raS: 00,
        decD: 41,
        decM: 23,
        decS: 43,
        name: "Andromeda Galaxy (M31)",
      },
      {
        raH: 20,
        raM: 00,
        raS: 33,
        decD: 22,
        decM: 46,
        decS: 39,
        name: "Dumbbell Nebula (M27)",
      },
      {
        raH: 16,
        raM: 42,
        raS: 30,
        decD: 36,
        decM: 24,
        decS: 57,
        name: "Hercules Gobular Cluster (M13)",
      },
      {
        raH: 17,
        raM: 35,
        raS: 07,
        decD: -37,
        decM: 07,
        decS: 05,
        name: "Milky Way",
      },
      {
        raH: 05,
        raM: 36,
        raS: 21,
        decD: -05,
        decM: 22,
        decS: 43,
        name: "Orion Nebula (M42)",
      }, // Orion Nebula
    ];
  
    for (var i = 0; i < presetLocations.length; i++) {
      addLocationPreset(
        presetLocations[i].name,
        presetLocations[i].lat,
        presetLocations[i].lng,
        presetObjects[i].raS,
        presetObjects[i].decD,
        presetObjects[i].decM,
        presetObjects[i].decS
      );
    }
    for (var i = 0; i < presetObjects.length; i++) {
      addObjectPreset(
        presetObjects[i].name,
        presetObjects[i].raH,
        presetObjects[i].raM,
        presetObjects[i].raS,
        presetObjects[i].decD,
        presetObjects[i].decM,
        presetObjects[i].decS
      );
    }
  };

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };


  function generate() {
    resetGrid();
    if (validateInputs(true)) {
      var date = new Date(startDate);

      // console.log(date, raH * 1.0, raM, raS, decD, decM, decS, lat, lng);
      // console.log(date);

      // these are independent of the date so calculate them one time here
      var transitTimeRadians = astro.transitTimeSiderealRadians(raH, raM, raS);
      var riseTimeRadians = astro.riseTimeSiderealRadians(
        raH,
        raM,
        raS,
        decD,
        decM,
        decS,
        lat
      );
      var setTimeRadians = astro.setTimeSiderealRadians(
        raH,
        raM,
        raS,
        decD,
        decM,
        decS,
        lat
      );
      // console.log(riseTimeRadians, transitTimeRadians, setTimeRadians);

      // generate a year's worth of rise, set, and transit times.
      for (var i = 0; i < 366; i++) {
        // TODO: need to handle never rises and never sets
        // generate

        var transitUTCTime = astro.radiansToUtcTime(
          transitTimeRadians,
          date,
          astro.degreesToRadians(lng)
        );
        var localTransitDateTime = astro.convertDateAndUtcTimeToLocalTime(
          date,
          transitUTCTime
        );
        var riseUTCTime = astro.radiansToUtcTime(
          riseTimeRadians,
          date,
          astro.degreesToRadians(lng)
        );
        var localRiseDateTime = astro.convertDateAndUtcTimeToLocalTime(
          date,
          riseUTCTime
        );
        var setUTCTime = astro.radiansToUtcTime(
          setTimeRadians,
          date,
          astro.degreesToRadians(lng)
        );
        var localSetDateTime = astro.convertDateAndUtcTimeToLocalTime(
          date,
          setUTCTime
        );

        // get sun and moon stuff based on the date and add to the array
        var astronomicalDusk = SunCalc.getTimes(
          date,
          lat,
          lng
        ).night.toLocaleTimeString("en-US", { hour12: false });
        var astronomicalDawn = SunCalc.getTimes(
          date,
          lat,
          lng
        ).nightEnd.toLocaleTimeString("en-US", { hour12: false });

        var moonRises = "";
        var moonSets = "";
        if (SunCalc.getMoonTimes(date, lat, lng).rise !== undefined) {
          moonRises = SunCalc.getMoonTimes(
            date,
            lat,
            lng
          ).rise.toLocaleTimeString("en-US", { hour12: false });
        }
        if (SunCalc.getMoonTimes(date, lat, lng).set !== undefined) {
          moonSets = SunCalc.getMoonTimes(
            date,
            lat,
            lng
          ).set.toLocaleTimeString("en-US", { hour12: false });
        }

        var moonPhase = SunCalc.getMoonIllumination(date).phase;

        var sunRises = SunCalc.getTimes(
          date,
          lat,
          lng
        ).sunrise.toLocaleTimeString("en-US", { hour12: false });
        var sunSets = SunCalc.getTimes(
          date,
          lat,
          lng
        ).sunset.toLocaleTimeString("en-US", { hour12: false });

        riseSetArray.push({
          potentialViewingDate: false,
          date: date.toISOString().split("T")[0],
          moonRises: moonRises,
          moonSets: moonSets,
          moonPhase: moonPhase,
          objectTransits: localTransitDateTime.toTimeString().split(" ")[0],
          objectRises: localRiseDateTime.toTimeString().split(" ")[0],
          objectSets: localSetDateTime.toTimeString().split(" ")[0],
          astronomicalDusk: astronomicalDusk,
          astronomicalDawn: astronomicalDawn,
          sunRises: sunRises,
          sunSets: sunSets,
        });

        date = date.addDays(1);
      }

      // console.log(riseSetArray);

      // for some reason the .toLocaleTimeString("en-US", { hour12: false }) return 24 instead of 00 for the hour
      // let's fix these
      for (var i = 0; i < riseSetArray.length; i++) {
        riseSetArray[i].moonRises = fixTimes(riseSetArray[i].moonRises);
        riseSetArray[i].moonSets = fixTimes(riseSetArray[i].moonSets);
        riseSetArray[i].objectRises = fixTimes(riseSetArray[i].objectRises);
        riseSetArray[i].objectSets = fixTimes(riseSetArray[i].objectSets);
      }

      // start finding the best nights to view the Milky Way
      var moonBuffer = 0; // assume the moon doesn't affect viewing until it rises
      for (var i = 0; i < riseSetArray.length; i++) {
        // see if the Objects transit is between astronomical dusk and astronomical dawn
        if (
          isTimeBetween(
            riseSetArray[i].objectTransits,
            riseSetArray[i].astronomicalDusk,
            riseSetArray[i].astronomicalDawn
          )
        ) {
          // if so, make sure the moon won't interfer
          // TODO: need to handle days where moon may not rise or may not set. see 5/4/2022
          console.log(riseSetArray[i].date, 'x' + riseSetArray[i].moonSets +'x',  'y'+riseSetArray[i].moonRises+'y');
          if (
            riseSetArray[i].moonSets !== "" &&
            riseSetArray[i].moonRises !== ""
          ) {
            if (
              isTimeBetween(
                riseSetArray[i].objectTransits,
                addSeconds(riseSetArray[i].moonSets, moonBuffer * 60),
                subtractSeconds(riseSetArray[i].moonRises, moonBuffer * 60)
              )
            ) {
              riseSetArray[i].potentialViewingDate = true;
            }
          } else if (riseSetArray[i].moonRises === "") {
            console.log('here1');
          } else if (riseSetArray[i].moonSets === "") {
            console.log('here2');
          }
        }
        objectRises = riseSetArray[i].objectRises;
        objectSets = riseSetArray[i].objectSets;
        // not sure how to handle transit if the Object never sets???

        // console.log(objectRises, objectSets, objectTransits);
      }
      // console.log(objectRises, objectSets, secondsToHms(addSeconds(objectRises, Math.abs((hmsToSeconds(objectRises) - hmsToSeconds(objectSets))/2)));

      // now loop through everything that still has potentialViewingDate of true, these are the ones that won't be obsured by moonlight or astronomical twilight
      var cnt = 0;
      var viewingTimesHtml =
        '<p>Note: you should have at least 30 minutes before and after the "Peak Viewing Time" without interference from the moon or the sun.</p>';
      viewingTimesHtml +=
        "<table><thead><tr><th>Night Of</th><th>Peak Viewing Time</th><th>Object Rises</th><th>Object Sets</th></tr></thead><tbody>";
      for (var i = 0; i < riseSetArray.length; i++) {
        if (riseSetArray[i].potentialViewingDate) {
          viewingTimesHtml +=
            "<tr><td>" +
            riseSetArray[i].date +
            "</td><td>" +
            riseSetArray[i].objectTransits.substr(0, 5) +
            "</td><td>" +
            riseSetArray[i].objectRises.substr(0, 5) +
            "</td><td>" +
            riseSetArray[i].objectSets.substr(0, 5) +
            "</td></tr>";
          cnt++;
        }
      }
      viewingTimesHtml += "</tbody></table>";
      document.getElementById("viewingTimes").innerHTML = viewingTimesHtml;
    }
  }

  function isTimeBetween(hmsTime, hmsStart, hmsEnd) {
    var hmsTimeInSeconds = hmsToSeconds(hmsTime);
    var hmsStartInSeconds = hmsToSeconds(hmsStart);
    var hmsEndInSeconds = hmsToSeconds(hmsEnd);
    if (hmsStart > hmsEnd) {
      hmsEndInSeconds += 24 * 60 * 60;
    }
    if (hmsStart > hmsTime) {
      hmsTimeInSeconds += 24 * 60 * 60;
    }
    if (
      hmsTimeInSeconds > hmsStartInSeconds &&
      hmsTimeInSeconds < hmsEndInSeconds
    ) {
      return true;
    } else {
      return false;
    }
  }

  function addSeconds(hms, secondsToAdd) {
    var seconds = hmsToSeconds(hms);
    seconds += secondsToAdd;
    if (seconds >= 24 * 60 * 60) {
      seconds -= 24 * 60 * 60;
    }
    return secondsToHms(seconds);
  }

  function subtractSeconds(hms, secondsToSubtract) {
    var seconds = hmsToSeconds(hms);
    seconds -= secondsToSubtract;
    if (seconds < 0) {
      seconds += 24 * 60 * 60;
    }
    return secondsToHms(seconds);
  }

  function fixTimes(hms) {
    if (hms.substr(0, 2) === "24") {
      hms = "00" + hms.substr(2);
    }
    return hms;
  }

  function hmsToSeconds(hms) {
    var a = hms.split(":"); // split it at the colons
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
  }

  function secondsToHms(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  function updateLocationDescription(name) {
    document.getElementById("locationDescription").innerHTML = " from " + name;
  }

  function updateObjectDescription(name) {
    document.getElementById("objectDescription").innerHTML = " for " + name;
  }

  function updateObjectDescriptionRaDec(name) {
    updateInputs();
    document.getElementById("objectDescription").innerHTML =
      " for " +
      raH +
      "," +
      raM +
      "," +
      raS +
      "," +
      decD +
      "," +
      decM +
      "," +
      decS;
  }

  function addLocationPreset(name, lat, lng) {
    const newPreset = document.createElement("li");

    newPreset.onclick = () => {
      setFieldValue("lat", lat);
      setFieldValue("lng", lng);
      updateLocationDescription(name);
    };
    newPreset.innerHTML = name;
    locationPresets.appendChild(newPreset);
  }

  function addObjectPreset(name, raH, raM, raS, decD, decM, decS) {
    const newPreset = document.createElement("li");

    newPreset.onclick = () => {
      setFieldValue("raH", raH);
      setFieldValue("raM", raM);
      setFieldValue("raS", raS);
      setFieldValue("decD", decD);
      setFieldValue("decM", decM);
      setFieldValue("decS", decS);
      updateObjectDescription(name);
    };
    newPreset.innerHTML = name;
    objectPresets.appendChild(newPreset);
  }
  function setFieldValue(fieldId, value) {
    if (value !== undefined) {
      document.getElementById(fieldId).value = value;
    }
  }
  function resetGrid() {
    document.getElementById("viewingTimes").innerHTML = "";
  }

  function updateInputs() {
    startDate = document.getElementById("date").value.trim();
    raH = document.getElementById("raH").value.trim();
    raM = document.getElementById("raM").value.trim();
    raS = document.getElementById("raS").value.trim();
    decD = document.getElementById("decD").value.trim();
    decM = document.getElementById("decM").value.trim();
    decS = document.getElementById("decS").value.trim();
    lat = document.getElementById("lat").value.trim();
    lng = document.getElementById("lng").value.trim();
    riseSetArray = [];
  }

  function validateInputs(showMessages) {
    updateInputs();

    if (startDate === "" || startDate === undefined) {
      if (showMessages) {
        alert("Please enter a valid starting date.");
      }
      return false;
    }

    if (lat === "" || lng === "") {
      if (showMessages) {
        alert(
          "Please enter a valid location.  Latitude and longitude are required, or click on one of the presets."
        );
      }
      return false;
    }

    if (
      raH === "" ||
      raM === "" ||
      raS === "" ||
      decD === "" ||
      decM === "" ||
      decS === ""
    ) {
      if (showMessages) {
        alert(
          "Please enter an objects right ascension and declination or click on one of the presets."
        );
      }
      return false;
    }
    return true;
  }
  // expose the public methods here
  return {
    init: init,
    generate: generate,
    resetGrid: resetGrid,
    validateInputs: validateInputs,
    updateObjectDescriptionRaDec: updateObjectDescriptionRaDec,
  };
})();