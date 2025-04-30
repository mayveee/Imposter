import { useEffect, useState } from 'react'
import localforage from 'localforage'

type Result = {
  id: number
  title: string
  date: string
  summary: string
}

export default function Calendar() {
  const [results, setResults] = useState<Result[]>([])

  useEffect(() => {
    const loadData = async () => {
      const stored = await localforage.getItem<Result[]>('analysisResults')
      if (stored) setResults(stored)
    }
    loadData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">저장된 포스터 요약</h1>
      <div className="space-y-4">
        {results.map(item => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-sm text-gray-500">{item.date}</div>
            <div className="text-lg font-semibold text-gray-800">{item.title}</div>
            <div className="text-gray-600 mt-2">{item.summary}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
