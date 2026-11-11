import React, { useState } from 'react';
import { useLesson } from '../context/LessonContext';
import {
  BookOpen,
  Users,
  Layers,
  HelpCircle,
  Zap,
  Film,
  Award,
  Sparkles,
  BarChart3,
  Video,
  FileCheck2,
  FolderArchive,
  ExternalLink
} from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, studentName, setStudentName, totalScore, gradeString } = useLesson();
  const [showLinksModal, setShowLinksModal] = useState<boolean>(false);

  const navItems = [
    { id: 'comic', label: '📖 Оқу комиксі (Түпнұсқа сайт)', icon: BookOpen },
    { id: 'teams', label: '👥 Топқа бөлу (3 топ)', icon: Users },
    { id: 'task1', label: '🧩 1-тапсырма: Сәйкестендіру', icon: Layers },
    { id: 'task2', label: '📝 2-тапсырма: Графика тесті (20)', icon: HelpCircle },
    { id: 'task3', label: '⚡ 3-тапсырма: Иә / Жоқ блиц', icon: Zap },
    { id: 'lecture', label: '🎬 Жаңа сабақ: Мультимедиа', icon: Film },
    { id: 'task4', label: '🎯 4-тапсырма: Викторина (10)', icon: FileCheck2 },
    { id: 'task5', label: '🗂️ 5-тапсырма: Форматтар', icon: FolderArchive },
    { id: 'task6', label: '📽️ 6-тапсырма: Movie Maker', icon: Video },
    { id: 'task7', label: '📊 7-тапсырма: Қорытынды тест (20)', icon: BarChart3 },
    { id: 'task8', label: '🤖 8-тапсырма: ЖИ жобасы', icon: Sparkles },
    { id: 'gradebook', label: '🏆 Бағалау парағы (100 б.)', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top zone */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20">
            CG
          </div>
          <div>
            <span className="text-base font-extrabold text-slate-900 tracking-tight block">
              Компьютерлік графика & Мультимедиа
            </span>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Интерактивті оқу және бағалау кешені
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Студент:</span>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Аты-жөніңіз"
              className="text-xs font-semibold text-slate-800 bg-transparent border-0 focus:outline-none w-28 sm:w-36"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLinksModal(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-xs font-semibold text-xs whitespace-nowrap cursor-pointer"
              title="Мұғалім берген барлық ойын сілтемелері"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ойын сілтемелері ▾</span>
            </button>

            {showLinksModal && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs"
                  onClick={() => setShowLinksModal(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-emerald-600" />
                      Мұғалім жіберген ойын сілтемелері
                    </span>
                    <button
                      onClick={() => setShowLinksModal(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold px-1.5 py-0.5 rounded"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-2 text-xs">
                    <a
                      href="https://qazmath.net/quraldar/topka-bolu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>👥 Топқа бөлу (Qazmath)</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                        https://qazmath.net/quraldar/topka-bolu/
                      </div>
                    </a>

                    <a
                      href="https://wordwall.net/ru/resource/36565861"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>🧩 1-тапсырма: Сәйкестендіру (Wordwall)</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                        https://wordwall.net/ru/resource/36565861
                      </div>
                    </a>

                    <a
                      href="https://wayground.com/join/quiz/6913456a4f4f20e0d5898c4b/start?studentShare=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition-colors"
                    >
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>📝 2-тапсырма: Тест 20 сұрақ (Wayground)</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                        https://wayground.com/join/quiz/6913456a4f4f20e0d5898c4b/...
                      </div>
                    </a>

                    <a
                      href="https://wordwall.net/ru/resource/101712152"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-colors"
                    >
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>⚡ 3-тапсырма: Иә/Жоқ блиц (Wordwall)</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                        https://wordwall.net/ru/resource/101712152
                      </div>
                    </a>

                    <a
                      href="https://learningapps.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-colors"
                    >
                      <div className="font-bold text-slate-800 flex items-center justify-between">
                        <span>🎯 4-тапсырма: Викторина (LearningApps)</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                        https://learningapps.org/
                      </div>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setActiveTab('gradebook')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm font-semibold text-xs whitespace-nowrap"
            title="Жалпы нәтижелер мен бағалау парағын көру"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span className="tabular-nums font-bold">{totalScore} / 100 балл</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Navigation Bar */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-2 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
