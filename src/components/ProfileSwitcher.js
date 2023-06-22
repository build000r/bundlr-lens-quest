import React, { useState, useEffect } from "react";

import {
	useActiveProfile,
	useCreateProfile,
	useProfilesOwnedByMe,
	useActiveProfileSwitch,
} from "@lens-protocol/react";

const ProfileSwitcher = ({ showCreateNew }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [createProfileMode, setCreateProfileMode] = useState(false);
	const [newProfileHandle, setNewProfileHandle] = useState("");
	const {
		data: profiles,
		loading: profilesLoading,
		hasMore,
		next,
	} = useProfilesOwnedByMe();
	const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
	const { execute: switchProfile, isPending } = useActiveProfileSwitch();

	const [isOpen, setIsOpen] = useState(false)

	/*function openReply(index) {
		setShow(show === index ? false : index);
	}*/

	useEffect(() => {
		if (!profiles || profiles.length === 0) setCreateProfileMode(true);
		else setCreateProfileMode(false);
	}, [profilesLoading]);

	return (
		<>
			{!createProfileMode && (

				<div className={`${showCreateNew ? 'px-3 mt-6 relative inline-block text-left' : ''} `} >
					<button onClick={() => setIsOpen((prev) => !prev)} type="button"
						className={`${showCreateNew ? 'shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none sm:text-sm sm:leading-6 focus:ring-inset border-0 group w-full rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-50 ' : ''} `} >

						<span className="flex w-full justify-between items-center">
							<span className="flex min-w-0 items-center justify-between space-x-3">
								{activeProfile?.picture ? (
									<img className={`${showCreateNew ? 'w-10 h-10' : 'w-7 h-7'}  bg-gray-300 rounded-full flex-shrink-0`} alt="" src={activeProfile?.picture?.original.url} />
								) :
									(
										<svg className={`${showCreateNew ? 'w-10 h-10' : 'w-7 h-7'} text-gray-300`} viewBox="0 0 24 24" fill="currentColor">
											<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
										</svg>
									)
								}
								<span className={`${showCreateNew ? 'flex-1 flex flex-col min-w-0' : 'hidden'}`}>
									<span className="text-gray-900 text-md font-semibold truncate">
										{activeProfile?.name}
									</span>
									<span className="text-gray-500 text-sm truncate">{activeProfile?.handle}</span>
								</span>
							</span>
							<svg className={`${showCreateNew ? '' : 'hidden'} h-5 w-5 text-gray-400`} viewBox="0 0 20 20" fill="currentColor" >
								<path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
							</svg>
						</span>
					</button>

					<ul className={`${isOpen ? '' : 'hidden'} z-10 mx-3 origin-top absolute right-0 lg:left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200`} >
						{profiles &&
							profiles
								?.filter(
									(a, i) =>
										profiles?.findIndex(
											(s) => a.id === s.id,
										) === i,
								)
								.map((profile) => (
									<li key={profile.id} className="cursor-pointer" onClick={() => { switchProfile(profile.id); setIsOpen((prev) => !prev) }}>

										<div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100" tabIndex="-1">
											<div className="flex items-center">
												{profile.picture ? (
													<img src={profile.picture?.original.url} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
												) :
													(
														<svg className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
															<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
														</svg>
													)}
												<span className="ml-3 block truncate">{profile.handle}</span>
											</div>
										</div>
									</li>

								))}
					</ul>



				</div>
			)}
		</>
	);
};

export default ProfileSwitcher;