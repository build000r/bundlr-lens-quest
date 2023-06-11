import React from "react";
import Publication from "../components/Publication";
import { useActiveProfile, useWalletLogin, useFeed } from "@lens-protocol/react";
import { useAccount } from "wagmi";
import Login from "../components/Login";
import ProfileSwitcher from "../components/ProfileSwitcher";
import { SiSpringCreators } from "react-icons/si";
import PublicationComposer from "../components/PublicationComposer";

const ContentFeedPage = () => {
	const { data: activeProfile, loading: profileLoading } = useActiveProfile();
	const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();
	const { isConnected } = useAccount();

	const {
		data: feed,
		loading,
		hasMore,
		next,
	} = useFeed({
		profileId: activeProfile?.id,
		limit: 10,
	});

	return (
		<div className="flex flex-col w-full">
			{!isConnected && (
				<Login />
			)}
			{!activeProfile && (
				<div className="object-center self-center mt-[5%] text-md ml-5">
					You don't have an active profile, please{" "}
					<a href="/edit-profile" className="underline">
						create one
					</a>
				</div>
			)}
			{isConnected && !profileLoading && activeProfile && <PublicationComposer publisher={activeProfile} />}

			{isConnected && !profileLoading && activeProfile && (
				<div>
					<div className="hidden">
						<ProfileSwitcher showCreateNew={false} />
					</div>

					{!feed ||
						(feed.length === 0 && (
							<div className="object-center self-center mt-[5%] text-md ml-5">
								Your feed appears to be empty, try following more accounts.
							</div>
						))}
					{feed &&
						feed.map((publication, id) => {
							return (
								<Publication
									key={publication.root.id}
									content={publication.root.metadata?.content}
									description={publication.root.metadata?.description}
									media={publication.root.metadata?.media}
									publisher={publication.root.profile}
								/>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default ContentFeedPage;