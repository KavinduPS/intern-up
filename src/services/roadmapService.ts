import { QandA } from '../context/QuizContext';
import { RoadmapSuggestionsType } from './roadmapSuggestions';
import { SkillLevelType, skillScoringConfig } from './skillScoringConfig';

export interface SkillLevel {
  programmingFundamentals: SkillLevelType;
  frontendDev: SkillLevelType;
  backendDev: SkillLevelType;
  databases: SkillLevelType;
  git: SkillLevelType;
  devops: SkillLevelType;
  softSkills: SkillLevelType;
}

export type RoadmapType = {
  category: string;
  suggestions: string[];
};

export const assignSkillLevel = (answers: QandA[]): SkillLevel => {
  const result: Partial<SkillLevel> = {};

  for (const category in skillScoringConfig) {
    const config = skillScoringConfig[category as keyof SkillLevel];
    let totalScore = 0;

    config.qIds.forEach(qId => {
      const answerObj = answers.find(a => a.qId === qId);
      const scoreFn = config.scoring[qId as keyof typeof config.scoring] as (
        answer: any,
      ) => number;
      if (answerObj && scoreFn) {
        totalScore += scoreFn(answerObj.answer);
      }
    });

    const level = config.toLevel(totalScore);
    result[category as keyof SkillLevel] = level;
  }

  return result as SkillLevel;
};

export const generateRoadmap = (
  skillLevels: SkillLevel,
  suggestions: RoadmapSuggestionsType,
): RoadmapType[] => {
  const roadmap: RoadmapType[] = [];
  for (const category in skillLevels) {
    const level = skillLevels[category as keyof SkillLevel];
    const roadmapSuggestion = suggestions[category]?.[level] ?? [];

    roadmap.push({ category, suggestions: roadmapSuggestion });
  }

  return roadmap;
};
