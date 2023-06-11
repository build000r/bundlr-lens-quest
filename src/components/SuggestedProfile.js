import React, { useState, useEffect } from "react";
import { useProfile } from "@lens-protocol/react";

const SuggestedProfile = ({ handle }) => {
    const { data: profile, loading } = useProfile({ handle });
    const [profilePicture, setProfilePicture] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        if (profile) {
            setProfilePicture(profile.picture?.original.url);
            // setCoverPicture(profile.coverPicture?.original.url);
            setName(profile.name);
            console.log(profile);
        }
    }, [loading]);

    return (

        <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    {profilePicture && (
                        <img className="w-8 h-8 rounded-full"
                            src={profilePicture}
                            alt={handle} />
                    )}

                </div>
                <div className="flex-1 min-w-0">
                    <a href={"/" + handle} className="text-sm font-medium text-gray-900 truncate">
                        {name}
                    </a>
                    <p className="text-sm text-gray-500 truncate">
                        {handle}
                    </p>
                </div>
                <a href="#" className="hidden text-sm font-medium text-blue-600 hover:underline">
                    Follow
                </a>
            </div>
        </li>



    );
};

export default SuggestedProfile;