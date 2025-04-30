from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from datetime import datetime, timedelta

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    print(f"Received file: {file.filename}, size: {len(contents)} bytes")

    # KST = UTC + 9시간
    kst_time = (datetime.utcnow() + timedelta(hours=9)).isoformat()
    return JSONResponse(content={
        "status": "received",
        "timestamp": kst_time
    })
