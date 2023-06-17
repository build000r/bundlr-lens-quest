import React from "react";
import { useAccount } from "wagmi";
import { useActiveProfile } from "@lens-protocol/react";
import EditProfileDetails from "../components/EditProfileDetails";
import EditProfilePicture from "../components/EditProfilePicture";
import Login from "../components/Login";
import ProfileSwitcher from "../components/ProfileSwitcher";
import BundlrBalance from "../components/BundlrBalance";
import { SiSpringCreators } from "react-icons/si";

const EditProfile = () => {
	const { isConnected } = useAccount();
	const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
	return (
		<div className="flex flex-col w-full">
			{!isConnected && (
				<Login />
			)}
			<div className="flex flex-col w-full px-5 pt-16 lg:pt-0">
				{isConnected && (
					<div className="flex flex-wrap flex-col">
						<div className="hidden">
							<ProfileSwitcher showCreateNew={false} />
						</div>
						<BundlrBalance />

						{activeProfile && (
							<>
								{!activeProfileLoading && <EditProfileDetails profile={activeProfile} />}

								{!activeProfileLoading && <EditProfilePicture profile={activeProfile} />}
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default EditProfile;
