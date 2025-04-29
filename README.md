# 🧠 Imposter Backend - Setup Guide

이 문서는 **img2plan_prototype.py** 등 Imposter 프로젝트의 백엔드 코드를 실행하기 위한 개발 환경 구축 절차를 설명합니다.

---

## 📦 환경 요구사항

- Python 3.10 또는 3.11 권장
- pip 최신 버전
- Windows PowerShell (또는 bash)

---

## 🛠 1. 프로젝트 클론 및 가상환경(venv) 설정

```bash
# 1. 작업 폴더 이동 (예시 경로는 자유롭게 변경 가능)

# 2. 프로젝트 클론
git clone https://github.com/ImSChan/Imposter.git
cd Imposter

# 3. 가상환경 생성
python -m venv venv

# 4. PowerShell 실행 정책 일시 해제 (Windows에서 venv 오류 방지)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 5. 가상환경 활성화
.\venv\Scripts\activate
```

---

## 📥 2. 의존성 설치

### 🔹 2-1. 기본 requirements 설치

```bash
pip install -r backend/requirements.txt
```

### 🔹 2-2. PyTorch (EasyOCR 의존성) 별도 설치

PyTorch는 PyPI가 아닌 별도 저장소에서 설치해야 합니다:

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
```

> GPU 버전이 필요한 경우 공식 사이트: https://pytorch.org/get-started/locally/

---

## 🔐 3. OpenAI API 키 등록

`img2plan_prototype.py`는 OpenAI API 키를 환경변수로 불러옵니다.

```bash
$env:OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

> macOS/Linux 사용자는:
> ```bash
> export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
> ```

---

## 🚀 4. 실행

```bash
cd backend
python img2plan_prototype.py
```

> `./poster` 폴더 내 `.png` 이미지들을 읽어들여 텍스트를 추출하고 일정 JSON으로 변환합니다.

---

## 🧪 5. 종료

```bash
deactivate
```

---

## 📎 기타 참고

- Python 3.12 이상은 일부 라이브러리 호환 이슈가 있을 수 있습니다.
- 실행 에러 발생 시 `requirements.txt`에 고정된 버전 대신 `>=` 조건을 사용하는 것이 안정적입니다.
