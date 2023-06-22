import React, { useState, useEffect } from "react";
import { upload } from "../utils/upload";
import { uploadImage } from "../utils/upload-image";

import {
	Amount,
	useUpdateProfileDetails,
	useUpdateFollowPolicy,
	useCurrencies,
	FollowPolicyType,
} from "@lens-protocol/react";

const EditProfileDetails = ({ profile }) => {
	const [message, setMessage] = useState("");
	const [txActive, setTxActive] = useState(false);
	const [name, setName] = useState("");
	const [bio, setBio] = useState("  ");
	const [followFee, setFollowFee] = useState(0);
	const [chargeCurrency, setChargeCurrency] = useState(0);
	const [fileToUpload, setFileToUpload] = useState();
	const [fileType, setFileType] = useState();
	const {
		data: currencies,
		error: currenciesError,
		loading: currenciesLoading,
	} = useCurrencies();

	const {
		execute: update,
		error: updateError,
		isPending: isUpdatePending,
	} = useUpdateProfileDetails({ profile, upload });

	const {
		execute: updateFollowPolicy,
		isPending: isUpdateFollowPolicyPending,
		error: isUpdateFollowPolicyError,
	} = useUpdateFollowPolicy({ profile });

	useEffect(() => {
		if (profile) {
			setName(profile.name);
			setBio(profile.bio || " ");

			if (profile.followPolicy?.type === FollowPolicyType.CHARGE) {
				setFollowFee(profile.followPolicy?.amount.value.toString());
			} else {
				setFollowFee(0);
			}
		}
	}, [profile]);

	useEffect(() => {
		// If a follow-fee / currency has yet to be set, pick the first in the list
		if (currencies && !currenciesLoading) {
			if (profile.followPolicy?.type !== FollowPolicyType.CHARGE) {
				setChargeCurrency(currencies[0].symbol);
			} else {
				setChargeCurrency(profile.followPolicy?.amount.asset.symbol);
			}
		}
	}, [currenciesLoading]);

	// Called when a user selects a file to be uploaded
	const handleFile = async (e) => {
		const newFiles = e.target.files;
		if (newFiles.length === 0) return;

		setFileToUpload(newFiles[0]);
		setFileType(newFiles[0]["type"]);
	};

	// Called when the user clicks "save"
	const doUpdateProfile = async () => {
		setMessage("");
		setTxActive(true);

		setMessage("Updating profile information ...");

		let coverPicture = "";
		if (fileToUpload) {
			setMessage("Uploading cover picture ...");
			coverPicture = await uploadImage(fileToUpload, fileType);
		} else {
			coverPicture = profile.coverPicture?.original.url || null;
		}
		const attributes = {
			location: "",
			website: "",
		};
		setMessage("Uploading profile information ...");

		await update({ name, bio, coverPicture, attributes });
		setMessage("Profile updated.");
		setTxActive(false);

		// Only set the fee if a number greater than 0 is supplied
		if (followFee && followFee > 0) {
			await doUploadFollowPolicy();
		}
	};

	// Sets up the follow policy object
	function resolveFollowPolicy({ followPolicyType, amount, recipient }) {
		if (followPolicyType === FollowPolicyType.CHARGE) {
			return {
				type: FollowPolicyType.CHARGE,
				amount: amount,
				recipient: recipient,
			};
		}

		return {
			type: FollowPolicyType[followPolicyType],
		};
	}

	// Sets the fee to follow a profile
	const doUploadFollowPolicy = async () => {
		const recipient = profile.ownedBy;

		const erc20 = currencies.find((c) => c.symbol === chargeCurrency);
		const fee = Amount.erc20(erc20, followFee);
		await updateFollowPolicy({
			followPolicy: resolveFollowPolicy({
				amount: fee,
				followPolicyType: FollowPolicyType.CHARGE,
				recipient,
			}),
		});
	};

	return (
		<>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900 pt-4">Personal Information</h2>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<label for="email" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
							<div className="mt-2">
								<input
									className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
									id="name"
									type="text"
									size="50"
									value={name || ""}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label for="about" className="block text-sm font-medium leading-6 text-gray-900">Bio</label>
							<div className="mt-2">
								<textarea
									className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
									id="bio"
									type="text"
									value={bio || ""}
									onChange={(e) => setBio(e.target.value)}
									rows="3"
								/>
							</div>
						</div>
						<div className="sm:col-span-4">
							<label for="username" className="block text-sm font-medium leading-6 text-gray-900">Subscription fee</label>
							<div className="relative mt-2 rounded-md shadow-sm">
								<input id="fee"
								   step=".01"
								   min="0"
									type="number"
									value={followFee}
									onChange={(e) => setFollowFee(e.target.value)} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-2  focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6" placeholder="0.00" />
								<div className="absolute inset-y-0 right-0 flex items-center border">
									<select
										name="chargeCurrency"
										className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:outline-0 focus:ring-2  focus:ring-inset focus:ring-gray-300 sm:text-sm"
										defaultValue={
											profile.followPolicy?.type === FollowPolicyType.CHARGE
												? profile.followPolicy.amount.asset.symbol
												: undefined
										}
										onChange={(e) => setChargeCurrency(e.target.value)}
									>
										{currencies &&
											currencies.map((currency) => (
												<option
													key={currency.symbol}
													value={currency.symbol}
													selected={currency.symbol === chargeCurrency}
												>
													{currency.symbol}
												</option>
											))}
									</select>
								</div>
							</div>
						</div>



						<div className="col-span-full">
							<label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<div className="text-center">

									{fileToUpload ? (
										<img src={URL.createObjectURL(fileToUpload)} alt="profile_pic" />
									)
										:
										(
											<svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
												<path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
											</svg>
										)
									}
									<div className="mt-4 text-sm leading-6 text-gray-600 flex flex-col item-center">
										<label for="coverpic" className="relative cursor-pointer rounded-md bg-white font-semibold text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-300 focus-within:ring-offset-2 hover:text-gray-500">
											<span>Upload a file</span>
											<input
												type="file"
												onChange={handleFile}
												className="sr-only"
												multiple="single"
												name="files[]"
												id="coverpic"
											/>
										</label>
										<p className="pl-1 invisible">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
			<span className="text-sm">{message}</span>

				<button 
				disabled={txActive}
				onClick={doUpdateProfile}
				className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Save</button>
			</div>
		</>
	);
};

export default EditProfileDetails;