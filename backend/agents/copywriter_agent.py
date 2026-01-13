from openrouter_client import call_openrouter

MODEL = "google/gemma-3n-e2b-it:free"

SYSTEM_PROMPT = """You are an expert copywriter and marketing specialist.
Your role is to create compelling, conversion-focused copy for websites.

Generate:
1. Powerful headlines and subheadlines
2. Engaging hero section copy
3. Feature descriptions that sell benefits
4. Clear, action-oriented CTA button text
5. Microcopy for various sections

Write in a premium, professional tone. Focus on clarity and conversion."""

async def run_copywriter_agent(user_prompt: str) -> str:
    """
    Copywriter Agent - Creates marketing copy and microcopy.
    
    Args:
        user_prompt: User's website request
    
    Returns:
        Marketing copy for all sections
    """
    enhanced_prompt = f"""Create premium marketing copy for the following website:

{user_prompt}

Provide:
- Hero headline and subheadline
- Feature section titles and descriptions
- CTA button text
- Any other relevant microcopy

Make it compelling and conversion-focused."""
    
    response = await call_openrouter(MODEL, enhanced_prompt, SYSTEM_PROMPT)
    return response
