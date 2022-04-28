import { useContext } from 'react'
import { colorContext } from '../Context/Context'
const useColor = () => {
    const context = useContext(colorContext);
    if (context === undefined) {
        throw new Error('Use of useColor outside the Context')
    }
    return context;
}

export default useColor;