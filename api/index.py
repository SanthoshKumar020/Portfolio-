from fastapi import FastAPI
from pydantic import BaseModel
from agent import run_agent
import uvicorn

app = FastAPI()

class Command(BaseModel):
    command: str
    session_id: str = "default_session"

@app.get("/api")
def read_root():
    return {"message": "Neura API is running."}

@app.post("/api/execute")
def execute_command(command: Command):
    """
    Executes a command using the LangChain agent.
    The session_id is included for future multi-user memory management.
    """
    response = run_agent(command.command, command.session_id)
    return {"response": response}

# This part is for local testing and will not be used by Vercel
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
