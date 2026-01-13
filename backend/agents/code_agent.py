from openrouter_client import call_openrouter

MODEL = "qwen/qwen3-coder:free"

SYSTEM_PROMPT = """You are an expert React + TypeScript developer.
Your role is to generate clean, production-ready React components.

Requirements:
- Use React functional components with TypeScript
- Use proper TypeScript interfaces and types
- Include inline styles or CSS modules
- Follow best practices (hooks, props, composition)
- Generate complete, runnable components
- Use modern React patterns

Output only the code, properly formatted and ready to use."""

async def run_code_agent(user_prompt: str, plan: str = "", copy: str = "") -> str:
    """
    Code Generator Agent - Creates React TSX components.
    
    Args:
        user_prompt: User's website request
        plan: Output from planner agent (optional)
        copy: Output from copywriter agent (optional)
    
    Returns:
        React + TypeScript component code
    """
    context = f"""Generate React + TypeScript components for:

{user_prompt}"""
    
    if plan:
        context += f"\n\nArchitecture Plan:\n{plan}"
    
    if copy:
        context += f"\n\nMarketing Copy:\n{copy}"
    
    context += """

Generate complete React TSX components including:
1. Main App.tsx
2. Individual section components (Hero, Features, etc.)
3. Proper TypeScript interfaces
4. Inline styles or CSS

Provide clean, production-ready code."""
    
    response = await call_openrouter(MODEL, context, SYSTEM_PROMPT)
    return response
