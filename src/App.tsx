import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentLobby from './pages/StudentLobby';
import QuizView from './pages/QuizView';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/room/:pin" element={<StudentLobby />} />
        <Route path="/room/:pin/quiz" element={<QuizView />} />
        <Route path="/room/:pin/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
