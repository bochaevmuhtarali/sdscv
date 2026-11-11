import React, { useRef } from 'react';
import { LessonProvider, useLesson } from './context/LessonContext';
import { Header } from './components/Header';
import { OriginalComicSite } from './components/OriginalComicSite';
import { TeamGenerator } from './components/TeamGenerator';
import { MatchingGraphicTask } from './components/MatchingGraphicTask';
import { Quiz20Graphics } from './components/Quiz20Graphics';
import { TrueFalseBlitz } from './components/TrueFalseBlitz';
import { LectureMultimedia } from './components/LectureMultimedia';
import { MovieMakerQuiz10 } from './components/MovieMakerQuiz10';
import { FormatMatchingTask } from './components/FormatMatchingTask';
import { MovieMakerProjectStudio } from './components/MovieMakerProjectStudio';
import { MovieMakerExam20 } from './components/MovieMakerExam20';
import { AIAssistedStudio } from './components/AIAssistedStudio';
import { GradeBook } from './components/GradeBook';
import { ArrowDown, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useLesson();

  const renderSingleView = () => {
    switch (activeTab) {
      case 'comic':
        return <OriginalComicSite onScrollToTasks={() => setActiveTab('teams')} />;
      case 'teams':
        return <TeamGenerator />;
      case 'task1':
        return <MatchingGraphicTask />;
      case 'task2':
        return <Quiz20Graphics />;
      case 'task3':
        return <TrueFalseBlitz />;
      case 'lecture':
        return <LectureMultimedia />;
      case 'task4':
        return <MovieMakerQuiz10 />;
      case 'task5':
        return <FormatMatchingTask />;
      case 'task6':
        return <MovieMakerProjectStudio />;
      case 'task7':
        return <MovieMakerExam20 />;
      case 'task8':
        return <AIAssistedStudio />;
      case 'gradebook':
        return <GradeBook />;
      default:
        return <OriginalComicSite onScrollToTasks={() => setActiveTab('teams')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Header />
      <main className="flex-1 pb-16">
        {renderSingleView()}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800">Компьютерлік графика және мультимедиа негіздері</span>
            <span className="mx-2">·</span>
            <span>Интерактивті оқу-әдістемелік кешен</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <button onClick={() => setActiveTab('comic')} className="text-blue-600 font-bold hover:underline">
              Оқу комиксі
            </button>
            <button onClick={() => setActiveTab('teams')} className="hover:text-blue-600">
              Топқа бөлу
            </button>
            <button onClick={() => setActiveTab('task1')} className="hover:text-blue-600">
              1-тапсырма (Wordwall)
            </button>
            <button onClick={() => setActiveTab('task2')} className="hover:text-blue-600">
              2-тапсырма (Wayground)
            </button>
            <button onClick={() => setActiveTab('task3')} className="hover:text-blue-600">
              3-тапсырма (Wordwall)
            </button>
            <button onClick={() => setActiveTab('gradebook')} className="text-blue-600 hover:underline">
              Бағалау парағы (100 б.)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <LessonProvider>
      <MainContent />
    </LessonProvider>
  );
}
