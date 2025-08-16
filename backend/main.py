from fastapi import FastAPI

app=FastAPI()

@app.get("/test")
def get_details():
    return("Yes working")