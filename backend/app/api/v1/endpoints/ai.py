"""
AI-related API endpoints.
"""
from fastapi import APIRouter, HTTPException
import asyncio
import traceback
from app.schemas.ai import GenerateRequest, GenerateResponse
from app.services.ai_service import (
    run_planner_agent,
    run_copywriter_agent,
    run_code_agent,
    merge_agent_outputs
)
from app.utils.openrouter_client import OpenRouterAPIError

router = APIRouter()

@router.post("/generate", response_model=GenerateResponse)
async def generate_website(request: GenerateRequest):
    """
    Main endpoint - Runs all 3 agents in parallel and merges results.
    """
    try:
        print(f"Received generation request for prompt: {request.prompt}")
        
        # Run all 3 agents simultaneously
        plan_task = run_planner_agent(request.prompt)
        copy_task = run_copywriter_agent(request.prompt)
        
        # Wait for plan and copywriting first (code agent can use them)
        plan, copywriting = await asyncio.gather(plan_task, copy_task)
        
        # Run code agent with context from other agents
        code = await run_code_agent(request.prompt, plan, copywriting)
        
        # Merge all outputs
        merged = merge_agent_outputs(plan, copywriting, code)
        
        return GenerateResponse(**merged)
        
    except OpenRouterAPIError as e:
        traceback.print_exc()
        print(f"OpenRouter API error: {e.detail}")
        raise HTTPException(status_code=e.status_code, detail=f"OpenRouter error: {e.detail}")
    except Exception as e:
        traceback.print_exc()
        print(f"Error details: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")

@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "vibe-coding-backend"}
