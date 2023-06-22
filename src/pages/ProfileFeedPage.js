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
		<div className="w-full pt-16 lg:pt-0">
			<div className="top-0 relative h-62 rounded-xl">
				{coverPicture ? (
				<img className="z-0 h-32 object-cover w-full" src={coverPicture} alt="header" />
				):(
					<div className="h-32 bg-gray-200"></div> 
				)}
				<div className="px-2">
					{profilePicture ? (
						<img
							className="absolute top-20 z-10 h-24 w-24 rounded-full border-2 border-white "
							src={profilePicture}
							alt={currentHandle}
						/>
					) : (
						<svg className="h-24 w-24 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
							<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
						</svg>
					)
					}
					{!activeProfileLoading && !profileLoading && profile?.id !== activeProfile?.id ? (
						<div className="flex flex-row justify-end mt-2">
							{followFee === 0 && <span className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50">Follow Fee: FREE</span>}
							{followFee !== 0 && (
								<span className="text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md">
									Follow Fee: {followFee} {followCurrency}
								</span>
							)}
							<FollowButton followee={profile} follower={activeProfile} />
						</div>
					) :
						(
							<div className="flex flex-row justify-end mt-2">
								<a href="/edit-profile" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
									Edit Profile
								</a>
							</div>)
					}
					<h1 className="text-gray-900 hover:text-gray-900 group flex items-center px-2 pt-10 pb-1 text-sm font-medium rounded-md">{profile?.name}</h1>

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
