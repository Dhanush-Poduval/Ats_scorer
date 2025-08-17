'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function File() {
  const [resumeFileName, setResumeFileName] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [atsScore, setAtsScore] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input type="file" accept=".pdf"  />
         
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            placeholder="Type or paste job description here"
           
            
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ATS Score</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button>Compute ATS Score</Button>
         
        </CardContent>
      </Card>
    </div>
  );
}
