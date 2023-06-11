import React, { useState } from "react";
import { uploadImage } from "../utils/upload-image";
import { useUpdateProfileImage } from "@lens-protocol/react";

const EditProfilePicture = ({ profile }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [fileToUpload, setFileToUpload] = useState();
	const [fileType, setFileType] = useState();
	const {
		execute: updateProfileImage,
		error: updateProfileImageError,
		isPending: updateProfileImagePending,
	} = useUpdateProfileImage({
		profile,
	});

	// Called when the user selects a file to be uploaded
	const handleFile = async (e) => {
		const newFiles = e.target.files;
		if (newFiles.length === 0) return;

		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Called when the user clicks "upload"
	const doUpdateProfilePicture = async () => {
		setMessage("");
		setTxActive(true);
		if (!fileToUpload) {
			setMessage("Please select an image first");
			setTxActive(false);
			return;
		}

		try {
			setMessage("Uploading image ...");
			const newProfileURL = await uploadImage(fileToUpload, fileType);
			setMessage("Linking image with profile ...");
			await updateProfileImage(newProfileURL);
		} catch (e) {
			console.log("Error on update ", e);
		}
		setMessage("Profile image uploded.");
		setTxActive(false);
	};

	return (
		<div className="border-t mt-4">
			<div className="col-span-full py-4">
				<label for="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
				<div className="mt-2 flex items-center gap-x-3">
					{profile?.picture && !fileToUpload && (
						<img className="h-12 w-12 text-gray-300 rounded-full" src={profile.picture?.original.url} alt="profile_pic" />
					)}
					{fileToUpload && (
						<img className="h-12 w-12 text-gray-300 rounded-full" src={URL.createObjectURL(fileToUpload)} alt="profile_pic" />
					)}
					{!profile?.picture && !fileToUpload && (
						<svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
						</svg>
					)}


					<label for="pfp" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
						<span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</span>
						<input
							type="file"
							onChange={handleFile}
							className="sr-only"
							multiple="single"
							name="files[]"
							id="pfp"
						/>
					</label>
				</div>
			</div>
			{fileToUpload && (
				<img src={URL.createObjectURL(fileToUpload)} alt="profile_pic" />
			)}
			<div className="mt-6 flex items-center justify-end gap-x-6 border-t pt-4">

				<span className="text-sm">{message}</span>

				<button
					disabled={txActive}
					onClick={() => doUpdateProfilePicture()}
					className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Save</button>
			</div>
			{/* 
			<label className="font-main block uppercase text-xs font-bold mb-2">
				Profile Picture
			</label>
			{profile?.picture && !fileToUpload && (
				<img width="600" src={profile.picture?.original.url} alt="profile_pic" />
			)}
			{fileToUpload && (
				<img src={URL.createObjectURL(fileToUpload)} alt="profile_pic" />
			)}
			<div className="flex flex-row justify-start px-2 py-1 ">
				<input
					type="file"
					onChange={handleFile}
					className="px-2 text-sm text-white rounded-lg w-full"
					multiple="single"
					name="files[]"
				/>
				<div className="flex flex-row justify-end align-start w-full bg-primary ">
					<span className="font-main text-message mr-5">{message}</span>

					<button
						className="font-main px-5 text-white rounded-lg bg-background enabled:hover:bg-secondary border border-red-500"
						disabled={txActive}
						onClick={() => doUpdateProfilePicture()}
					>
						1upload
					</button>
				</div>
			</div>
			*/}
		</div>
	);
};

export default EditProfilePicture;