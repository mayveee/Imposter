import easyocr
import cv2

reader = easyocr.Reader(['ko', 'en'])

def extract_text_from_image(image_path: str) -> str:
    img = cv2.imread(image_path)
    img = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    result = reader.readtext(img, detail=False, paragraph=True)
    return "\n".join(result)
