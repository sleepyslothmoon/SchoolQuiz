import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, runTransaction, query } from 'firebase/firestore';
import type { Animal } from '../types';

export function useAnimals(roomId?: string) {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const animalsRef = collection(db, 'Rooms', roomId, 'Animals');
    const q = query(animalsRef);
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const animalsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Animal[];
      setAnimals(animalsData);
    });

    return () => unsubscribe();
  }, [roomId]);

  const selectAnimal = async (roomId: string, animalId: string, studentId: string) => {
    const animalRef = doc(db, 'Rooms', roomId, 'Animals', animalId);
    
    try {
      const success = await runTransaction(db, async (transaction) => {
        const animalDoc = await transaction.get(animalRef);
        
        if (!animalDoc.exists()) {
          // If the animal document doesn't exist, we can't select it
          // Wait, actually, let's create it if it doesn't exist in the subcollection.
          transaction.set(animalRef, {
            iconId: animalId,
            isTaken: true,
            studentId,
            score: 0
          });
          return true;
        }

        const data = animalDoc.data();
        if (data.isTaken) {
          return false; // Already taken
        }

        transaction.update(animalRef, {
          isTaken: true,
          studentId
        });
        return true;
      });

      return success;
    } catch (e) {
      console.error("Transaction failed: ", e);
      return false;
    }
  };

  const submitScore = async (roomId: string, animalId: string, additionalScore: number) => {
    const animalRef = doc(db, 'Rooms', roomId, 'Animals', animalId);
    try {
      await runTransaction(db, async (transaction) => {
        const animalDoc = await transaction.get(animalRef);
        if (animalDoc.exists()) {
          const newScore = (animalDoc.data().score || 0) + additionalScore;
          transaction.update(animalRef, { score: newScore });
        }
      });
    } catch (e) {
      console.error("Score submission failed", e);
    }
  };

  return { animals, selectAnimal, submitScore };
}
