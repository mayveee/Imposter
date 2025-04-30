import os

def list_png_files(folder: str) -> list:
    return [f for f in os.listdir(folder) if f.lower().endswith('.png')]

def ensure_folder_exists(folder: str):
    os.makedirs(folder, exist_ok=True)

def save_text_to_file(filepath: str, content: str):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
