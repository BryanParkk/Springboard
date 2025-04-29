import React, { useState } from 'react';
import SpaceBottom from './SpaceBottom'

const SpaceshipBattle = () => {
    const [playerHp, setPlayerHp] = useState(100);
    const [enemyHp, setEnemyHp] = useState(100);
    const playerRandomHp = Math.floor(Math.random() * 30) + 1;
    const enemyRandomHp = Math.floor(Math.random() * 30) + 1;
    
    //button
    const [btnText, setBtnText] = useState("Fire!");

    //bottom
    const [bottomText, setBottomText] = useState('⚠️ Engage the enemy ⚠️');

    //handle fire
    const handleFire = () => {
        if(playerHp > 0 && enemyHp > 0) {
            const playerNew = Math.max(playerHp - playerRandomHp, 0);
            const enemyNew = Math.max(enemyHp - enemyRandomHp, 0);
            
            setPlayerHp(playerNew);
            setEnemyHp(enemyNew);

            if (playerNew === 0 || enemyNew === 0) {
                setBtnText('Restart?');

                if(playerNew === 0 && enemyNew === 0) {
                    setBottomText(`‼️ It's a draw! Both spacecrafts have been neutralized. ‼️`);
                } else if (playerNew === 0) {
                    setBottomText(`Mission Failed. Your spacecraft has been defeated. 😨`);
                } else if (enemyNew === 0) {
                    setBottomText(`🎉 Congratulations! You've successfully defended your spacecraft! 🎉`);
                }
            }
        }
    };

    //handle Restart
    const handleRestart = () => {
        setPlayerHp(100);
        setEnemyHp(100);
        setBtnText('Fire!');
        setBottomText('⚠️ Engage the enemy ⚠️');
    };

    // control handle
    const handleButtonClick = () => {
        if(btnText === 'Fire!') {
            handleFire();
        } else {
            handleRestart();
        }
    };

    return (
        <>
            <div className="mid">
                <div className="player-info">
                    <label className="label-player-name">🛰️ Player Health: </label>
                    <label className="label-player-hp">{playerHp} ❤️</label>
                </div>

                <button className={btnText === 'Fire!' ? 'fire-btn' : 'restart-btn'} onClick={handleButtonClick}>{btnText}</button>

                <div className="enemy-info">
                    <label className="label-enemy-name">🛸 Enemy Health: </label>
                    <label className="label-enemy-hp">{enemyHp} ❤️</label>
                </div>
            </div>

            <div className="bottom">
                <SpaceBottom text={bottomText}/>
            </div>
        </>
    )
}
export default SpaceshipBattle;