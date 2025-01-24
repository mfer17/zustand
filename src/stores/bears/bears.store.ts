import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Bear {
    id: number;
    name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bearsDetails: Bear[];
  totalBears: () => number;
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  doNothing: () => void;
  addBear: () => void;
  clearsBears: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 1,
      bearsDetails: [{
        id: 1,
        name: "oso 1"
      }],
      totalBears: () => {
        return get().blackBears + get().pandaBears + get().polarBears + get().bearsDetails.length;
      },
      increaseBlackBears: (by) => set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by) => set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by) => set((state) => ({ pandaBears: state.pandaBears + by })),
      doNothing: () => set(state => ({bearsDetails: [...state.bearsDetails]})),
      addBear: () => set(state => ({bearsDetails: [
        ...state.bearsDetails,
        {id: state.bearsDetails.length+1, name:`Oso #${state.bearsDetails.length + 1}`}
      ]})),
      clearsBears: () => set({bearsDetails: []})
    }),
    { name: 'bears-store' }
  )
)