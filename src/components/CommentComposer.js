import React, { useState, useEffect } from "react";
import { upload } from "../utils/upload";
import { uploadImage } from "../utils/upload-image";
import {
	ContentFocus,
	CollectPolicyType,
	ReferencePolicyType,
	useCreatePost,
	ReferencePolicy,
	useCreateComment,
	ProfileOwnedByMe,
	useActiveProfile
} from "@lens-protocol/react";

const CommentComposer = ({ publicationId }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [fileToUpload, setFileToUpload] = useState(null);
	const [fileType, setFileType] = useState();
	const [caption, setCaption] = useState("");
	const { data: activeProfile, loading: profileLoading } = useActiveProfile();

	const { execute: create, error, isPending } = useCreateComment({ activeProfile, upload });


	// Called when the user selects a file to upload
	const handleFile = async (e) => {
		const newFiles = e.target.files;
		if (newFiles.length === 0) return; // should never happen

		// only accept image/png, image/jpeg
		if (newFiles[0]["type"] !== "image/png" && newFiles[0]["type"] !== "image/jpeg") {
			return;
		}
		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Called when the user clicks "Post"
	const createComment = async () => {
		setTxActive(true);
		setMessage("");

		if (fileToUpload) {
			// image post
			// STEP 1: Upload image
			setMessage("Uploading image ....");
			const imageUrl = await uploadImage(fileToUpload, fileType);
			// STEP 2: Create post
			setMessage("Creating image publication ....");
			try {
				await create({
					publicationId: publicationId,
					profileId: activeProfile.id,
					content: caption,
					contentFocus: ContentFocus.IMAGE,
					locale: "en",
					collect: {
						type: CollectPolicyType.NO_COLLECT,
					},
					reference: { type: ReferencePolicyType.FOLLOWERS_ONLY }, // only followers can interact
					media: [
						{
							url: imageUrl,
							mimeType: fileType,
						},
					],
				});
				setCaption("");
				setFileToUpload(null);
				setFileType("");
				setMessage("Publication posted.");
			} catch (e) {
				setMessage("Error on post " + e);
			}
		} else {
			setMessage("Creating text publication ....");
			// text post
			try {
				await create({
					publicationId: publicationId,
					content: caption,
					profileId: activeProfile.id,
					contentFocus: ContentFocus.TEXT,
					locale: "en",
					reference: { type: ReferencePolicyType.FOLLOWERS_ONLY }, // only followers can interact
				});
				setCaption("");
				setMessage("Publication posted.");
			} catch (e) {
				setMessage("Error on post " + e);
			}
		}
		setTxActive(false);
	};
	console.log(publicationId)
	return (
		<div >
			{
				<div className="flex border-t">
					<div className="m-2 w-10 py-1">
						{activeProfile?.picture ? (
							<img className="inline-block h-10 w-10 rounded-full" alt="" src={activeProfile?.picture?.original.url} />
						) :
							(
								<svg className="w-10 h-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
									<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
								</svg>
							)
						}
					</div>
					<div className="flex-1 px-2 pt-2 mt-2">
						<div className="w-full border-gray-200 rounded-lg">
							<div className="px-4 py-2 bg-white rounded-t-lg">
								<textarea
									rows="2" className="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:outline-0 focus:ring-0" placeholder="Reply..."
									id="name"
									value={caption || ""}
									onChange={(e) => setCaption(e.target.value)}
								>
								</textarea>
								{fileToUpload && (
									<img
										src={URL.createObjectURL(fileToUpload)}
										alt="preview of publication image"
									/>
								)}
							</div>
							<div className="flex items-center justify-between px-3 py-2 border-t">

								<div className="flex pl-0 space-x-1 sm:pl-2">
									<label className="inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="fill-gray-400 group-hover:fill-gray-500 flex-shrink-0 h-6 w-6">
											<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></path></svg>
										<input
											className="sr-only"
											type="file"
											onChange={handleFile}
											multiple="single"
											name="files[]"
										/>
									</label>
								</div>
								<span className="flex items-center">
									<p className="text-sm px-5">{message}</p>

									<button
										className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
										disabled={txActive}
										onClick={createComment}
									>
										Post
									</button>
								</span>
							</div>
						</div>
					</div>
				</div>

			}

		</div>
	);
};

export default CommentComposer;