import useColor from "../hooks/useColor";
import '../Styles/ColorSelector.css'
const ColorSelector = () => {
    const colors = ['#58249C', '#008000', '#ffc0cb'];
    const { changeColor } = useColor();
    return (
        <div className="colorSelector">
            {colors.map(color => {
                return (
                    <div style={{ background: color }} key={color} onClick={() => changeColor(color)}>
                    </div>
                )
            })}
        </div>

    );
}

export default ColorSelector;