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
        switchLang: (state, action: PayloadAction<Lang>) => {
            if (!Object.values(Lang).includes(action.payload)) {
                return state;
            }
            state.lang = action.payload;
        }
    }
})

export const { switchTheme, switchLang } = appSlice.actions;

export const appReducer = appSlice.reducer;
