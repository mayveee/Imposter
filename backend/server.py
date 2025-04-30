from fastapi import FastAPI, File, UploadFile
from typing import List
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

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
    for file in images:
        contents = await file.read()
        print(f"Received file: {file.filename}, size: {len(contents)} bytes")

    kst_time = (datetime.utcnow() + timedelta(hours=9)).isoformat()
    return JSONResponse(content={
        "status": "received",
        "timestamp": kst_time
    })
