from fastapi import FastAPI,UploadFile,File
import PyPDF2
import io
app=FastAPI()

def extract_pdf(file:UploadFile):
    pdf_reader=PyPDF2.PdfReader(file)
    text=""
    for page in pdf_reader.pages:
        text+=page.extract_text()or""
    return text

@app.post('/uploade_resume')
async def upload_resume(file:UploadFile=File(...)):
    file_content=await file.read()
    pdf_file=io.BytesIO(file_content)

    text=extract_pdf(pdf_file)

    return {'resume_text':text[:500]}
