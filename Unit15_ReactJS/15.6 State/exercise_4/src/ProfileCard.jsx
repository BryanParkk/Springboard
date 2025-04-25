import React from 'react';

function ProfileCard( {name, age, hobby} ) {

    return (
        <div>
            <p>이름 : {name}</p>
            <p>나이 : {age}</p>
            <p>취미 : {hobby}</p>
        </div>
    )
}

export default ProfileCard;