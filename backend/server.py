from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from datetime import datetime, timedelta
import tempfile
import os

# 로컬 모듈
from .poster2json.ocr.extractor import extract_text_from_image
from .poster2json.gpt.scheduler import get_schedule_json

app = FastAPI()

# CORS 허용 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 프론트 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/upload")
async def upload_images(images: List[UploadFile] = File(...)):
    results = []

    for file in images:
        # 임시 파일로 저장
        with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        try:
            # OCR 및 GPT 처리
            ocr_text = extract_text_from_image(tmp_path)
            schedule_json = get_schedule_json(ocr_text)

            results.append({
                "filename": file.filename,
                "json": schedule_json
            })

        except Exception as e:
            results.append({
                "filename": file.filename,
                "error": str(e)
            })

        finally:
            os.remove(tmp_path)

    kst_time = (datetime.utcnow() + timedelta(hours=9)).isoformat()
    return JSONResponse(content={
        "timestamp": kst_time,
        "results": results
    })
