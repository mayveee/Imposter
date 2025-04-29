import easyocr
import cv2
import os
from openai import OpenAI

# GPT API 초기화
gpt_api_key = "secret"
client = OpenAI(api_key=gpt_api_key)

# GPT 프롬프트 정의
system_prompt = """
너는 숙련된 일정 구조화 마스터야. 주어진 한국어 텍스트에서 행사 일정을 다음 JSON 형태로 변환해줘.
이미지 OCR을통해 가져온 텍스트이기때문에 텍스트가 많이 부정확할 수 있어. 텍스트도 맥락에 맞게 보정해서 넣어줘.
- legend: 공모전/설명회/교육/부트캠프/기타 중 택 1
- title: 행사 제목 요약
- timestart: 행사 시작일(형식: yyyy-MM-dd HH:mm)
- timeend: 행사 종료일(형식: yyyy-MM-dd HH:mm)
- place: 행사 장소
- summary: 행사 설명 요약

반드시 이 형태로 JSON 배열로만 응답해줘. 설명, 코드블록 쓰지 마.(```json 이런거 쓰지말라는 뜻.)
"""

# GPT 호출 함수
def ask_gpt_for_schedule(ocr_text):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt.strip()},
            {"role": "user", "content": ocr_text}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content


# EasyOCR Reader 초기화 (한글+영어)
reader = easyocr.Reader(['ko', 'en'])

# 포스터 폴더 경로
poster_folder = './poster'

# 결과 저장 폴더 생성
output_folder = './poster_json'
os.makedirs(output_folder, exist_ok=True)

# 폴더 내 모든 PNG 파일 찾기
poster_files = [f for f in os.listdir(poster_folder) if f.lower().endswith('.png')]

print(f"📂 총 {len(poster_files)}개의 포스터 파일을 찾음.")

for poster_file in poster_files:
    try:
        poster_path = os.path.join(poster_folder, poster_file)

        # 이미지 로드 및 해상도 업스케일
        img = cv2.imread(poster_path)
        img = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

        # EasyOCR 추출
        ocr_result = reader.readtext(img, detail=False, paragraph=True)
        ocr_text = "\n".join(ocr_result)

        # GPT 호출해서 일정 JSON 변환
        schedule_json = ask_gpt_for_schedule(ocr_text)

        # 파일 이름 기반으로 저장
        base_name = os.path.splitext(poster_file)[0]
        output_path = os.path.join(output_folder, f"{base_name}.json")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(schedule_json)


    except Exception as e:
        print(f"{poster_file} 처리 중 에러 발생: {e}")
