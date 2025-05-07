import { useEffect, useState } from 'react'
import localforage from 'localforage'
import { PosterData } from '../types/PosterData'

// for test
const TEST_DATA: PosterData[] = [
  {
    timestamp: "2025-04-30T 14:45:00",
    filename: "poster1.png",
    legend: "설명회",
    title: "AI 인턴십 설명회",
    timestart: "2025-05-10 14:00",
    timeend: "2025-05-10 16:00",
    place: "공학관 101호",
    summary: "AI 기업 인턴십 설명 안내"
  },
  {
    timestamp: "2025-04-29T 10:00:00",
    filename: "poster2.jpg",
    legend: "공모전",
    title: "캡스톤 디자인 아이디어 공모전",
    timestart: "2025-05-10 09:00",
    timeend: "2025-05-31 12:00",
    place: "창의관 301호",
    summary: "창의적인 아이디어를 발굴하는 공모전"
  },
  {
    timestamp: "2025-04-29T 10:00:00",
    filename: "poster3.jpg",
    legend: "기타",
    title: "천원의 아침밥",
    timestart: "2025-04-10 09:00",
    timeend: "2025-06-30 12:00",
    place: "제 2학생회관",
    summary: "아침밥 공짜!!"
  },
  {
    timestamp: "2025-04-29T 10:00:00",
    filename: "poster4.jpg",
    legend: "부트캠프",
    title: "frontend 부트캠프 신청기간",
    timestart: "2025-05-01 11:00",
    timeend: "2025-05-31 06:00",
    place: "",
    summary: "많관부"
  }
]

export default function CalendarTest() {
  const [posters, setPosters] = useState<PosterData[]>([])

  const loadData = async () => {
    const loadedData = await localforage.getItem<PosterData[]>('posterData')
    if (loadedData){
      setPosters(loadedData)
    }
    else setPosters([])
  }

  const clearData = async () => {
    await localforage.removeItem('posterData')
    await loadData()
  }

  const addSampleData = async () => {
    const stored = await localforage.getItem<PosterData[]>('posterData')
    const updated = stored ? [...stored, ...TEST_DATA] : TEST_DATA
    await localforage.setItem('posterData', updated)
    await loadData()
  }
  

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">포스터 업로드 기록</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={clearData}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          로컬 DB 초기화
        </button>
        <button
          onClick={addSampleData}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          샘플 데이터 추가
        </button>
      </div>

      <div className="space-y-4">
        {posters.map((item, idx) => { 
          console.log(item)
          return (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-sm text-gray-500">업로드 시각</div>
            <div className="text-gray-800 font-medium mt-1">
              {item.timestamp}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>제목:</strong> {item.title}</p>
              <p><strong>분류:</strong> {item.legend}</p>
              <p><strong>일정:</strong> {item.timestart} ~ {item.timeend}</p>
              <p><strong>장소:</strong> {item.place}</p>
              <p><strong>요약:</strong> {item.summary}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}
