import { useEffect, useState } from 'react'
import localforage from 'localforage'

type UploadResult = {
  status: string
  timestamp: string
}

export default function Calendar() {
  const [results, setResults] = useState<UploadResult[]>([])

  useEffect(() => {
    const loadData = async () => {
      const stored = await localforage.getItem<UploadResult[]>('analysisResults')
      if (stored) setResults(stored)
    }
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">업로드 기록</h1>
      <div className="space-y-4">
        {results.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-sm text-gray-500">업로드 시각</div>
            <div className="text-gray-800 font-medium mt-1">
              {new Date(item.timestamp).toLocaleString('ko-KR')}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              상태: <span className="font-semibold">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
