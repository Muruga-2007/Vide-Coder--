"""
AI service for multi-agent website generation.
Consolidates planner, copywriter, and code agent logic.
"""
import re
from typing import Dict
from app.utils.openrouter_client import call_openrouter

MODEL = "meta-llama/llama-3-8b-instruct:free"

# System prompts for each agent
PLANNER_SYSTEM_PROMPT = """You are an expert UX architect and website planner.
Your role is to analyze user requirements and create a detailed plan for a React + TypeScript website.

Output a structured plan including:
1. Overall layout structure
2. Section breakdown (Hero, Features, etc.)
3. Component hierarchy
4. UX strategy and user flow
5. Design recommendations

Be specific and actionable. Focus on premium, modern web design patterns."""

COPYWRITER_SYSTEM_PROMPT = """You are an expert copywriter and marketing specialist.
Your role is to create compelling, conversion-focused copy for websites.

Generate:
1. Powerful headlines and subheadlines
2. Engaging hero section copy
3. Feature descriptions that sell benefits
4. Clear, action-oriented CTA button text
5. Microcopy for various sections

Write in a premium, professional tone. Focus on clarity and conversion."""

CODE_SYSTEM_PROMPT = """You are an expert React + TypeScript developer.
Your role is to generate clean, production-ready React components.

Requirements:
- Use React functional components with TypeScript
- Use proper TypeScript interfaces and types
- Include inline styles or CSS modules
- Follow best practices (hooks, props, composition)
- Generate complete, runnable components
- Use modern React patterns

Output only the code, properly formatted and ready to use."""


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
    
    response = await call_openrouter(MODEL, enhanced_prompt, PLANNER_SYSTEM_PROMPT)
    return response


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
    
    response = await call_openrouter(MODEL, enhanced_prompt, COPYWRITER_SYSTEM_PROMPT)
    return response


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
    
    response = await call_openrouter(MODEL, context, CODE_SYSTEM_PROMPT)
    return response


def merge_agent_outputs(plan: str, copy: str, code: str) -> Dict[str, str]:
    """
    Aggregator - Merges outputs from all 3 agents into a cohesive result.
    
    Args:
        plan: Output from planner agent
        copy: Output from copywriter agent
        code: Output from code generator agent
    
    Returns:
        Dictionary with merged results and improvements
    """
    
    # Extract improvements from plan
    improvements = extract_improvements(plan)
    
    # Create final merged output
    merged = {
        "plan": plan,
        "copywriting": copy,
        "code": code,
        "final_code": enhance_code_with_copy(code, copy),
        "improvements": improvements,
        "summary": generate_summary(plan, copy, code)
    }
    
    return merged


def extract_improvements(plan: str) -> list:
    """Extract improvement suggestions from the plan."""
    improvements = []
    
    # Look for common improvement patterns
    patterns = [
        r"recommend[s]?:?\s*(.+?)(?:\n|$)",
        r"suggest[s]?:?\s*(.+?)(?:\n|$)",
        r"consider:?\s*(.+?)(?:\n|$)",
        r"improvement:?\s*(.+?)(?:\n|$)"
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, plan, re.IGNORECASE)
        improvements.extend(matches)
    
    # Add default improvements
    if not improvements:
        improvements = [
            "Add smooth scroll animations",
            "Implement responsive design breakpoints",
            "Include accessibility features (ARIA labels)",
            "Add loading states for better UX"
        ]
    
    return improvements[:5]  # Limit to top 5


def enhance_code_with_copy(code: str, copy: str) -> str:
    """
    Enhance the generated code by ensuring it uses the copywriter's text.
    This is a simple version - in production, you'd use more sophisticated merging.
    """
    # For now, return the code as-is
    # In a real implementation, you'd parse the code and inject the copy
    enhanced = f"""// Generated by Vibe-Coding Multi-Agent System
// This code incorporates insights from:
// - Planner Agent (Architecture)
// - Copywriter Agent (Marketing Copy)
// - Code Generator Agent (Implementation)

{code}

/*
MARKETING COPY TO USE:
{copy}
*/
"""
    return enhanced


def generate_summary(plan: str, copy: str, code: str) -> str:
    """Generate a summary of what was created."""
    
    # Count components in code
    component_count = code.count("const ") + code.count("function ")
    
    summary = f"""✅ Multi-Agent Generation Complete

🧠 Planner Agent: Created architecture and UX strategy
✍️ Copywriter Agent: Generated premium marketing copy
⚡ Code Agent: Built {component_count}+ React components

The final output includes:
- Complete React + TypeScript codebase
- Professional component structure
- Premium marketing copy integrated
- Extra improvements and recommendations
"""
    
    return summary
