import { renderValue } from "../utils/renderValue"
import "./PosterOverlay.css"
import "../styles/LegendColors.css"
import { motion } from 'framer-motion'

type PosterOverlayProps = {
    isOpen: boolean
    dateStr: string
    events: any[]
    onClose: () => void
}

export default function PosterOverlay({ isOpen, dateStr, events, onClose }: PosterOverlayProps) {
    const modalVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
    }
      
    return (
        isOpen && (
            <div 
                className="modal-overlay"
            >
            <motion.div
                className="modal-content"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2, ease: 'easeOut' }}
            >
                <h2 className="modal-title">📅 {dateStr} 일정</h2>
                    {events.length > 0 ? (
                        <ul className="event-list">
                        {events.map((e, idx) => (
                            <li key={idx} className={`event-item legend-${e.extendedProps.legend}`}>
                                <div className="event-title"><strong>{e.title}</strong></div>
                                <div className="event-legend">{e.extendedProps.legend}</div>
                                <div className="event-time">⏰ {e.extendedProps.timestart} ~ {e.extendedProps.timeend}</div>
                                {renderValue(e.extendedProps.place, (
                                    <div className="event-place">📍 {e.extendedProps.place}</div>
                                ))}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>해당 날짜에 일정이 없습니다.</p>
                    )}
                <button className="modal-close-btn" onClick={onClose}>닫기</button>
            </motion.div>
        </div>
        )
    )
}
