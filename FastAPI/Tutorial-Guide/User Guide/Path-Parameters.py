from enum import Enum
from fastapi import FastAPI

class ModelName(str, Enum):
    alexnet = "alexnet"
    resnet = "resnet"
    lenet = "lenet"

app = FastAPI()

item_id = 5
item_ID = 6

# normal path parameter
@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}

@app.get("/users/me")
async def read_user_me():
    return {"user_id": "the current user"}

# paht parameters with types
@app.get("/item/{item_ID}")
async def readItem(item_ID: int):
    return {"item_ID": item_ID}

# order matters
# Because path operations are evaluated in order, you need to make sure that the path for /users/me is declared before the one for /users/{user_id}
@app.get("/users/{user_id}")
async def read_user(user_id: str):
    return {"user_id": user_id}

# predefined values
@app.get("/models/{model_name}")
async def get_model(model_name: ModelName):
    if model_name is ModelName.alexnet:
        return {"model_name": model_name, "message": "Deep Learning FTW!"}
    
    if model_name.value == "lenet":
        return {"model_name": model_name, "message": "LeCNN all the images"}
    
    return {"model_name": model_name, "message": "Have some residuals"}

# path converter
@app.get("/files/{file_path:path}")
async def read_file(file_path: str):
    return {"file_path": file_path} 