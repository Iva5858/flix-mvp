'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { trainingModules, LessonSlide } from '@/lib/training';

export default function TrainingModulePage() {
  const params = useParams();
  const router = useRouter();
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
      <div className="min-h-screen bg-flix-grayscale-10 pb-20">
        <TopBar />
        <main className="max-w-md mx-auto px-4 py-6">
          <p className="text-flix-grayscale-70">Module not found</p>
          <Link href="/training" className="text-flix-primary hover:underline">
            ← Back to Training
          </Link>
        </main>
        <BottomNav />
      </div>
    );
  }

  // Early return if completed - this prevents accessing lesson when it might be undefined
  if (completed) {
    return (
      <div className="min-h-screen bg-flix-grayscale-10 pb-20">
        <TopBar />
        <main className="max-w-md mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl font-bold text-flix-grayscale-100 mb-4">
              Module Complete!
            </h1>
            <p className="text-flix-grayscale-70 mb-8">
              You&apos;ve completed &quot;{trainingModule.title}&quot;
            </p>
            <div className="space-y-4">
              <Link href="/training">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-flix-primary text-white rounded-button font-semibold hover:bg-flix-ui-primary transition-colors"
                >
                  Back to Training
                </motion.button>
              </Link>
              {moduleId < trainingModules.length && (
                <Link href={`/training/${moduleId + 1}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-flix-background border-2 border-flix-primary text-flix-primary rounded-button font-semibold hover:bg-flix-primary/5 transition-colors"
                  >
                    Next Module →
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
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
    <div className="min-h-screen bg-flix-grayscale-10 pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Link href="/training" className="text-flix-primary hover:underline text-sm">
              ← Back
            </Link>
            <span className="text-sm text-flix-grayscale-70">
              {safeCurrentLesson + 1}/{trainingModule.lessons.length}
            </span>
          </div>
          <div className="h-2 bg-flix-grayscale-30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-flix-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={safeCurrentLesson}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-flix-background rounded-card p-6 border border-flix-grayscale-30 shadow-sm mb-6"
          >
            {/* Lesson Header */}
            <div className="flex items-start gap-4 mb-4">
              {lesson.emoji && <span className="text-5xl">{lesson.emoji}</span>}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-flix-grayscale-100 mb-2">
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
                      'w-full text-left px-4 py-3 rounded-button border-2 transition-all font-medium ';
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass += 'border-flix-feedback-success bg-flix-feedback-success/10 text-flix-grayscale-100';
                      } else if (isSelected && !isCorrect) {
                        buttonClass += 'border-flix-feedback-danger bg-flix-feedback-danger/10 text-flix-grayscale-100';
                      } else {
                        buttonClass += 'border-flix-grayscale-30 bg-flix-grayscale-10 text-flix-grayscale-70';
                      }
                    } else {
                      buttonClass += 'border-flix-grayscale-30 bg-flix-background hover:border-flix-primary hover:bg-flix-primary/5 text-flix-grayscale-100';
                    }

                    return (
                      <motion.button
                        key={index}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        <div className="flex items-center gap-3">
                          {showResult && isCorrect && <span>✓</span>}
                          {showResult && isSelected && !isCorrect && <span>✗</span>}
                          <span>{option}</span>
                        </div>
                      </motion.button>
                    );
                  })}

                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-card ${
                        selectedAnswer === lesson.correctAnswer
                          ? 'bg-flix-feedback-success/10 border border-flix-feedback-success/20'
                          : 'bg-flix-feedback-danger/10 border border-flix-feedback-danger/20'
                      }`}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        {selectedAnswer === lesson.correctAnswer ? (
                          <>
                            <span className="text-lg">✓</span>
                            <p className="text-sm font-semibold text-flix-feedback-success">
                              Correct!
                            </p>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">✗</span>
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
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={isQuiz ? handleQuizNext : handleNext}
              disabled={isQuiz && !showExplanation}
              className={`w-full py-3 rounded-button font-semibold transition-colors ${
                isQuiz && !showExplanation
                  ? 'bg-flix-grayscale-30 text-flix-grayscale-50 cursor-not-allowed'
                  : 'bg-flix-primary text-white hover:bg-flix-ui-primary'
              }`}
            >
              {isLastLesson ? 'Complete Module 🎉' : 'Continue →'}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Module Info */}
        <div className="text-center">
          <p className="text-sm text-flix-grayscale-50">
            {trainingModule.title} • {trainingModule.duration}
          </p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

