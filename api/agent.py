import os
import importlib.util
import inspect
from dotenv import load_dotenv

from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import BaseTool
from langchain.memory import ConversationBufferWindowMemory

# Load environment variables from .env file
load_dotenv()

# Ensure the OpenAI API key is set
if os.getenv("OPENAI_API_KEY") is None:
    raise ValueError("OPENAI_API_KEY environment variable not set. Please create a .env file and add your key.")

# --- Dynamic Tool Loading ("Mind Modules") ---

def load_tools_from_directory(directory: str):
    tools = []
    # Adjust the path for serverless environment
    path = os.path.join(os.path.dirname(__file__), directory)
    for filename in os.listdir(path):
        if filename.endswith(".py") and not filename.startswith("__"):
            module_name = filename[:-3]
            module_path = os.path.join(path, filename)
            spec = importlib.util.spec_from_file_location(module_name, module_path)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            for name, obj in inspect.getmembers(module):
                if isinstance(obj, BaseTool):
                    tools.append(obj)
    return tools

tools = load_tools_from_directory("modules")
print(f"Loaded {len(tools)} tools: {[tool.name for tool in tools]}")


# --- Memory for Serverless ---
# NOTE: This memory is not persistent. It only lasts for the duration of a single session.
# For persistent memory on Vercel, a cloud database (e.g., Pinecone, Momento) is required.
memory = ConversationBufferWindowMemory(
    k=5, # Remembers the last 5 turns of the conversation
    memory_key="chat_history",
    return_messages=True,
    input_key="input"
)

# --- Agent Setup ---

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant named Neura. You have access to tools and a short-term memory of the conversation."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

agent = create_openai_tools_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, memory=memory, verbose=True)


def run_agent(input_text: str, session_id: str):
    """
    Runs the LangChain agent.
    NOTE: In a real serverless app, you'd manage memory per session_id.
    This example uses a single shared memory instance.
    """
    response = agent_executor.invoke({"input": input_text})
    return response["output"]
