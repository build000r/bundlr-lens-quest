import React from "react";
import CommentComposer from "./CommentComposer";
const Publication = ({ id, content, description, media, publisher }) => {
	const [show, setShow] = React.useState(false)

	function openReply(index) {
	  setShow(show === index ? false : index);
	}
	return (

		<div
			className="bg-white p-4 md:p-8 lg:p-10 lg:px-6 border-b hover:bg-gray-50 cursor-pointer">
			<div className="relative">
				<a className="flex items-center"
					href={"/" + publisher.handle}>

					<div className="rounded-full overflow-hidden">
						{ publisher.picture? (
						<img className="w-10 h-10 rounded-full bg-no-repeat bg-cover flex justify-center items-center object-cover hover:opacity-90 transition-opacity border-1 border-white"
							src={publisher.picture?.original.url}
							alt={publisher.handle}
						/>
						):(
							<svg className="h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor">
							<path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
						</svg>
						)}
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
			<div className="mt-4 w-full pl-12">
				<div className="flex items-center">
					<button onClick={() => openReply(id)} className="flex items-center text-xs group relative pr-5 ">
						<span className="inline-flex justify-center items-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="fill-gray-400 group-hover:fill-gray-500 mr-3 flex-shrink-0 h-6 w-6">
								<path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H82.5a16,16,0,0,0-10.3,3.75l-.12.11L40,224V64H216Z"></path>
							</svg>
							<span className="font-semibold text-xs">{/*0*/}</span>

						</span>
					</button>
				</div>
			</div>
			<div key={id} className={`${show === id ? '' : 'hidden'}`}>		
			<CommentComposer publicationId={id} />
			</div>
		</div>

	);
};

export default Publication;