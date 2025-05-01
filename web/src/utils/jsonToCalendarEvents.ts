import { PosterData } from '../types/PosterData'

export const jsonToCalendarEvent = (data: PosterData[]) => {
  return data.map(event => ({
    title: event.title,
    start: event.timestart,
    end: event.timeend,
    extendedProps: event,
    allDay: false,
    classNames: [`legend-${event.legend}`]
  }))
}
