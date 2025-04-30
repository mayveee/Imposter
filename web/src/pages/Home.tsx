import { useNavigate } from 'react-router-dom'

export default function Home() {
    const naviagate = useNavigate()

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-10">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
           Imposter에 오신 걸 환영해요 🎉
          </h1>
          <p className="text-gray-600 text-base mb-8">
           포스터를 사진으로 찍기만 하면<br />
           자동으로 요약하고 일정으로 정리해드려요.
          </p>
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-medium shadow-md hover:bg-blue-700 transition" onClick={() => naviagate('/upload')}>
           시작하기
          </button>
        </div>
      </div>
  )
}
  