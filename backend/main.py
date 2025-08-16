from fastapi import FastAPI,UploadFile,File
from models import Job
import PyPDF2
import io
app=FastAPI()

def extract_pdf(file:io.BytesIO):
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

@app.post('/job_desc')
def job_desc(job:Job):
    job_text=job.text
    return job_text
    


