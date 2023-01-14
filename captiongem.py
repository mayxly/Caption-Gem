import os
import openai
openai.organization = "org-ANXc2oe4bjcZRmI0hDgLUHdj"
openai.api_key = os.getenv("OPENAI_API_KEY")
response = openai.Completion.create(engine="davinci", prompt="This is a test", max_tokens=5)
print(response)
openai.Model.list()
