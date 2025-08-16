from fastapi import FastAPI,UploadFile,File
from models import Job
from sentence_transformers import SentenceTransformer , util
import PyPDF2
import io
app=FastAPI()
#this will just show the model wil be using minilm
model = SentenceTransformer("all-MiniLM-L6-v2")
#this is the function that will give us the text from the pdf , basically from bytes to text 
def extract_pdf(file:io.BytesIO):
    pdf_reader=PyPDF2.PdfReader(file)
    text=""
    for page in pdf_reader.pages:
        text+=page.extract_text()or""
    return text
#the file uploading part
@app.post('/uploade_resume')
async def upload_resume(file:UploadFile=File(...)):
    file_content=await file.read()#this converts the text too bytes but like not readable 
    pdf_file=io.BytesIO(file_content)#wraps to file like objects sp that pdf2 can read it 
    global text
    text=extract_pdf(pdf_file)

    return {'resume_text':text[:500]}
#job description part 
@app.post('/job_desc')
def job_desc(job:Job):
    global job_text
    job_text=job.text
    return job_text

@app.post('/matching')
def matching():
    if "job_text" not in globals() or "text" not in globals():
        return{"error":"Please upload both resume and job description"} #make sure to add not in globals and the qoutes as other wise internal server error the job_text not found
    resume_encoding=model.encode(text,convert_to_tensor=True)
    job_encoding=model.encode(job_text,convert_to_tensor=True)
    
    score =util.cos_sim(resume_encoding,job_encoding).item()

    return{'ATS_Score':round(score*100,2)}


