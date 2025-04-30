import os
from ocr.extractor import extract_text_from_image
from gpt.scheduler import get_schedule_json
from utils.file_handler import list_png_files, ensure_folder_exists, save_text_to_file

POSTER_FOLDER = './poster'
OUTPUT_FOLDER = './poster_json'

def main():
    ensure_folder_exists(OUTPUT_FOLDER)
    poster_files = list_png_files(POSTER_FOLDER)

    print(f"📂 총 {len(poster_files)}개의 포스터 파일을 찾음.")

    for poster_file in poster_files:
        try:
            poster_path = os.path.join(POSTER_FOLDER, poster_file)
            ocr_text = extract_text_from_image(poster_path)
            schedule_json = get_schedule_json(ocr_text)

            base_name = os.path.splitext(poster_file)[0]
            output_path = os.path.join(OUTPUT_FOLDER, f"{base_name}.json")
            save_text_to_file(output_path, schedule_json)

        except Exception as e:
            print(f"{poster_file} 처리 중 에러 발생: {e}")

if __name__ == "__main__":
    main()
