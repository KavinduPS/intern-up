import React, { createContext, ReactNode, useContext, useState } from 'react';
import { SkillLevel } from '../services/roadmapService';
import { SkillLevelType } from '../services/skillScoringConfig';

export type QandA = {
  qId: string;
  question: string;
  answer: string | string[];
};

type QuizContextType = {
  answers: QandA[];
  skillLevel?: SkillLevel;
  saveAnswer: ({ qId, question, answer }: QandA) => void;
  resetQuiz: () => void;
  saveSkillLevels: (skills: SkillLevel) => void;
};

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined,
);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<QandA[]>([]);
  const [skillLevel, setSkillLevel] = useState<SkillLevel>();

  const saveAnswer = ({ qId, question, answer }: QandA) => {
    setAnswers(prev => {
      const filtered = prev.filter(item => item.qId !== qId);
      return [...filtered, { qId, question, answer }];
    });
  };
  const saveSkillLevels = (skills: SkillLevel) => {
    setSkillLevel(skills);
    return skills;
  };

  const resetQuiz = () => {
    setAnswers([]);
  };

  return (
    <QuizContext.Provider
      value={{ answers, skillLevel, saveAnswer, resetQuiz, saveSkillLevels }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
