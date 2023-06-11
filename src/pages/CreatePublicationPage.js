import React from "react";
import { useActiveProfile } from "@lens-protocol/react";
import PublicationComposer from "../components/PublicationComposer";
import { useAccount } from "wagmi";
import Login from "../components/Login";

const CreatePublication = () => {
	const { data: activeProfile, loading: profileLoading } = useActiveProfile();
	const { isConnected } = useAccount();

	return (
		<div className="flex flex-col w-full">
					{!isConnected && (
					<Login />
			)}
		<div className="flex flex-col w-full">

			{!activeProfile && (
				<div className="object-center self-center mt-[5%] text-md ml-5">
					You don't have an active profile, please{" "}
					<a href="/edit-profile" className="underline">
						create one
					</a>
				</div>
			)}
			{isConnected && !profileLoading && activeProfile && <PublicationComposer publisher={activeProfile} />}
		</div>
		</div>
	);
};

export default CreatePublication;
