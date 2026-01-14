"""
Pydantic schemas for AI-related endpoints.
"""
from pydantic import BaseModel
from typing import List

class GenerateRequest(BaseModel):
    """Request schema for website generation."""
    prompt: str

class GenerateResponse(BaseModel):
    """Response schema for website generation."""
    plan: str
    copywriting: str
    code: str
    final_code: str
    improvements: List[str]
    summary: str
