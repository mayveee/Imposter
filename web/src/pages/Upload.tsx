// src/pages/Upload.tsx
import { useState } from 'react'
import localforage from 'localforage'

export default function Upload() {
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const selectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
        const newFiles = Array.from(files)
        const newUrls = newFiles.map(file => URL.createObjectURL(file))

        setImageFiles(prev => [...prev, ...newFiles])
        setImageUrls(prev => [...prev, ...newUrls])
        }
    }

    const removeImage = (indexToRemove: number) => {
        setImageFiles(prev => prev.filter((_, idx) => idx !== indexToRemove))
        setImageUrls(prev => prev.filter((_, idx) => idx !== indexToRemove))
    }

    const uploadImages = async () => {
        if (imageFiles.length === 0) return alert('이미지를 선택해주세요.')

        const formData = new FormData()
        imageFiles.forEach(file => formData.append('images', file))

        try {
            setLoading(true)
            const response = await fetch('http://127.0.0.1:8000/upload', {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) throw new Error('업로드 실패')
            
            const resultJson = await response.json()

            const existing = (await localforage.getItem<any[]>('analysisResults')) || []
            await localforage.setItem('analysisResults', [...existing, resultJson])
            alert('업로드 및 저장 완료!')
        } catch (err) {
            console.error(err)
            alert('업로드 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="max-w-md mx-auto">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        사진 업로드
                    </h1>
                    <div className="flex justify-center mb-6">
                        <label
                            htmlFor="image-upload"
                            className="cursor-pointer inline-block bg-white border border-gray-300 text-gray-800 text-sm px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100"
                        >
                            파일 선택
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            onChange={selectImages}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                            <img
                            src={url}
                            alt={`선택한 이미지 ${index + 1}`}
                            className="w-full aspect-[3/4] object-cover rounded-md shadow-sm"
                            />
                            <button
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-white border border-gray-400 text-gray-700 text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-sm"
                            aria-label="삭제"
                            >
                            ×
                            </button>
                        </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sticky bottom-0 w-full bg-gray-100 px-4 py-3 shadow-md">
                <button
                    onClick={uploadImages}
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-base font-medium transition ${
                    loading
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                >
                    {loading ? '업로드 중...' : '업로드하기'}
                </button>
            </div>
        </div>
    )
}
