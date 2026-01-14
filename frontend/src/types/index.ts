export interface GenerationResult {
    plan: string;
    copywriting: string;
    code: string;
    final_code: string;
    improvements: string[];
    summary: string;
}

export type ActivePanel = 'explorer' | 'search' | 'settings';
export type ActiveTab = 'code' | 'plan' | 'copy' | 'preview';
