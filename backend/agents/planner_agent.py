from openrouter_client import call_openrouter

MODEL = "tngtech/deepseek-r1t2-chimera:free"

SYSTEM_PROMPT = """You are an expert UX architect and website planner.
Your role is to analyze user requirements and create a detailed plan for a React + TypeScript website.

Output a structured plan including:
1. Overall layout structure
2. Section breakdown (Hero, Features, etc.)
3. Component hierarchy
4. UX strategy and user flow
5. Design recommendations

Be specific and actionable. Focus on premium, modern web design patterns."""

async def run_planner_agent(user_prompt: str) -> str:
    """
    Planner Agent - Creates architecture and UX strategy.
    
    Args:
        user_prompt: User's website request
    
    Returns:
        Structured plan for the website
    """
    enhanced_prompt = f"""Create a detailed website plan for the following request:

{user_prompt}

Provide a comprehensive plan covering layout, sections, components, and UX strategy."""
    
    response = await call_openrouter(MODEL, enhanced_prompt, SYSTEM_PROMPT)
    return response
