import React from 'react';
import SpaceshipBattle from './SpaceshipBattle';

const SpaceMain = () => {
    return (
        <div className="space-area">
            <div className="top">
                <h1 className="title"> 🚀 Space Battle Simulator 🚀 </h1>
            </div>
            <SpaceshipBattle />
        </div>
    )
}
export default SpaceMain;