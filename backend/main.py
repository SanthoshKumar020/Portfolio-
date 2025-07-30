from fastapi import FastAPI
from pydantic import BaseModel
from agent import run_agent

app = FastAPI()

class Command(BaseModel):
    command: str

@app.get("/")
def read_root():
    return {"message": "Neura Backend is running."}

@app.post("/execute-command/")
def execute_command(command: Command):
    """
    Executes a command by passing it to the LangChain agent.
    """
    response = run_agent(command.command)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    print("To run the server, use the following command:")
    print("uvicorn main:app --reload")
    uvicorn.run(app, host="0.0.0.0", port=8000)
