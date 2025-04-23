import React, { useState } from "react";
import Circle from "./Circle"

const ColoredCircles = () => {
    const [circles, setCircles] = useState(['cornflowerblue', 'peachpuff', 'lavender'])
    const addCircle = () => {
        setCircles(circles => [...circles, "magenta"])
        // setCircles(circles => [...circles, "magenta"])

        // setCircles(circles => {
        //     const newCircles = circles.slice();
        //     newCircles.push("magenta");
        //     return newCircles;
        // })
    }


    return (
        <div>
            <button onClick={addCircle}>ADD</button>
            {circles.map( (color, idx) => (
                <Circle color={color} idx={idx} key={idx}/> 
            ))}
        </div>
    )
}

export default ColoredCircles;