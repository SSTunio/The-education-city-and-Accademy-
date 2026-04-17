from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from supabase_client import supabase

app = FastAPI(title="Education City & AI Academy API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class RegistrationSchema(BaseModel):
    name: str
    name_ur: str
    dob: str
    gender: str
    cnic: str
    class_name: str
    address: str
    father_name: str
    contact: str
    email: Optional[str] = None
    whatsapp: Optional[str] = None
    program: str
    course: str
    batch: str
    source: str
    username: str
    password: str

class CourseSchema(BaseModel):
    id: Optional[str] = None
    name: str
    track: str # e.g. Beginner, Intermediate, Advanced
    program_type: Optional[str] = "Weekday" # Weekend or Weekday
    trainer: Optional[str] = ""
    duration: Optional[str] = ""
    topics: Optional[str] = "" # Comma separated
    status: Optional[str] = "Active"

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Education City & AI Academy API"}

@app.get("/api/stats")
def get_stats():
    return {
        "students": 320,
        "programs": 2,
        "courses": 9,
        "pass_rate": "95%",
        "trainers": 6
    }

@app.post("/api/register")
def register_student(reg: RegistrationSchema):
    try:
        data = supabase.table("registrations").insert({
            "student_name": reg.name,
            "course": reg.course,
            "program_type": reg.program,
            "status": "pending",
            "created_at": datetime.now().isoformat()
        }).execute()
        return {"status": "success", "message": "Registration submitted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/announcements")
def get_announcements():
    try:
        res = supabase.table("announcements").select("*").order("created_at", desc=True).limit(5).execute()
        return res.data
    except Exception:
        return []

# Course Management Endpoints
@app.get("/api/courses")
def get_courses():
    try:
        res = supabase.table("courses").select("*").order("program_type", desc=True).order("created_at", desc=True).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/courses")
def upsert_course(course: CourseSchema):
    try:
        payload = {
            "name": course.name,
            "track": course.track,
            "program_type": course.program_type,
            "trainer": course.trainer,
            "duration": course.duration,
            "topics": course.topics,
            "status": course.status
        }
        
        if course.id:
            # Update
            data = supabase.table("courses").update(payload).eq("id", course.id).execute()
        else:
            # Insert
            data = supabase.table("courses").insert(payload).execute()
            
        return {"status": "success", "data": data.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/courses/{course_id}")
def delete_course(course_id: str):
    try:
        supabase.table("courses").delete().eq("id", course_id).execute()
        return {"status": "success", "message": "Course deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
