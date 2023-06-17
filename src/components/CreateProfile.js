import React, { useState, useEffect } from "react";

import {
	useCreateProfile,
	useProfilesOwnedByMe,
} from "@lens-protocol/react";

const CreateProfile = ({ showCreateNew }) => {
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

	const {
		execute: createNewProfile,
		error: createNewProfileError,
		isPending: createNewProfilePending,
	} = useCreateProfile();

	// Called when the user clicks "save new profile"
	const doCreateProfile = async () => {
		setMessage("");
		setTxActive(true);
		try {
			setMessage("Creating profile ...");
			const tx = await createNewProfile(newProfileHandle);
			setMessage("Profile created.");
		} catch (e) {
			setMessage("Error creating profile " + e);
			console.log("Error on create profile ", e);
		}
		setTxActive(false);
		setCreateProfileMode(false);
	};

	useEffect(() => {
		if (!profiles || profiles.length === 0) setCreateProfileMode(true);
		else setCreateProfileMode(false);
	}, [profilesLoading]);

	return (
		<>
					<div className="col-span-full">
						{!createProfileMode && (
							<div>

								{showCreateNew && (
									<button
										className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										onClick={() => setCreateProfileMode(true)}
									>
										Create New Profile
									</button>
								)}
							</div>
						)}
					</div>
					<div className="sm:col-span-4">
						{createProfileMode && (
							<>
								<h2 className="block text-sm font-medium leading-6 text-gray-900">Create new profile</h2>

								<div className="mt-2 flex gap-x-4">
									<input
										id="newProfileHandle"
										type="text"
										onChange={(e) => setNewProfileHandle(e.target.value)}
										className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:outline-0 focus:ring-gray-300 sm:text-sm sm:leading-6" />
									<button
										disabled={txActive}
										onClick={doCreateProfile} type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Save</button>
								</div>
							</>
						)}
						<span className="text-sm">{message}</span>

					</div>
				</>
					

	);
};

export default CreateProfile;