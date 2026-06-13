import { useParams } from 'react-router-dom';

export default function StudentLobby() {
  const { pin } = useParams();

  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold">동물 선택하기</h1>
      <p>PIN: {pin}</p>
    </div>
  );
}
