from openai import OpenAI

client = OpenAI(api_key="secret")

SYSTEM_PROMPT = """
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

def get_schedule_json(ocr_text: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT.strip()},
            {"role": "user", "content": ocr_text}
        ],
        temperature=0.2
    )
    return response.choices[0].message.content
