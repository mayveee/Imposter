import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import localforage from 'localforage'
import { PosterData } from '../types/PosterData'
import { jsonToCalendarEvent } from '../utils/jsonToCalendarEvents'
import { overlay } from 'overlay-kit'
import './Calendar.css'
import PosterOverlay from '../components/PosterOverlay'
import '../styles/LegendColors.css'
import { isDateInRange } from '../utils/dateUtils'
import { DateClickArg } from '@fullcalendar/interaction'

export default function PosterCalendar() {
  const [events, setEvents] = useState<any[]>([])

  const loadData = async () => {
    const loadedData = await localforage.getItem<PosterData[]>('posterData')
    if (loadedData) {
      const calEvents = jsonToCalendarEvent(loadedData)
      setEvents(calEvents)
    }
    else {
      setEvents([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDateClick = (arg: DateClickArg) => {
    const selected = events.filter(ev => {
      console.log(arg.dateStr, ev.start, ev.end)
      return isDateInRange(arg.dateStr, ev.start, ev.end)
    })

    overlay.open(({ isOpen, close, unmount }) => (
      <PosterOverlay
        isOpen={isOpen}
        dateStr={arg.dateStr}
        events={selected}
        onClose={() => {
          close()
          unmount()
        }}
      />
    ))
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ko"
        events={events}
        height="auto"
        eventDisplay="block"
        fixedWeekCount={true} // 모든 달 6주로 고정
        displayEventTime={false}// 이벤트에 시간 빼고 이름만 표시
        dayMaxEventRows={2}// 하루 이벤트 줄 수로 제한
        dayMaxEvents={2}// 하루 이벤트 개수로 제한
        headerToolbar={{ // title box 순서
          start: 'prev',
          center: 'title',
          end: 'today next'
        }}
        titleFormat={(date) => `${date.date.year}.${date.date.month + 1}`}// 년.월 을 2025.5
        dayCellContent={(arg) => arg.date.getDate().toString()} // '일' 글자 제거
        moreLinkContent={(args) => { // + 1 more 글자 제거
          return `+${args.num}`;
        }}
        dateClick={handleDateClick}        
      />
    </div>   
  )
}
