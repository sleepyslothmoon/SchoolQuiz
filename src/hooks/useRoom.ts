import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, getDocs, limit } from 'firebase/firestore';
import { Room } from '../types';

export function useRoom(pin?: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pin) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'Rooms'), where('pin', '==', pin), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        setRoom({ id: docData.id, ...docData.data() } as Room);
      } else {
        setRoom(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [pin]);

  const createRoom = async () => {
    const newPin = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit pin
    const newRoom: Room = {
      pin: newPin,
      status: 'LOBBY',
      currentQuestion: 0,
      createdAt: Date.now(),
    };
    const docRef = await addDoc(collection(db, 'Rooms'), newRoom);
    return { id: docRef.id, ...newRoom };
  };

  const updateRoomStatus = async (roomId: string, status: Room['status'], currentQuestion?: number) => {
    const roomRef = doc(db, 'Rooms', roomId);
    const updates: Partial<Room> = { status };
    if (currentQuestion !== undefined) {
      updates.currentQuestion = currentQuestion;
    }
    await updateDoc(roomRef, updates);
  };

  return { room, loading, createRoom, updateRoomStatus };
}
