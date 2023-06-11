import React, { useState, useEffect } from "react";
import { useProfile, useActiveProfile, FollowPolicyType } from "@lens-protocol/react";
import FollowButton from "../components/FollowButton";
import PublicationFeed from "../components/PublicationFeed";

const ProfileFeedPage = () => {
	const [profilePicture, setProfilePicture] = useState("");
	const [coverPicture, setCoverPicture] = useState("");
	const [followFee, setFollowFee] = useState(0);
	const [followCurrency, setFollowCurrency] = useState(0);
	const [currentHandle, setCurrentHandle] = useState("");

	const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
	const { data: profile, loading: profileLoading } = useProfile({ handle: currentHandle });

	const [following, setFollowing] = useState(false);

	useEffect(() => {
		// Update the document title using the browser API
		setCurrentHandle(window.location.href);

		// Grab just the user's handle (the final part of the URL)
		// Regex from Professor ChatGPT
		const regex = /[^/]*$/;
		setCurrentHandle(window.location.href.match(regex)[0]);
	});

	useEffect(() => {
		if (profile) {
			let profilePictureURL = profile.picture?.original.url;
			let coverPictureURL = profile.coverPicture?.original.url;

			setProfilePicture(profilePictureURL);
			setCoverPicture(coverPictureURL);
			setFollowing(profile.__isFollowedByMe);

			if (profile.followPolicy?.type === FollowPolicyType.CHARGE) {
				setFollowFee(profile.followPolicy?.amount.value.toString());
				setFollowCurrency(profile.followPolicy?.amount.asset.name);
			} else {
				setFollowFee(0);
			}
		}
	}, [profile]);

	return (
		<div className="w-full">

			<div className="top-0 relative h-62 rounded-xl">
				<img className="z-0 h-32 object-cover w-full"  src={coverPicture} alt="header" />
				<div className="px-2">
					<img
						className="absolute top-20 z-10 h-24 w-24 rounded-full border-2 border-white "
						src={profilePicture}
						alt={currentHandle}
					/>

					{!activeProfileLoading && !profileLoading && profile?.id !== activeProfile?.id && (
						<div className="flex flex-row justify-end mt-2">
							{followFee === 0 && <span className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50">Follow Fee: FREE</span>}
							{followFee !== 0 && (
								<span className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
									Follow Fee: {followFee} {followCurrency}
								</span>
							)}
							<FollowButton followee={profile} follower={activeProfile} /> 
						</div>
					)}
					<h1 className="text-gray-900 hover:text-gray-900 group flex items-center px-2 pt-20 pb-1 text-sm font-medium rounded-md">{profile?.name}</h1>

					<h1 className=" text-gray-500 hover:text-gray-900 group flex items-center px-2 text-sm font-medium rounded-md">{profile?.handle}</h1>

					{profile?.id === activeProfile?.id && (
						<h1 className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">{profile?.bio}</h1>
					)}
					{profile?.id !== activeProfile?.id && (
						<h1 className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">{profile?.bio}</h1>
					)}
				</div>
			</div>
			<div className="flex justify-left mt-3 px-4 border-b">
				<a href="#" className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
					{profile?.stats.totalPublications} Posts
				</a>
				<a href="#" className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
					{profile?.stats.totalCollects} Likes
				</a>
				<a href="#" className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50">
					{profile?.stats.totalFollowers} Followers
				</a>
			</div>
			{!profileLoading && (profile.followStatus?.isFollowedByMe || profile?.id === activeProfile?.id) && (
				<PublicationFeed profile={profile} />
			)}
		</div>
	);
};

export default ProfileFeedPage;
