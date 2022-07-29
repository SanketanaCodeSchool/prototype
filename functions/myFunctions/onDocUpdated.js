const { computeSegEndResizable } = require("@fullcalendar/react");
const { default: startOfDay } = require("date-fns/startOfDay");
const admin = require("firebase-admin");
const db = admin.firestore();

const getDateTime = (date, time, duration) => {
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  const seconds = "00";
  //timeString = "2020-06-10T10:00:00.000";
  let timeString = date.slice(0, 11) + time + ":00";
  var startDate = new Date(timeString);
  let msDuration = duration * 60000;
  var endDate = new Date(startDate.getTime() + msDuration);
  var isoStartDate = new Date(
    startDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split(".")[0];
  var isoEndDate = new Date(
    endDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split(".")[0];

  return [isoStartDate, isoEndDate];
};

const scheduleBatch = (batch) => {
  dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(batch.start_date);
  let schedule = batch.schedule;
  //calculate schedulePointer for schedule
  //"day" of the start_date
  start_day = dayArray[date.getDay()];
  //set the schedulePointer to the index of the first occurrence of
  //the object whose "day" matches the "start_day"
  schedulePointer = schedule.map((object) => object.day).indexOf(start_day);
  //number of events to be created
  let sessionCount = batch.sessionCount;
  let event;
  while (sessionCount !== 0) {
    //flag is set to false after every event creation
    let flag = true;
    while (flag) {
      //get "day" of the "date"
      dayIndex = date.getDay();
      //get the day "index" , eg "Sunday" = 0 , "Monday" = 1.
      day = dayArray[dayIndex];
      //if the date's day is matches the pointed object's "day", schedule it.
      if (schedule[schedulePointer]["day"] == day) {
        let startTime = schedule[schedulePointer]["time"];
        let duration = schedule[schedulePointer]["duration"];
        let ISODate = date.toISOString();
        let [isoStartDate, isoEndDate] = getDateTime(
          ISODate,
          startTime,
          duration
        );
        //console.log("DATES " + isoStartDate, isoEndDate);
        let timeZone = "IST";
        //set flag to false if next event's date is found
        flag = false;
        let event = {
          eventName: batch.batch_id + " " + batch.teacher_name,
          description:
            batch.teacher_name + "'s " + batch.course_name + " batch.",
          startTime: isoStartDate,
          endTime: isoEndDate,
        };
        console.log("Event : ", event);
        insertEvent(event);

        sessionCount--;
        //if schedule pointer reaches the end of array, wrap arounf
        if (schedulePointer == schedule.length - 1) {
          schedulePointer = 0;
        } else {
          schedulePointer++;
        }
      } else {
        //if date's day doesn't match, increment it
        date.setDate(date.getDate() + 1);
      }
    }
  }
};

const insertEvent = (event) => {
  const { google } = require("googleapis");
  const calendar = google.calendar("v3");
  const googleCredentials = require("./credentials.json");
  const OAuth2 = google.auth.OAuth2;
  const ERROR_RESPONSE = {
    status: "500",
    message: "There was an error adding an event to your Google calendar",
  };
  const TIME_ZONE = "IST";

  const oAuth2Client = new OAuth2(
    googleCredentials.web.client_id,
    googleCredentials.web.client_secret,
    googleCredentials.web.redirect_uris[0]
  );

  oAuth2Client.setCredentials({
    refresh_token: googleCredentials.refresh_token,
  });

  calendar.events.insert(
    {
      auth: oAuth2Client,
      calendarId: "primary",
      resource: {
        summary: event.eventName,
        // attendees: [
        //   { email: "test@example.com" },
        //   { email: "test@example.com" },
        // ],
        description: event.description,
        start: {
          dateTime: event.startTime,
          timeZone: TIME_ZONE,
        },
        end: {
          dateTime: event.endTime,
          timeZone: TIME_ZONE,
        },
      },
    },
    (err, res) => {
      if (err) {
        console.log("Rejecting because of error");
        console.log(err);
      } else {
        console.log("Request successful");
      }
    }
  );
};

module.exports.onDocUpdated = async (snap, context) => {
  const values = snap.after.data();
  console.log(values);

  const collectionName = snap.after.ref.parent.id;
  console.log("Added ", values, "to Collection Name:", collectionName);

  if (collectionName == "batches") {
    if (values.isScheduled == true) {
      console.log("Batch Scheduled");
      scheduleBatch(values);
    } else {
      console.log("Batch Unscheduled");
    }
  }

  return db.collection(`${collectionName}_history`).add({
    ...values,
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
  });
};
