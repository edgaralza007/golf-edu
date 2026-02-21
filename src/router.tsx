import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Onboarding } from './pages/Onboarding';
import { LearningPath } from './pages/LearningPath';
import { LearningModule } from './pages/LearningModule';
import { Lesson } from './pages/Lesson';
import { SwingFundamentals } from './pages/SwingFundamentals';
import { SwingDetail } from './pages/SwingDetail';
import { EquipmentGuide } from './pages/EquipmentGuide';
import { RulesEtiquette } from './pages/RulesEtiquette';
import { Glossary } from './pages/Glossary';
import { Drills } from './pages/Drills';
import { DrillDetail } from './pages/DrillDetail';
import { ScoreTracker } from './pages/ScoreTracker';
import { Dashboard } from './pages/Dashboard';
import { CoursePrep } from './pages/CoursePrep';
import { ShotCoach } from './pages/ShotCoach';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/onboarding', element: <Onboarding /> },
      { path: '/learning-path', element: <LearningPath /> },
      { path: '/learning-path/:moduleId', element: <LearningModule /> },
      { path: '/learning-path/:moduleId/:lessonId', element: <Lesson /> },
      { path: '/swing-fundamentals', element: <SwingFundamentals /> },
      { path: '/swing-fundamentals/:swingType', element: <SwingDetail /> },
      { path: '/equipment-guide', element: <EquipmentGuide /> },
      { path: '/rules-etiquette', element: <RulesEtiquette /> },
      { path: '/glossary', element: <Glossary /> },
      { path: '/drills', element: <Drills /> },
      { path: '/drills/:drillId', element: <DrillDetail /> },
      { path: '/score-tracker', element: <ScoreTracker /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/course-prep', element: <CoursePrep /> },
      { path: '/shot-coach', element: <ShotCoach /> },
    ],
  },
]);
