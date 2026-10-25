'use client';

import React, { useState, useEffect } from 'react';
import { RotateCw, Check, X, Shuffle, ArrowLeft, ArrowRight, Sparkles, BookOpen, Layers } from 'lucide-react';
import { MOCK_FLASHCARDS, Flashcard } from '../data/mockData';

export default function FlashcardDeck() {
  const [cards, setCards] = useState<Flashcard[]>(MOCK_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(cards.filter(c => c.mastered).length);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleToggleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  const markMastered = (mastered: boolean) => {
    const updated = [...cards];
    updated[currentIndex].mastered = mastered;
    setCards(updated);
    setMasteredCount(updated.filter(c => c.mastered).length);
    handleNext();
  };

  const shuffleCards = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleFlip();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cards, currentIndex]);

  const progressPercent = Math.round(((currentIndex + 1) / cards.length) * 100);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Deck Controls Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-green">CSC201 Active Recall</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {masteredCount} of {cards.length} Mastered
            </span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginTop: 4, color: 'var(--text-dark)' }}>
            Binary Search Trees & Rotations
          </h2>
        </div>

        <button
          className="btn btn-secondary"
          onClick={shuffleCards}
          style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          title="Shuffle Cards"
        >
          <Shuffle size={16} />
          <span>Shuffle</span>
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div style={{
          width: '100%',
          height: 8,
          background: 'var(--border-light)',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'var(--green-600)',
            transition: 'width 0.3s ease',
            borderRadius: '9999px'
          }} />
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="flashcard-stage" onClick={handleToggleFlip}>
        <div className={`flashcard-inner ${isFlipped ? 'flipped' : ''}`}>
          {/* FRONT */}
          <div className="flashcard-front">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--green-700)',
                background: 'var(--green-100)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)'
              }}>
                QUESTION • #{currentIndex + 1}
              </span>
              {currentCard.sourcePage && (
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  Page {currentCard.sourcePage}
                </span>
              )}
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 12px'
            }}>
              <p style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1.5,
                color: 'var(--text-dark)'
              }}>
                {currentCard.front}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              color: 'var(--text-secondary)',
              fontSize: '0.82rem',
              fontWeight: 600,
              paddingTop: 12,
              borderTop: '1px solid var(--border-light)'
            }}>
              <RotateCw size={14} color="var(--green-600)" />
              <span>Click card or press Spacebar to see answer</span>
            </div>
          </div>

          {/* BACK */}
          <div className="flashcard-back">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#15803D',
                background: '#DCFCE7',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)'
              }}>
                ANSWER & EXPLANATION
              </span>
              {currentCard.sourcePage && (
                <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 600 }}>
                  Ref: Page {currentCard.sourcePage}
                </span>
              )}
            </div>

            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 12px'
            }}>
              <p style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                lineHeight: 1.6,
                color: '#14532D'
              }}>
                {currentCard.back}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              color: '#166534',
              fontSize: '0.82rem',
              fontWeight: 600,
              paddingTop: 12,
              borderTop: '1px solid #BBF7D0'
            }}>
              <RotateCw size={14} />
              <span>Click to flip back to question</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          style={{ padding: '12px 18px' }}
        >
          <ArrowLeft size={18} />
          <span>Previous</span>
        </button>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              markMastered(false);
            }}
            className="btn"
            style={{
              background: '#FEE2E2',
              border: '1.5px solid #FCA5A5',
              color: '#B91C1C',
              padding: '12px 20px',
              fontWeight: 700
            }}
          >
            <X size={18} />
            <span>Need Practice</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              markMastered(true);
            }}
            className="btn btn-primary"
            style={{ padding: '12px 22px' }}
          >
            <Check size={18} />
            <span>Mastered</span>
          </button>
        </div>

        <button
          className="btn btn-secondary"
          onClick={handleNext}
          style={{ padding: '12px 18px' }}
        >
          <span>Next</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
