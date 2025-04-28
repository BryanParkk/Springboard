import React, { useState } from 'react';
import SpaceBottom from './SpaceBottom'

const SpaceMain = () => {
    const a = 'Bryan';
    console.log(`Hello World, ${a}`);

    return (
        <>
            <h1 className="title"> Space Battle Simulator</h1>
            <div className="player-info">
                <label className="label-player-name">Player Health: </label>
                <label className="label-player-hp">0</label>
            </div>

            <button className="btn-battle">Fire!</button>

            <div className="enemy-info">
                <label className="label-enemy-name">Enemy Health: </label>
                <label className="label-enemy-hp">0</label>
            </div>

            <div>
                <SpaceBottom />
            </div>
        </>
    )
}
export default SpaceMain;