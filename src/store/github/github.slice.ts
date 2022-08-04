import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRepo } from "../../models/models";

interface GithubState {
    favorites: string[];
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem("favorites") ?? '[]'),
};

export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            state.favorites.push(action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        }
    }
})

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;