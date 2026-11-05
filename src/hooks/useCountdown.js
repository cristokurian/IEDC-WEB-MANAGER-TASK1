import { useState, useEffect, useCallback } from 'react';
import { EVENT_CONFIG } from '../data/eventConfig';

/**
 * Custom hook for the live event countdown.
 * 
 * States:
 * - 'upcoming': Event hasn't started yet, shows countdown.
 * - 'live': Event is currently ongoing.
 * - 'ended': Event has concluded.
 */
export function useCountdown() {
  const getTimeState = useCallback(() => {
    const now = new Date();
    const start = new Date(EVENT_CONFIG.startDate);
    const end = new Date(EVENT_CONFIG.endDate);

    if (now < start) {
      const diff = start - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return {
        status: 'upcoming',
        days,
        hours,
        minutes,
        seconds,
        total: diff,
      };
    } else if (now >= start && now < end) {
      const diff = end - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return {
        status: 'live',
        days: 0,
        hours,
        minutes,
        seconds,
        total: diff,
      };
    } else {
      return {
        status: 'ended',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      };
    }
  }, []);

  const [timeState, setTimeState] = useState(getTimeState);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeState(getTimeState());
    }, 1000);

    return () => clearInterval(interval);
  }, [getTimeState]);

  return timeState;
}
