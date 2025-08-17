'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function File() {
  const [resumeFileName, setResumeFileName] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [Atsbutton , setAtsbutton]=useState(true)
  const [jobText , setJobText]=useState("")

  const handlePdf = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://127.0.0.1:8000/uploade_resume", {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();
    setResumeFileName(json.resume_text);
    setAtsbutton(false);
  };

  const handleJobdescription=async(e)=>{
   
      const text = e.target.value;
      setJobText(text)
      console.log(text)
      setAtsbutton(false)
     
    const res=await fetch('http://127.0.0.1:8000/job_desc',{
        method:'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    })
    const json = await res.json()
    setJobText(json.job_text)
   

  }

  const handleATS = async()=>{
      const res= await fetch('http://127.0.0.1:8000/matching',{
        method:'POST'
        
      })
      const json = await res.json()
      setAtsScore(json.ATS_Score)
     
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input type="file" accept=".pdf" onChange={handlePdf}/>
          {resumeFileName && <p>Resume Preview: {resumeFileName.slice(0, 200)}...</p>}
         
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            value={jobText}
            placeholder="Type or paste job description here"
            onChange={handleJobdescription}
           
            
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ATS Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
           disabled={Atsbutton}
           onClick={handleATS}
          >Compute ATS Score</Button>
          
             <p>{Atsbutton ? "Enter both the job description and resume" : atsScore}</p>

          
          
        </CardContent>
      </Card>
    </div>
  );
}
