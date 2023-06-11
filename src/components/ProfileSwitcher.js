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
			<>

				{!createProfileMode && (

					<div className="px-3 mt-6 relative inline-block text-left">
						<div>
							<button onClick={() => setIsOpen((prev) => !prev)} type="button" className="shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 sm:text-sm sm:leading-6focus:ring-2 focus:ring-inset border-0 group w-full rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-50  focus:ring-purple-500" >
								<span className="flex w-full justify-between items-center">
									<span className="flex min-w-0 items-center justify-between space-x-3">

										<img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" alt="" src={activeProfile?.picture?.original.url} />

										<span className="flex-1 flex flex-col min-w-0">
											<span className="text-gray-900 text-md font-semibold truncate">
												{activeProfile?.name}
											</span>
											<span className="text-gray-500 text-sm truncate">{activeProfile?.handle}</span>
										</span>
									</span>
									<svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
										<path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
									</svg>
								</span>
							</button>
						</div>

						<ul className={`${isOpen ? '' : 'hidden'} z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200`} >
							{profiles &&
								profiles
									?.filter(
										(a, i) =>
											profiles?.findIndex(
												(s) => a.id === s.id,
											) === i,
									)
									.map((profile) => (
										<li className="py-1" onClick={() => switchProfile(profile.id)}>

											<div key={profile.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500" role="menuitem" tabindex="-1">
												<div className="flex items-center">
													<img src={profile.picture?.original.url} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
													<span className="font-normal ml-3 block truncate">{profile.handle}</span>
												</div>
											</div>
										</li>

									))}
						</ul>



					</div>
				)}

				<div className="hidden relative mt-2 px-2">
					<button type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
						<span className="flex items-center">
							{/* 	<img src={activeProfile.picture?.original.url} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
							<span className="ml-3 block truncate">{activeProfile.handle}</span> */}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
							<svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
								<path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
							</svg>
						</span>
					</button>
					<ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{profiles &&
							profiles
								?.filter(
									(a, i) =>
										profiles?.findIndex(
											(s) => a.id === s.id,
										) === i,
								)
								.map((profile) => (
									<li key={profile.id} onChange={(val) => switchProfile(profile.id)} className="border-b text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9" id="listbox-option-0" role="option">
										<div className="flex items-center">
											<img src={profile.picture?.original.url} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
											<span className="font-normal ml-3 block truncate">{profile.handle}</span>
										</div>
									</li>
								))}
					</ul>
				</div>
			</>
		</>
	);
};

export default ProfileSwitcher;