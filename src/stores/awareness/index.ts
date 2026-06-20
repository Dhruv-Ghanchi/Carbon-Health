import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, omitHydration } from '../shared';
import type { HydrationState } from '../shared';
import type { AwarenessCard } from '../../types';

interface AwarenessState extends HydrationState {
  cards: AwarenessCard[];
  
  setCards: (cards: AwarenessCard[]) => void;
  markCardShown: (cardId: string, timestamp: string) => void;
  resetAwareness: () => void;
}

export const useAwarenessStore = create<AwarenessState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      
      cards: [],
      
      setCards: (cards) => set({ cards }),
      markCardShown: (cardId, timestamp) => set((state) => ({
        cards: state.cards.map(card => 
          card.id === cardId ? { ...card, lastShownAt: timestamp } : card
        )
      })),
      resetAwareness: () => set({ cards: [] }),
    }),
    {
      name: STORAGE_KEYS.AWARENESS,
      partialize: omitHydration,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
