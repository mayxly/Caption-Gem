from fastapi import FastAPI, HTTPException
from captiongem import generate_caption, generate_hashtags

app = FastAPI()
MAX_INPUT_LENGTH = 32

@app.get("/generate_caption")
async def generate_caption_api(prompt: str):
    caption = generate_caption(prompt)
    return {"caption": caption}

@app.get("/generate_hashtags")
async def generate_hashtags_api(prompt: str):
    hashtags = generate_hashtags(prompt)
    return {"hashtags": hashtags}

@app.get("/generate_caption_and_hashtags")
async def generate_hashtags_api(prompt: str):
    validate_input_length(prompt)
    caption = generate_caption(prompt)
    hashtags = generate_hashtags(prompt)
    return {"caption": caption, "hashtags": hashtags}

def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters.",
        )

#python3 -m uvicorn captiongem_api:app --reload
