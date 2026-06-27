import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import EthicsGuide from './pages/EthicsGuide';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherRoom from './pages/TeacherRoom';
import StudentLobby from './pages/StudentLobby';
import QuizView from './pages/QuizView';
import Leaderboard from './pages/Leaderboard';
import { Footer } from './components/layout/Footer';

function App() {
  const location = useLocation();
  // 퀴즈 화면이나 리더보드 화면에서는 몰입을 위해 푸터를 숨깁니다.
  const hideFooter = location.pathname.includes('/quiz') || location.pathname.includes('/leaderboard');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-canvas)] text-[var(--color-ink)] selection:bg-[var(--color-signal)] selection:text-white font-sans">
      <div className="flex-1">
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
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
