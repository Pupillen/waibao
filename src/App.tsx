import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import MatchSelection from '@/pages/MatchSelection';
import TopicBrainstorm from '@/pages/TopicBrainstorm';
import TeamSquare from '@/pages/TeamSquare';
import Workspace from '@/pages/Workspace';
import Editor from '@/pages/Editor';
import DefenseSim from '@/pages/DefenseSim';
import Report from '@/pages/Report';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MatchSelection />} />
        <Route path="brainstorm" element={<TopicBrainstorm />} />
        <Route path="team" element={<TeamSquare />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path="editor" element={<Editor />} />
        <Route path="defense" element={<DefenseSim />} />
        <Route path="report" element={<Report />} />
      </Route>
    </Routes>
  );
}

export default App;
