"""
OpenRouter API client for making AI model requests.
"""
import httpx
import traceback
from app.config import OPENROUTER_API_KEY, OPENROUTER_BASE_URL

class OpenRouterAPIError(Exception):
    """Custom exception for OpenRouter API errors containing status code and details."""
    def __init__(self, status_code: int, detail: str):
        self.status_code = status_code
        self.detail = detail
        super().__init__(f"OpenRouter API error {status_code}: {detail}")


async def call_openrouter(model: str, prompt: str, system_prompt: str = "") -> str:
    """Call OpenRouter API with specified model, handling errors and retries.

    Args:
        model: Model identifier string.
        prompt: User prompt.
        system_prompt: Optional system prompt.
    Returns:
        The generated content string.
    Raises:
        OpenRouterAPIError: For HTTP errors with details.
        RuntimeError: For missing or invalid API key.
    """
    print(f"DEBUG: Calling OpenRouter ({model}) with Key: {OPENROUTER_API_KEY[:6]}...")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Vibe Coder",
    }

    messages = []
    if not system_prompt:
        system_prompt = "You are a helpful AI assistant."
    messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": model,
        "messages": messages
    }

    # Simple retry logic: up to 2 attempts for transient network errors
    for attempt in range(1, 3):
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(OPENROUTER_BASE_URL, headers=headers, json=payload)
                response.raise_for_status()
                data = response.json()
                return data["choices"][0]["message"]["content"]
        except httpx.HTTPStatusError as exc:
            # Extract error details if available
            try:
                err_detail = exc.response.json().get("error", {}).get("message", exc.response.text)
            except Exception:
                err_detail = exc.response.text
            raise OpenRouterAPIError(exc.response.status_code, err_detail) from exc
        except (httpx.TransportError, httpx.RequestError) as exc:
            if attempt == 2:
                raise RuntimeError(f"Network error contacting OpenRouter after {attempt} attempts: {exc}")
            # else retry
            continue
        except Exception as e:
            traceback.print_exc()
            print(f"Error details: {str(e)}")
            raise OpenRouterAPIError(500, f"Unexpected error contacting OpenRouter: {e}")
