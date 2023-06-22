import React from "react";
import Publication from "../components/Publication";
import { useActiveProfile, useWalletLogin, useFeed } from "@lens-protocol/react";
import { useAccount } from "wagmi";
import Login from "../components/Login";
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
			{!activeProfile && isConnected && (
				<div className="object-center self-center mt-[5%] text-md ml-5">
					You don't have an active profile, please{" "}
					<a href="/edit-profile" className="underline">
						create one
					</a>
				</div>
			)}

			{isConnected && !profileLoading && activeProfile && (
				<div>
					<PublicationComposer publisher={activeProfile} />

					{!feed ||
						(feed.length === 0 && (
							<div className="object-center self-center mt-[5%] text-md ml-5">
								Your feed appears to be empty, try following more accounts.
							</div>
						))}
					{feed &&
						feed.map((publication, id) => {
							return (
								<div key={id}>
								<Publication
									id={publication.root.id}
									content={publication.root.metadata?.content}
									description={publication.root.metadata?.description}
									media={publication.root.metadata?.media}
									publisher={publication.root.profile}
								/>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default ContentFeedPage;