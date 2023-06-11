import React, { useState, useEffect } from "react";
import SuggestedProfile from "../components/SuggestedProfile";
import { useExploreProfiles } from "@lens-protocol/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SiSpringCreators } from "react-icons/si";

const RightNav = () => {
	const [suggestedProfileHandles, setSuggestedProfileHandles] = useState([]);
	const { isConnected } = useAccount();

	useEffect(() => {
		// Hardcoded list of profiles to follow
		const profiles = [
			"llamakahlo.test",
			"llamaanime.test",
			"llamablackandwhite.test",
			"llamafigurine.test",
			"llamabasquiat.test",
		];
		// Shuffle the order
		for (let i = profiles.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[profiles[i], profiles[j]] = [profiles[j], profiles[i]];
		}
		// Pick just 4
		setSuggestedProfileHandles(profiles.slice(0, 4));
	}, []);

	return (
				<div className="border-l hidden lg:flex lg:flex-shrink-0 top-0 sticky"> 
			{/*<div className="border-l w-2/6 h-screen sticky top-0 pt-5 bg-background "> */}

			{isConnected && (
				<div className="border-b w-full max-w-md p-4 bg-white sm:p-8">
					<div className="flex items-center justify-between mb-4">
						<h5 className="text-xl font-bold leading-none text-gray-900">Suggested Profiles</h5>
					</div>
					<div className="flex flex-col">
						<ul className="divide-y divide-gray-200">

							{suggestedProfileHandles.map((suggestedProfileHandle, id) => {
								return (
									<SuggestedProfile
										key={id}
										handle={suggestedProfileHandle}
									/>
								);
							})}
						</ul>

					</div>
				</div>
				
			)}
		</div>
	);
};

export default RightNav;