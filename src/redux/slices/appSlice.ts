import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum Theme {
    DARK = 'dark',
    WHITE = 'white'
}

enum Lang {
    EN = 'en',
    RU = 'ru'
}

interface IInitStateApp {
    theme: Theme;
    lang: Lang;
}

const initialState: IInitStateApp = {
    theme: Theme.DARK,
    lang: Lang.EN,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        switchTheme: (state) => {
            if (state.theme === Theme.DARK){
                state.theme = Theme.WHITE;
            } else {
                state.theme = Theme.DARK;
            }
        },
        switchLang: (state) => {
            if (state.lang === Lang.EN){
                state.lang = Lang.RU
            } else{
                state.lang = Lang.EN
            }
        }
    }
})

export const { switchTheme, switchLang } = appSlice.actions;

export const appReducer = appSlice.reducer;
