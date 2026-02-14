'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Icon } from '@/lib/icons';
import { trainingModules } from '@/lib/training';

export default function TrainingModulePage() {
  const params = useParams();
  const moduleId = parseInt(params.id as string);
  const trainingModule = trainingModules.find((m) => m.id === moduleId);

  const [currentLesson, setCurrentLesson] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Check if module was already completed (in a real app, this would come from a database)
    const savedProgress = localStorage.getItem(`training-${moduleId}`);
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (progress.completed) {
        setCompleted(true);
        // Set to last valid lesson index instead of out-of-bounds
        setCurrentLesson(trainingModule ? trainingModule.lessons.length - 1 : 0);
      }
    }
  }, [moduleId, trainingModule]);

  if (!trainingModule) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <p className="text-[14px] text-flix-grayscale-70 mb-4">Lesson not found</p>
          <Link href="/training" className="text-[14px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors">
            Back to Lessons
          </Link>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-24">
        <TopBar />
        <main className="max-w-lg mx-auto px-5 py-8">
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-flix-primary/10 flex items-center justify-center mx-auto mb-6">
              <Icon name="PartyPopper" size={40} className="text-flix-primary" />
            </div>
            <h1 className="text-2xl font-semibold text-flix-grayscale-100 mb-2 tracking-tight">
              You crushed it!
            </h1>
            <p className="text-[15px] text-flix-grayscale-70 mb-8">
              You&apos;ve completed &quot;{trainingModule.title}&quot;
            </p>
            <div className="space-y-3">
              <Link href="/training">
                <button
                  type="button"
                  className="w-full py-3 bg-flix-primary text-white rounded-button font-medium hover:bg-flix-ui-primary transition-colors text-[14px] active:scale-[0.98]"
                >
                  Back to Lessons
                </button>
              </Link>
              {moduleId < trainingModules.length && (
                <Link href={`/training/${moduleId + 1}`}>
                  <button
                    type="button"
                    className="w-full py-3 bg-flix-background border border-flix-primary text-flix-primary rounded-button font-medium hover:bg-flix-primary/5 transition-colors text-[14px] active:scale-[0.98]"
                  >
                    Next Lesson
                  </button>
                </Link>
              )}
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // Ensure currentLesson is within bounds
  const safeCurrentLesson = Math.min(currentLesson, trainingModule.lessons.length - 1);
  const lesson = trainingModule.lessons[safeCurrentLesson];
  const progress = ((safeCurrentLesson + 1) / trainingModule.lessons.length) * 100;
  const isLastLesson = safeCurrentLesson === trainingModule.lessons.length - 1;
  const isQuiz = lesson?.type === 'quiz';

  const handleNext = () => {
    if (isLastLesson) {
      // Mark as completed
      localStorage.setItem(
        `training-${moduleId}`,
        JSON.stringify({ completed: true, completedAt: new Date().toISOString() })
      );
      setCompleted(true);
    } else {
      const nextLesson = Math.min(safeCurrentLesson + 1, trainingModule.lessons.length - 1);
      setCurrentLesson(nextLesson);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (isQuiz && !showExplanation) {
      setSelectedAnswer(index);
      setShowExplanation(true);
    }
  };

  const handleQuizNext = () => {
    if (showExplanation) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen bg-flix-grayscale-10 pb-24">
      <TopBar />
      
      <main className="max-w-lg mx-auto px-5 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Link href="/training" className="text-[14px] font-medium text-flix-primary hover:text-flix-ui-primary transition-colors">
              Back
            </Link>
            <span className="text-[13px] text-flix-grayscale-50 font-medium">
              {safeCurrentLesson + 1}/{trainingModule.lessons.length}
            </span>
          </div>
          <div className="h-1 bg-flix-grayscale-20 rounded-pill overflow-hidden">
            <div
              className="h-full bg-flix-primary rounded-pill transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <div
          key={safeCurrentLesson}
          className="bg-flix-background rounded-card p-5 shadow-card border border-flix-grayscale-20 mb-6 animate-fade-in"
        >
            {/* Lesson Header */}
            <div className="flex items-start gap-4 mb-4">
              {lesson.icon && (
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-flix-primary/10 flex items-center justify-center">
                  <Icon name={lesson.icon} size={22} className="text-flix-primary" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-flix-grayscale-100 mb-2">
                  {lesson.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              {lesson.type === 'content' && (
                <p className="text-flix-grayscale-90 whitespace-pre-line leading-relaxed">
                  {lesson.content}
                </p>
              )}

              {lesson.type === 'example' && (
                <div className="bg-flix-ui-primary/5 rounded-card p-4 border border-flix-ui-primary/20">
                  <p className="text-flix-grayscale-90 whitespace-pre-line leading-relaxed">
                    {lesson.content}
                  </p>
                </div>
              )}

              {lesson.type === 'quiz' && lesson.options && (
                <div className="space-y-3">
                  <p className="text-flix-grayscale-90 mb-4">{lesson.content}</p>
                  {lesson.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === lesson.correctAnswer;
                    const showResult = showExplanation;

                    let buttonClass =
                      'w-full text-left px-4 py-3 rounded-button border transition-all text-[14px] font-medium ';
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass += 'border-flix-feedback-success bg-flix-feedback-success/5 text-flix-grayscale-100';
                      } else if (isSelected && !isCorrect) {
                        buttonClass += 'border-flix-feedback-danger bg-flix-feedback-danger/5 text-flix-grayscale-100';
                      } else {
                        buttonClass += 'border-flix-grayscale-20 bg-flix-grayscale-10 text-flix-grayscale-70';
                      }
                    } else {
                      buttonClass += 'border-flix-grayscale-20 bg-flix-grayscale-10 hover:border-flix-primary/50 hover:bg-flix-primary/5 text-flix-grayscale-100';
                    }

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={`${buttonClass} ${!showResult ? 'active:scale-[0.995]' : ''}`}
                      >
                        <div className="flex items-center gap-3">
                          {showResult && isCorrect && <Icon name="Check" size={20} className="text-flix-feedback-success" />}
                          {showResult && isSelected && !isCorrect && <Icon name="X" size={20} className="text-flix-feedback-danger" />}
                          <span>{option}</span>
                        </div>
                      </button>
                    );
                  })}

                  {showExplanation && (
                    <div
                      className={`p-4 rounded-card animate-fade-in ${
                        selectedAnswer === lesson.correctAnswer
                          ? 'bg-flix-feedback-success/5 border border-flix-feedback-success/10'
                          : 'bg-flix-feedback-danger/5 border border-flix-feedback-danger/10'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {selectedAnswer === lesson.correctAnswer ? (
                          <>
                            <Icon name="Check" size={20} className="text-flix-feedback-success flex-shrink-0" />
                            <p className="text-sm font-semibold text-flix-feedback-success">
                              Correct!
                            </p>
                          </>
                        ) : (
                          <>
                            <Icon name="X" size={20} className="text-flix-feedback-danger flex-shrink-0" />
                            <p className="text-sm font-semibold text-flix-feedback-danger">
                              Not quite right
                            </p>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-flix-grayscale-90">
                        {selectedAnswer === lesson.correctAnswer
                          ? lesson.explanation
                          : lesson.incorrectExplanation || lesson.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={isQuiz ? handleQuizNext : handleNext}
              disabled={isQuiz && !showExplanation}
              className={`w-full py-3 rounded-button font-medium transition-colors text-[14px] active:scale-[0.98] ${
                isQuiz && !showExplanation
                  ? 'bg-flix-grayscale-20 text-flix-grayscale-50 cursor-not-allowed'
                  : 'bg-flix-primary text-white hover:bg-flix-ui-primary'
              }`}
            >
              {isLastLesson ? 'Complete Lesson' : 'Continue'}
            </button>
          </div>

        <div className="text-center mt-4">
          <p className="text-[13px] text-flix-grayscale-50">
            {trainingModule.title} · {trainingModule.duration}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

