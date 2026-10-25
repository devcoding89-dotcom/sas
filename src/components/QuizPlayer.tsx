'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, HelpCircle, BookOpen } from 'lucide-react';
import { MOCK_QUIZ_QUESTIONS } from '../data/mockData';

export default function QuizPlayer() {
  const [questions] = useState(MOCK_QUIZ_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];
  const letters = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers(prev => ({ ...prev, [currentIdx]: selectedOption }));
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  // Calculate score
  const score = Object.entries(userAnswers).reduce((acc, [idx, ans]) => {
    return ans === questions[Number(idx)].correctIndex ? acc + 1 : acc;
  }, 0);

  const scorePercentage = Math.round((score / questions.length) * 100);

  if (isFinished) {
    return (
      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: 44 }}>
          <div style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            background: scorePercentage >= 70 ? 'var(--green-100)' : 'var(--amber-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: scorePercentage >= 70 ? 'var(--green-700)' : 'var(--amber-600)'
          }}>
            <Award size={46} />
          </div>

          <span className="badge badge-green" style={{ marginBottom: 12 }}>
            Practice Session Completed
          </span>

          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-dark)' }}>
            Your Score: {score} / {questions.length} ({scorePercentage}%)
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.6 }}>
            {scorePercentage >= 70
              ? 'Outstanding performance! You have a solid grasp of Binary Search Trees for your semester exam.'
              : 'Good effort! Review the flashcards and retake the quiz to cement the concepts before tests.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
            <button className="btn btn-primary" onClick={handleRestartQuiz}>
              <RotateCcw size={18} />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctIndex;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Quiz Progress Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <span className="badge badge-green">CSC201 MCQ Practice</span>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: 4, color: 'var(--text-dark)' }}>
            Question {currentIdx + 1} of {questions.length}
          </h2>
        </div>
        {currentQ.sourcePage && (
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            Source: Handout Page {currentQ.sourcePage}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: 6,
        background: 'var(--border-light)',
        borderRadius: '9999px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${Math.round(((currentIdx + 1) / questions.length) * 100)}%`,
          height: '100%',
          background: 'var(--green-600)',
          transition: 'width 0.3s ease',
          borderRadius: '9999px'
        }} />
      </div>

      {/* Question Card */}
      <div className="card" style={{ padding: 32 }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.5, color: 'var(--text-dark)', marginBottom: 28 }}>
          {currentQ.question}
        </p>

        {/* 4 Answer Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentQ.options.map((opt, i) => {
            let optionClass = 'quiz-option';
            if (selectedOption === i) optionClass += ' selected';
            if (isAnswerSubmitted) {
              if (i === currentQ.correctIndex) {
                optionClass += ' correct';
              } else if (selectedOption === i) {
                optionClass += ' incorrect';
              }
            }

            return (
              <button
                key={i}
                className={optionClass}
                onClick={() => handleSelectOption(i)}
                disabled={isAnswerSubmitted}
              >
                <div className="quiz-letter">
                  {letters[i]}
                </div>
                <span style={{ flex: 1, color: 'inherit' }}>{opt}</span>
                {isAnswerSubmitted && i === currentQ.correctIndex && (
                  <CheckCircle2 size={20} color="#15803D" />
                )}
                {isAnswerSubmitted && selectedOption === i && i !== currentQ.correctIndex && (
                  <XCircle size={20} color="#DC2626" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Explanation Box */}
        {isAnswerSubmitted && (
          <div style={{
            marginTop: 24,
            padding: 18,
            borderRadius: 'var(--radius-md)',
            background: isCorrect ? 'var(--bg-green-tint)' : '#FEF2F2',
            border: `1.5px solid ${isCorrect ? 'var(--border-green)' : '#FECACA'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              {isCorrect ? (
                <>
                  <CheckCircle2 size={18} color="#15803D" />
                  <span style={{ fontWeight: 800, color: '#15803D', fontSize: '0.92rem' }}>Correct Answer!</span>
                </>
              ) : (
                <>
                  <XCircle size={18} color="#DC2626" />
                  <span style={{ fontWeight: 800, color: '#B91C1C', fontSize: '0.92rem' }}>Incorrect</span>
                </>
              )}
            </div>
            <p style={{ fontSize: '0.92rem', color: isCorrect ? '#14532D' : '#991B1B', lineHeight: 1.55 }}>
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
          {!isAnswerSubmitted ? (
            <button
              className="btn btn-primary"
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
              style={{ opacity: selectedOption !== null ? 1 : 0.5, padding: '12px 24px' }}
            >
              Submit Answer
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNextQuestion} style={{ padding: '12px 24px' }}>
              <span>{currentIdx + 1 === questions.length ? 'See Results' : 'Next Question'}</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
