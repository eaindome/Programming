from fastapi import FastAPI

app = FastAPI()

fake_items_db = [
    {"item_name": "Foo"},
    {"item_name": "Bar"},
    {"item_name": "Baz"}
]

# query parameters
@app.get("/items")
async def read_item(skip: int = 0, limit: int = 10):
    return fake_items_db[skip : skip + limit]

# optional parameters
@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str | None = None):
    if q:
        return {"item_id": item_id, "q": q}
    return {"item_id": item_id}

# query parameter type conversion
@app.get("/item/{item_ID}")
async def read_Item(item_ID: str, q: str | None = None, short: bool = False):
    item = {"item_id": item_ID}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {
                "description": "This is an amazing item that has a long description."
            }
        )
    return item

# required qurey parameters
@app.get("/itemS/{item_id}")
async def read_user_item(item_id: str, needy: str):
    item = {"item_id": item_id, "needy": needy}
    return item

# combining all 3
@app.get("/items/{item_id}")
async def read_user_items(
    item_id: str,
    needy: str,
    skip: int = 0,
    limit: int | None = None
):
    item = {
        "item_id": item_id,
        "needy": needy,
        "skip": skip,
        "limit": limit
    }
    return item