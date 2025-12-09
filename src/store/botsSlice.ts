import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface BotConfig {
  id: string;
  name: string;
  url: string;
  secretKey: string;
}

interface BotsState {
  bots: BotConfig[];
  selectedBotId: string | null;
}

const loadBots = (): BotConfig[] => {
  try {
    const stored = localStorage.getItem("metrics_dashboard_bots");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: BotsState = {
  bots: loadBots(),
  selectedBotId: null,
};

const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    addBot: (state, action: PayloadAction<BotConfig>) => {
      state.bots.push(action.payload);
      localStorage.setItem("metrics_dashboard_bots", JSON.stringify(state.bots));
      if (!state.selectedBotId) {
        state.selectedBotId = action.payload.id;
      }
    },
    removeBot: (state, action: PayloadAction<string>) => {
      state.bots = state.bots.filter((b) => b.id !== action.payload);
      localStorage.setItem("metrics_dashboard_bots", JSON.stringify(state.bots));
      if (state.selectedBotId === action.payload) {
        state.selectedBotId = state.bots.length > 0 ? state.bots[0].id : null;
      }
    },
    selectBot: (state, action: PayloadAction<string>) => {
      state.selectedBotId = action.payload;
    },
    updateBot: (state, action: PayloadAction<BotConfig>) => {
      const index = state.bots.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bots[index] = action.payload;
        localStorage.setItem("metrics_dashboard_bots", JSON.stringify(state.bots));
      }
    },
  },
});

export const { addBot, removeBot, selectBot, updateBot } = botsSlice.actions;
export default botsSlice.reducer;
