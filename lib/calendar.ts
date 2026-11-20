import { EventDetails } from '@/types/event';

/**
 * Generates RFC 5545 compliant iCalendar (.ics) content.
 * Event date: 2026-12-04 13:15:00 UTC-3 -> 20261204T161500Z UTC
 * End date:   2026-12-04 17:00:00 UTC-3 -> 20261204T200000Z UTC
 */
export function generateIcsContent(event: EventDetails): string {
  const dtStart = '20261204T161500Z';
  const dtEnd = '20261204T200000Z';
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IES 9 Juana Azurduy//Ateneo TIC 2026//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:ateneo-tic-2026-${now}@ies9.edu.ar`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title} — ${event.cohort}`,
    `DESCRIPTION:${event.organizer}. Muestra anual de proyectos de innovación, programación y robótica educativa.\\n\\nConocé más: ${event.landingUrl}`,
    `LOCATION:${event.institution}, ${event.locationCity}`,
    `URL:${event.landingUrl}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio: Ateneo TIC 2026 comienza en 2 horas',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Triggers a browser download of the generated .ics file.
 */
export function downloadIcsFile(event: EventDetails, fileName = 'Ateneo-TIC-2026.ics'): void {
  const icsContent = generateIcsContent(event);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Builds Google Calendar web add link.
 */
export function getGoogleCalendarUrl(event: EventDetails): string {
  const base = 'https://calendar.google.com/calendar/render';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${event.title} · ${event.cohort}`,
    dates: '20261204T161500Z/20261204T200000Z',
    details: `${event.organizer}\n${event.institution}\nWeb: ${event.landingUrl}`,
    location: `${event.institution}, ${event.locationCity}`,
  });
  return `${base}?${params.toString()}`;
}

/**
 * Builds standard WhatsApp sharing link.
 */
export function getWhatsAppShareUrl(text: string): string {
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}
