import React, { useState, useEffect } from "react"
import axios from "axios"
import ProfileSearchForm from "./ProfileSearchForm"

const ProfileViewerWithSearch = () => {
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState(`https://api.github.com/users/elie`);

    const search = term => {
        setUrl(`https://api.github.com/users/${term}`);
    };

    useEffect(() => {
        async function loadProfile() {
            const res = await axios.get(url);
            setProfile(res.data);
        }
        loadProfile();
    }, [url])

    return (
        <div>
            {profile ? <h1>Hi, {profile.name}</h1> : <h1>Loading.....</h1>}
            <ProfileSearchForm search={search} />
        </div>
    )
}

export default ProfileViewerWithSearch;