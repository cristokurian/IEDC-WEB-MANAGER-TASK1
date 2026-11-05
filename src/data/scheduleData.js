/**
 * IEDC IDEA SPRINT 2026 — Schedule Data
 * 
 * IMPORTANT: All timings are HYPOTHETICAL and for demonstration purposes only.
 * Update these values when the actual event schedule is confirmed.
 */

import { EVENT_CONFIG, formatEventDate } from './eventConfig.js';

export const SCHEDULE_DATA = [
  {
    id: 'day-1',
    label: 'DAY 01',
    date: formatEventDate(EVENT_CONFIG.startDate),
    events: [
      {
        time: '10:00 AM',
        title: 'Registration & Check-in',
        description: 'Arrive, collect your badges and get settled in.',
        icon: 'ClipboardCheck',
      },
      {
        time: '10:30 AM',
        title: 'Opening Ceremony',
        description: 'Welcome address, event overview and ground rules.',
        icon: 'Mic',
      },
      {
        time: '11:00 AM',
        title: 'Problem Discovery & Ideation',
        description: 'Identify real-world problems and brainstorm potential solutions.',
        icon: 'Lightbulb',
      },
      {
        time: '12:30 PM',
        title: 'Team Formation',
        description: 'Find your teammates and align on a shared challenge.',
        icon: 'Users',
      },
      {
        time: '01:30 PM',
        title: 'Lunch Break',
        description: 'Recharge and connect with fellow participants.',
        icon: 'Coffee',
      },
      {
        time: '02:30 PM',
        title: 'Idea Development Workshop',
        description: 'Refine your ideas with structured frameworks and mentorship.',
        icon: 'Wrench',
      },
      {
        time: '04:00 PM',
        title: 'Mentorship Session',
        description: 'One-on-one guidance from industry mentors and faculty.',
        icon: 'GraduationCap',
      },
      {
        time: '06:00 PM',
        title: 'Prototype Planning',
        description: 'Map out your solution architecture and key deliverables.',
        icon: 'LayoutDashboard',
      },
      {
        time: '08:00 PM',
        title: 'Progress Review',
        description: 'Share progress, receive feedback and recalibrate.',
        icon: 'BarChart3',
      },
      {
        time: '10:00 PM',
        endTime: '05:00 AM',
        title: 'Overnight Innovation Session',
        description: 'Deep work continues through the night for committed teams.',
        icon: 'Moon',
      },
    ],
  },
  {
    id: 'day-2',
    label: 'DAY 02',
    date: formatEventDate(EVENT_CONFIG.endDate),
    events: [
      {
        time: '05:00 AM',
        endTime: '07:00 AM',
        title: 'Prototype Finalization',
        description: 'Polish your solution, prepare your demo and finalize deliverables.',
        icon: 'CheckCircle',
      },
      {
        time: '07:00 AM',
        endTime: '08:00 AM',
        title: 'Final Presentations',
        description: 'Present your solution to the jury and audience.',
        icon: 'Presentation',
      },
      {
        time: '08:00 AM',
        endTime: '09:00 AM',
        title: 'Jury Evaluation',
        description: 'Expert panel reviews and scores each team\'s solution.',
        icon: 'Scale',
      },
      {
        time: '09:00 AM',
        endTime: '10:00 AM',
        title: 'Results & Closing Ceremony',
        description: 'Winners announced, certificates distributed and closing remarks.',
        icon: 'Trophy',
      },
    ],
  },
];
