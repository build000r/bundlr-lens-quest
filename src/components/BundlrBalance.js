import React, { useState, useEffect } from "react";
import { getBalanceMatic } from "../utils/get-balance-matic";
import { fundNode } from "../utils/fund-node";
import CreateProfile from "./CreateProfile";

const BundlrBalance = () => {
	const [curBalance, setCurBalance] = useState(0);
	const [fundAmount, setFundAmount] = useState(0);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchBalance = async () => {
			setCurBalance(await getBalanceMatic());
		};
		fetchBalance();
	}, []);

	// Called when the "fund" button is clicked by the user
	const doFund = async () => {
		if (!fundAmount) {
			setMessage("Please specify an amount to fund");
			return;
		}
		setMessage(`Funding ${fundAmount} MATIC`);
		const fundStatus = await fundNode(fundAmount);
		setMessage(fundStatus);
		setCurBalance(await getBalanceMatic());
		setFundAmount(0);
	};

	return (
			<div className="border-b border-gray-900/10 pb-12">
				<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<CreateProfile showCreateNew={true} /> 
					<div className="col-span-full">
						<div className="mt-2 flex items-center gap-x-3">
							<label for="photo" className="block text-sm font-medium leading-6 text-gray-900">Bundlr Node Balance:</label>
							<p className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{curBalance}</p>
						</div>
					</div>
					<div className="sm:col-span-4">
						<label for="username" className="block text-sm font-medium leading-6 text-gray-900">Amount to Fund</label>
						<div className="mt-2 flex gap-x-4">
							<input
								id="fundAmount"
								type="number"
								size="10"
								value={fundAmount || ""}
								onChange={(e) => setFundAmount(e.target.value)}
								placeholder="0.00"
								className="p-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
							<button onClick={() => doFund()} type="button" className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Fund</button>
						</div>
					</div>
				</div>
				<span className="text-sm mr-5">{message}</span>

			</div>
	);
};

export default BundlrBalance;