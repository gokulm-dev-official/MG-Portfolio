import os
from pypdf import PdfReader, PdfWriter

pdf_path = os.path.join("LivePDF", "GOKUL_M_Portfolio_Live.pdf")

if os.path.exists(pdf_path):
    print(f"Original size: {os.path.getsize(pdf_path)} bytes")
    reader = PdfReader(pdf_path)
    writer = PdfWriter()

    for page in reader.pages:
        new_page = writer.add_page(page)
        new_page.compress_content_streams()

    compressed_path = os.path.join("LivePDF", "GOKUL_M_Portfolio_Live.pdf")
    with open(compressed_path, "wb") as f:
        writer.write(f)

    print(f"Compressed size: {os.path.getsize(compressed_path)} bytes")
