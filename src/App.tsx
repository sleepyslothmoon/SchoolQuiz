import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EthicsGuide from './pages/EthicsGuide';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherRoom from './pages/TeacherRoom';
import StudentLobby from './pages/StudentLobby';
import QuizView from './pages/QuizView';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)] selection:bg-[var(--color-signal)] selection:text-white font-sans">
      <Routes>
        <Route path="/" element={<EthicsGuide />} />
        <Route path="/home" element={<Home />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/room/:pin" element={<TeacherRoom />} />
        <Route path="/room/:pin" element={<StudentLobby />} />
        <Route path="/room/:pin/quiz" element={<QuizView />} />
        <Route path="/room/:pin/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
