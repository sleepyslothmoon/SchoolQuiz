import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, limit } from 'firebase/firestore';
import type { Room } from '../types';

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
    
    // Create a timeout promise to prevent infinite hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("서버 응답 시간 초과 (5초). Firebase 설정이 올바르게 적용되었는지 확인해주세요.")), 5000)
    );
    
    const docRef = await Promise.race([
      addDoc(collection(db, 'Rooms'), newRoom),
      timeoutPromise
    ]) as any;
    
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
