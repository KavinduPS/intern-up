import React, { createContext, ReactNode, useContext, useState } from 'react';

export type QandA = {
  qId: string;
  question: string;
  answer: string | string[];
};

type QuizContextType = {
  answers: QandA[];
  saveAnswer: ({ qId, question, answer }: QandA) => void;
  resetQuiz: () => void;
};

export const QuizContext = createContext<QuizContextType | undefined>(
  undefined,
);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<QandA[]>([]);

  const saveAnswer = ({ qId, question, answer }: QandA) => {
    setAnswers(prev => {
      const filtered = prev.filter(item => item.qId !== qId);
      return [...filtered, { qId, question, answer }];
    });
  };

  const resetQuiz = () => {
    setAnswers([]);
  };

  return (
    <QuizContext.Provider value={{ answers, saveAnswer, resetQuiz }}>
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
