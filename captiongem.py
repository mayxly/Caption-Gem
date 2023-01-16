import os
import openai
import argparse
import re
from typing import List

MAX_INPUT_LENGTH = 32

def main() :
    #Get user input on argument
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(f"User input: {user_input}")
    
    if validate_length(user_input):
        caption_result = generate_caption(user_input)
        hashtags_result = generate_hashtags(user_input)
        print(f"Caption: {caption_result}")
        print(f"Hashtags: {hashtags_result}")
    else: 
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters")
    pass

def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_caption(prompt: str) -> str:
    openai.organization = "org-ANXc2oe4bjcZRmI0hDgLUHdj"
    openai.api_key = "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"

    enriched_prompt = f"Generate an engaging caption for {prompt}: "
    # print(enriched_prompt)
    response = openai.Completion.create(engine="text-davinci-003", prompt=enriched_prompt, max_tokens=32)
    caption = response["choices"][0]["text"].strip()

    #Add an elipses on the caption if it's too long
    # last_char = caption[-1]
    # if last_char not in {"\""}:
    #     caption += "..."
    return caption

def generate_hashtags(prompt: str) -> List[str]:
    openai.organization = "org-ANXc2oe4bjcZRmI0hDgLUHdj"
    openai.api_key = "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"

    enriched_prompt = f"Generate hashtags for {prompt}: "
    response = openai.Completion.create(engine="text-davinci-003", prompt=enriched_prompt, max_tokens=50)
    hashtags = response["choices"][0]["text"].strip()
    hashtags_array = re.split("\s", hashtags)
    return hashtags_array

if __name__ == "__main__":
    main()


