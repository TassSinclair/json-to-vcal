const fs = require('fs');
const moment = require('moment');

events = JSON.parse(
    fs.readFileSync('events.json', { encoding: 'utf8' })
);

const prefix =
    `BEGIN:VCALENDAR
VERSION:2.0
`;

const postfix = `END:VCALENDAR`;

vEvents = events.map((timeslot) => {
    return timeslot.sessions.map((session) => {
        return `BEGIN:VEVENT
LOCATION:${session.room}
DTSTART:20180818T${moment(session.start_time, 'hh:mm:ss').format('HHmmss')}
DTEND:20180818T${moment(session.start_time, 'hh:mm:ss').add(session.length, 'minutes').format('HHmmss')}
SUMMARY:${session.title}
DESCRIPTION:${session.summary}
END:VEVENT
`;
    }).join('');
});

fs.writeFileSync('events.vcal', prefix + vEvents.join('') + postfix);