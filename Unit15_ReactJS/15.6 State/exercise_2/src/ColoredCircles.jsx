import React, { useState } from "react";
import Circle from "./Circle";
import ColorButtons from "./ColorButtons";

const ColoredCircles = () => {
    const [circles, setCircles] = useState(['cornflowerblue', 'peachpuff', 'lavender'])
    const addCircle = (color) => {
        setCircles(circles => [...circles, color])
        // setCircles(circles => [...circles, "magenta"])

        // setCircles(circles => {
        //     const newCircles = circles.slice();
        //     newCircles.push("magenta");
        //     return newCircles;
        // })
    }

    return (
        <div>
            <ColorButtons addCircle={addCircle} options={['peachpuff', 'lightsteelblue', 'paleturquoise']} />
            {circles.map( (color, idx) => (
                <Circle color={color} idx={idx} key={idx}/> 
            ))}
        </div>
    )
}

export default ColoredCircles;