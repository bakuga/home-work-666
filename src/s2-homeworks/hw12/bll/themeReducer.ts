const initState = {
    themeId: 1,
}
export type ThemeStateType = typeof initState;

export type ChangeThemeIdActionType = {
    type: 'SET_THEME_ID'
    id: number
}

// Объединяющий тип для всех возможных экшенов этого редьюсера
type ThemeActionsType = ChangeThemeIdActionType;

export const themeReducer = (state = initState, action: ThemeActionsType): ThemeStateType => { // fix any
    switch (action.type) {
        case 'SET_THEME_ID': {
            return { ...state, themeId: action.id }
        }
        default:
            return state
    }
}

export const changeThemeId = (id: number): ChangeThemeIdActionType => ({
    type: 'SET_THEME_ID',
    id,
})




