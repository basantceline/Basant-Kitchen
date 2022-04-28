import { createContext, useReducer } from 'react';
export const colorContext = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case 'green':
            return { ...state, color: action.payload }
        default:
            return state
    }
}
const ColorProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { color: '#58249C' })
    const changeColor = (color) => {
        dispatch({ type: 'green', payload: color })
    }
    return (
        <colorContext.Provider value={{ ...state, changeColor }}>
            {children}
        </colorContext.Provider>
    );
}
export default ColorProvider;