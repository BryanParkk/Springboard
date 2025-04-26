import React, { useState } from "react";
import Circle from "./Circle";
import ColorButtons from "./ColorButtons";

const ColoredCircles = () => {
    const [circles, setCircles] = useState([])
    const addCircle = (color) => {
        setCircles(circles => [...circles, color]);
    };

    return (
        <div>
            <ColorButtons addCircle={addCircle} options={['peachpuff', 'lightsteelblue', 'paleturquoise']} />
            {circles.map( ( color, idx) => (
                <Circle 
                    changePosition={changePosition}
                    color={color}
                    idx={idx}
                    key={idx}
                /> 
            ))}
        </div>
    )
}

export default ColoredCircles;