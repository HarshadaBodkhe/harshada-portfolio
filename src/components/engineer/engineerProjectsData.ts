import React from 'react';
import { DwelloCaseStudy } from './dwello/DwelloCaseStudy';
import { SliceItCaseStudy } from './sliceit/SliceItCaseStudy';
import { PortfolioCaseStudy } from './portfolio/PortfolioCaseStudy';
import { ClassLensCaseStudy } from './classlens/ClassLensCaseStudy';
import { ResearchCaseStudy } from './research_assistant/ResearchCaseStudy';

import { TextSummarizerMiniProject } from './text_summarizer/TextSummarizerMiniProject';
import { AIPersonalAssistantMiniProject } from './ai_personal_assistant/AIPersonalAssistantMiniProject';
import { YouTubeVideoAnalyzerMiniProject } from './youtube_analyzer/YouTubeVideoAnalyzerMiniProject';

export type ProjectType = 'major' | 'mini';
export type DomainType = 'fullstack' | 'aiml';

export interface ProjectDefinition {
  id: string;
  title: string;
  component: React.ComponentType;
}

export const DOMAIN_LABELS: Record<DomainType, string> = {
  fullstack: 'Full Stack Development',
  aiml: 'AI / ML',
};

export const ENGINEER_PROJECTS: Record<ProjectType, Record<DomainType, ProjectDefinition[]>> = {
  major: {
    fullstack: [
      {
        id: 'dwello',
        title: 'Dwello',
        component: DwelloCaseStudy,
      },
      {
        id: 'sliceit',
        title: 'SliceIt',
        component: SliceItCaseStudy,
      },
      {
        id: 'harshada-portfolio',
        title: 'Personal Portfolio',
        component: PortfolioCaseStudy,
      },
    ],
    aiml: [
      {
        id: 'classlens',
        title: 'ClassLens',
        component: ClassLensCaseStudy,
      },
      {
        id: 'research-assistant',
        title: 'AI-Powered Research Assistant',
        component: ResearchCaseStudy,
      },
    ],
  },
  mini: {
    fullstack: [],
    aiml: [
      {
        id: 'text-summarizer',
        title: 'Text Summarizer',
        component: TextSummarizerMiniProject,
      },
      {
        id: 'ai-personal-assistant',
        title: 'AI Personal Assistant',
        component: AIPersonalAssistantMiniProject,
      },
      {
        id: 'youtube-video-analyzer-agent',
        title: 'YouTube Video Analyzer Agent',
        component: YouTubeVideoAnalyzerMiniProject,
      },
    ],
  },
};
