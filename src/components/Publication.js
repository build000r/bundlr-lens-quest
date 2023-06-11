import React from "react";

const Publication = ({ id, content, description, media, publisher }) => {
	return (

		<div
			className="bg-white p-4 md:p-8 lg:p-10 lg:px-6 border-b hover:bg-gray-50 cursor-pointer">
			<div className="relative">
				<a className="flex items-center"
					href={"/" + publisher.handle}>

					<div className="rounded-full overflow-hidden">
						<img className="w-10 h-10 rounded-full bg-no-repeat bg-cover flex justify-center items-center object-cover hover:opacity-90 transition-opacity border-1 border-white"
							src={publisher.picture?.original.url}
							alt={publisher.handle}
						/>
					</div>
					<div className="ml-2">
						<div className="flex items-center">
							<h3
								className="text-sm font-medium hover:underline transition">
								{publisher.name}
							</h3>

						</div>
						<div className=" leading-4">
							<p>
								<span className="text-sm text-gray-500">{publisher.handle}</span>
							</p>
						</div>
					</div>
				</a>
			</div>
			<div className="mt-4 pl-12">
				<div className="font-normal mb-2 bottom-margin-8 text-sm">
					<p>
						{content}
					</p>
				</div>
				<div
					className="bg-white rounded-lg mt-4 transition-shadow ease-in-out duration-200 block hover:shadow-focus cursor-pointer">
					<div className="p-0">
						<div
							className="flex items-start flex-col-reverse w-full sm:flex-row gap-0 sm:gap-4">
							{media &&
								media.map((picture, id) => {
									return (
										<img
											className="rounded-md w-full object-cover border-b"
											src={picture.original?.url}
										/>
									);
								})}

						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

export default Publication;