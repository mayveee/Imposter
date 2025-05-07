import { PosterData } from '../types/PosterData'

export const jsonToCalendarEvent = (data: PosterData[]) => {
  return data.map(event => {
    const start = event.timestart.includes(':') ? event.timestart : `${event.timestart} 00:00`
    const end = event.timeend.includes(':') ? event.timeend : `${event.timeend} 23:59`
    return {
      title: event.title,
      start,
      end,
      extendedProps: event,
      allDay: false,
      classNames: [`legend-${event.legend}`]
    }
  })
}