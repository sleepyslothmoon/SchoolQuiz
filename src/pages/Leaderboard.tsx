import { useParams } from 'react-router-dom';

export default function Leaderboard() {
  const { pin } = useParams();

  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">순위표</h1>
      <p>PIN: {pin}</p>
    </div>
  );
}
