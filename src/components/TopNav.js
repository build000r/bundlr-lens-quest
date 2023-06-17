import React from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import {
  useActiveProfile,
} from "@lens-protocol/react";

const TopNav = () => {
  const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
  return (
        <div className="w-full fixed top-0 border-b z-50 bg-white lg:hidden block">
          <div className="grid grid-cols-4 w-full p-3 border-b border-gray-300 ">
            <a className="flex flex-col items-center justify-center" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-purple-600 inline-block">
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a40,40,0,0,0-28.28,68.28L88.86,167.56A12,12,0,0,0,100,184h56a12,12,0,0,0,11.14-16.44l-10.86-27.28A40,40,0,0,0,128,72Zm11.31,68.9L150.1,168H105.9l10.79-27.1a8,8,0,0,0-2.74-9.44,24,24,0,1,1,28.1,0A8,8,0,0,0,139.31,140.9Zm13,32.58Z"></path>
                </svg>
            </a>
            <a className="flex flex-col items-center justify-center" href="/home">
            <label className={`${(window.location.pathname === "/home") || (window.location.pathname === "/") ? 'bg-gray-200' : 'hover:bg-gray-50'} inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 `} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="fill-gray-400 group-hover:fill-gray-500 flex-shrink-0 h-6 w-6">
              <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z">
                    </path>
                    </svg>
                    </label>
            </a>
            <a className="flex flex-col items-center justify-center" href={"/" + activeProfile?.handle}>
            <label className={`${(window.location.pathname === ("/" + activeProfile?.handle)) || (window.location.pathname === "/edit-profile") ? 'bg-gray-200' : 'hover:bg-gray-50'} inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900`} >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="fill-gray-400 group-hover:fill-gray-500 flex-shrink-0 h-6 w-6">
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
                </label>
            </a>
            <div className="flex flex-col items-center justify-center">
            <ProfileSwitcher showCreateNew={false} />
            </div>   
          </div>
        </div>

  );
};

export default TopNav;
