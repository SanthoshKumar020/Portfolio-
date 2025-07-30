import os
import importlib.util
import inspect
from dotenv import load_dotenv

from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import BaseTool
from langchain.memory import ConversationBufferMemory
from langchain.vectorstores import Chroma

# Load environment variables from .env file
load_dotenv()

# Ensure the OpenAI API key is set
if os.getenv("OPENAI_API_KEY") is None:
    raise ValueError("OPENAI_API_KEY environment variable not set.")

# --- Dynamic Tool Loading ("Mind Modules") ---

def load_tools_from_directory(directory: str):
    tools = []
    for filename in os.listdir(directory):
        if filename.endswith(".py") and not filename.startswith("__"):
            module_name = filename[:-3]
            module_path = os.path.join(directory, filename)
            spec = importlib.util.spec_from_file_location(module_name, module_path)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            for name, obj in inspect.getmembers(module):
                if isinstance(obj, BaseTool):
                    tools.append(obj)
    return tools

tools = load_tools_from_directory("backend/modules")
print(f"Loaded {len(tools)} tools: {[tool.name for tool in tools]}")


# --- Persistent Memory Setup ---

# The vectorstore will store embeddings of the conversation history.
vectorstore = Chroma(
    collection_name="neura_memory",
    embedding_function=OpenAIEmbeddings(),
    persist_directory="./backend/memory_db"
)

# The memory object manages the chat history.
# For the MVP, we'll use a single, hardcoded session ID.
SESSION_ID = "user_session_123"
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True,
    input_key="input"
)

# --- Agent Setup ---

llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# The new prompt includes a placeholder for chat history.
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant named Neura. You have access to tools and a memory of the conversation."),
        MessagesPlaceholder(variable_name="chat_history"),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ]
)

agent = create_openai_tools_agent(llm, tools, prompt)

# The AgentExecutor now includes the memory object.
agent_executor = AgentExecutor(agent=agent, tools=tools, memory=memory, verbose=True)


def run_agent(input_text: str):
    """
    Runs the LangChain agent with the given input text and manages memory.
    """
    # We manually manage the memory for this implementation.
    # In a production app, session IDs would be handled per user.
    chat_history = memory.load_memory_variables({"input": ""})["chat_history"]

    response = agent_executor.invoke(
        {"input": input_text, "chat_history": chat_history}
    )

    # Save the context of this turn to memory
    memory.save_context(
        {"input": input_text},
        {"output": response["output"]}
    )

    # Persist the vectorstore
    vectorstore.persist()

    return response["output"]

if __name__ == '__main__':
    print("\n--- First Turn ---")
    output = run_agent("my name is bob")
    print(f"Agent output: {output}")

    print("\n--- Second Turn ---")
    output = run_agent("what is my name?")
    print(f"Agent output: {output}")

    print("\n--- Third Turn (Tool Use) ---")
    output = run_agent("turn on the wifi")
    print(f"Agent output: {output}")
