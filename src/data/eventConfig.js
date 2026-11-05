/**
 * IEDC IDEA SPRINT 2026 — Event Configuration
 * 
 * The event dates and times below are confirmed for this project.
 * 
 * Timezone: Asia/Kolkata (IST, UTC+5:30)
 */

const EVENT_START_DATE = '2026-11-14T10:00:00+05:30';
const EVENT_END_DATE = '2026-11-15T10:00:00+05:30';
const EVENT_DURATION_HOURS =
  (Date.parse(EVENT_END_DATE) - Date.parse(EVENT_START_DATE)) / (60 * 60 * 1000);
const EVENT_TIME_ZONE = 'Asia/Kolkata';

function getDateParts(date, month = 'long') {
  return Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      month,
      day: 'numeric',
      year: 'numeric',
      timeZone: EVENT_TIME_ZONE,
    })
      .formatToParts(new Date(date))
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, value])
  );
}

export function formatEventDate(date, month = 'long') {
  const { month: monthName, day, year } = getDateParts(date, month);
  return `${monthName} ${day}, ${year}`;
}

function formatEventDateRange(startDate, endDate, month = 'long') {
  const start = getDateParts(startDate, month);
  const end = getDateParts(endDate, month);

  if (start.month === end.month && start.year === end.year) {
    return `${start.month} ${start.day}–${end.day}, ${end.year}`;
  }

  return `${formatEventDate(startDate, month)}–${formatEventDate(endDate, month)}`;
}

const eventEndTime = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: EVENT_TIME_ZONE,
}).format(new Date(EVENT_END_DATE));

export const EVENT_CONFIG = {
  name: 'IEDC IDEA SPRINT 2026',
  tagline: 'Start messy. Validate fast. Learn in public.',
  description: `A ${EVENT_DURATION_HOURS}-hour student ideathon to identify a real challenge, build a first solution and learn by testing it with others.`,
  durationHours: EVENT_DURATION_HOURS,
  duration: `${EVENT_DURATION_HOURS} HOURS`,
  type: `${EVENT_DURATION_HOURS}-HOUR IDEATHON`,
  
  // Format: ISO 8601 with IST offset (+05:30)
  startDate: EVENT_START_DATE,
  endDate: EVENT_END_DATE,
  
  displayDate: formatEventDateRange(EVENT_START_DATE, EVENT_END_DATE),
  displayDateShort: formatEventDateRange(EVENT_START_DATE, EVENT_END_DATE, 'short'),
  displayTime: `${eventEndTime} IST`,
  
  venue: 'College of Engineering Chengannur',
  venueShort: 'CEC, Chengannur',
  
  host: {
    name: 'IEDC BOOTCAMP CEC',
    fullName: 'Innovation and Entrepreneurship Development Cell',
    institution: 'College of Engineering Chengannur',
    tagline: 'Experiment. Validate. Ship. Repeat.',
    website: 'https://www.iedcbootcampcec.org',
    instagram: 'https://www.instagram.com/iedcbootcampcec',
    linkedin: 'https://www.linkedin.com/company/iedc-bootcamp-cec',
    email: 'iedc_bootcamp@ceconline.edu',
    mascot: 'Volt',
  },

  pillars: [
    {
      number: '01',
      title: 'IDEATE',
      description: 'Start with a real problem. Turn rough thoughts into a clear direction worth exploring.',
    },
    {
      number: '02',
      title: 'BUILD',
      description: 'Make an early version, put it to the test and improve it with your team.',
    },
    {
      number: '03',
      title: 'LAUNCH',
      description: 'Share what you made, learn from feedback and decide what to try next.',
    },
  ],

  brandStrip: ['IDEATE', 'BUILD', 'LAUNCH', 'COLLABORATE', 'INNOVATE'],
};
