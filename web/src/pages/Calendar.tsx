import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import localforage from 'localforage'
import { PosterData } from '../types/PosterData'
import { jsonToCalendarEvent } from '../utils/jsonToCalendarEvents'
import './Calendar.css'

export default function PosterCalendar() {
  const [events, setEvents] = useState<any[]>([])
  const [clickedDateEvents, setClickedDateEvents] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickedDate, setClickedDate] = useState<string | null>(null)

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

  const handleDateClick = (arg: { dateStr: string }) => {
    const selected = events.filter(ev => {
      const start = new Date(ev.start)
      const end = new Date(ev.end)
      const target = new Date(arg.dateStr)
      target.setHours(0, 0, 0, 0)
      return target >= start && target <= end
    })
    setClickedDate(arg.dateStr)
    setClickedDateEvents(selected)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setClickedDate(null)
    setClickedDateEvents([])
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">📅 {clickedDate} 일정</h2>

            {clickedDateEvents.length > 0 ? (
              <ul className="event-list">
                {clickedDateEvents.map((e, idx) => (
                  <li key={idx} className="event-item">
                    <div className="event-title">
                      <strong>{e.title}</strong>
                    </div>
                    <div className="event-time">⏰ {e.extendedProps.timestart} ~ {e.extendedProps.timeend}</div>
                    {e.extendedProps.place && (
                      <div className="event-place">📍 {e.extendedProps.place}</div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>해당 날짜에 일정이 없습니다.</p>
            )}

            <button className="modal-close-btn" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>   
  )
}
