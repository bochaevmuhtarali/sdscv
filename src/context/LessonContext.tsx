import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudentsList } from '../data/lessonData';

export interface StudentScore {
  task1: number; // Max 10 (Сәйкестендіру)
  task2: number; // Max 10 (Графика 20 тест)
  task3: number; // Max 10 (Ақиқат/Жалған)
  lectureNotes: number; // Max 20 (Конспект жазу)
  task4: number; // Max 10 (Movie Maker викторина 10)
  task5: number; // Max 10 (Мультимедиа форматтары 10)
  task6: number; // Max 20 (Movie Maker жобалық жұмыс)
  task7: number; // Max 10 (Movie Maker 20 тест)
  task8AI: number; // Max 10 (ЖИ көмегімен жоба әзірлеу)
}

export interface GroupAssignment {
  group1: string[];
  group2: string[];
  group3: string[];
}

interface LessonContextType {
  studentName: string;
  setStudentName: (name: string) => void;
  selectedGroup: number;
  setSelectedGroup: (group: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  scores: StudentScore;
  setTaskScore: (taskKey: keyof StudentScore, score: number) => void;
  groups: GroupAssignment;
  setGroups: React.Dispatch<React.SetStateAction<GroupAssignment>>;
  divideIntoGroups: (studentNames: string[]) => void;
  totalScore: number;
  maxTotalScore: number;
  percentageScore: number;
  gradeString: string;
  resetAllProgress: () => void;
}

const defaultScores: StudentScore = {
  task1: 0,
  task2: 0,
  task3: 0,
  lectureNotes: 0,
  task4: 0,
  task5: 0,
  task6: 0,
  task7: 0,
  task8AI: 0,
};

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('lesson_student_name') || 'Студент';
  });

  const [selectedGroup, setSelectedGroup] = useState<number>(() => {
    return Number(localStorage.getItem('lesson_selected_group')) || 1;
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const saved = localStorage.getItem('lesson_active_tab');
    if (!saved || saved === 'all') return 'comic';
    return saved;
  });

  const [scores, setScores] = useState<StudentScore>(() => {
    const saved = localStorage.getItem('lesson_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultScores;
      }
    }
    return defaultScores;
  });

  const [groups, setGroups] = useState<GroupAssignment>(() => {
    const saved = localStorage.getItem('lesson_groups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Default initial distribution
    const shuffled = [...initialStudentsList];
    const g1: string[] = [];
    const g2: string[] = [];
    const g3: string[] = [];
    shuffled.forEach((name, i) => {
      if (i % 3 === 0) g1.push(name);
      else if (i % 3 === 1) g2.push(name);
      else g3.push(name);
    });
    return { group1: g1, group2: g2, group3: g3 };
  });

  useEffect(() => {
    localStorage.setItem('lesson_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('lesson_selected_group', String(selectedGroup));
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem('lesson_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('lesson_scores', JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem('lesson_groups', JSON.stringify(groups));
  }, [groups]);

  const setTaskScore = (taskKey: keyof StudentScore, score: number) => {
    setScores(prev => ({
      ...prev,
      [taskKey]: Math.max(0, Math.round(score * 10) / 10)
    }));
  };

  const divideIntoGroups = (studentNames: string[]) => {
    const list = studentNames.filter(n => n.trim().length > 0);
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    const g1: string[] = [];
    const g2: string[] = [];
    const g3: string[] = [];
    shuffled.forEach((name, i) => {
      if (i % 3 === 0) g1.push(name);
      else if (i % 3 === 1) g2.push(name);
      else g3.push(name);
    });
    setGroups({ group1: g1, group2: g2, group3: g3 });
  };

  const totalScore = scores.task1 + scores.task2 + scores.task3 + scores.lectureNotes +
                     scores.task4 + scores.task5 + scores.task6 + scores.task7 + scores.task8AI;
  
  // Total maximum score across all criteria = 10 + 10 + 10 + 20 + 10 + 10 + 20 + 10 + 10 = 110 or scaled to 100
  const maxTotalScore = 100;
  const percentageScore = Math.min(100, Math.round((totalScore / 100) * 100));

  let gradeString = '3 (Қанағаттанарлық)';
  if (percentageScore >= 90) gradeString = '5 (Өте жақсы / Керемет)';
  else if (percentageScore >= 75) gradeString = '4 (Жақсы / Тамаша)';
  else if (percentageScore < 50) gradeString = 'Төмен (Қайта орындау қажет)';

  const resetAllProgress = () => {
    setScores(defaultScores);
    localStorage.removeItem('lesson_scores');
  };

  return (
    <LessonContext.Provider value={{
      studentName,
      setStudentName,
      selectedGroup,
      setSelectedGroup,
      activeTab,
      setActiveTab,
      scores,
      setTaskScore,
      groups,
      setGroups,
      divideIntoGroups,
      totalScore,
      maxTotalScore,
      percentageScore,
      gradeString,
      resetAllProgress
    }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLesson = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLesson must be used within a LessonProvider');
  }
  return context;
};
