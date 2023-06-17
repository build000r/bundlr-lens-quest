import React from "react";
import ProfileSwitcher from "./ProfileSwitcher";
import {
  useActiveProfile,
} from "@lens-protocol/react";

const LeftNav = () => {
  const { data: activeProfile, loading: activeProfileLoading } = useActiveProfile();
  return (
    <>
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4">
          <div className="flex items-center flex-shrink-0 px-6">
            <a href="/">

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-8 h-8 fill-purple-600 -mt-2 inline-block">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a40,40,0,0,0-28.28,68.28L88.86,167.56A12,12,0,0,0,100,184h56a12,12,0,0,0,11.14-16.44l-10.86-27.28A40,40,0,0,0,128,72Zm11.31,68.9L150.1,168H105.9l10.79-27.1a8,8,0,0,0-2.74-9.44,24,24,0,1,1,28.1,0A8,8,0,0,0,139.31,140.9Zm13,32.58Z"></path>
              </svg>


              <span className="h-8 w-auto text-2xl ml-1 font-bold">
                OnlyBundlr
              </span>
            </a>
          </div>

          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* Navigation */}
            <nav className="px-3 mt-6">

              <div className="space-y-1">

                <a href="/home" className={`${(window.location.pathname === "/home") || (window.location.pathname === "/") ? 'bg-gray-200' : 'hover:bg-gray-50'} text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md`} >

                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="fill-gray-400 group-hover:fill-gray-500 mr-3 flex-shrink-0 h-6 w-6">
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z">
                    </path>
                  </svg>

                  Home
                </a>

                <a href={"/" + activeProfile?.handle} className={`${(window.location.pathname === ("/" + activeProfile?.handle)) || (window.location.pathname === "/edit-profile") ? 'bg-gray-200' : 'hover:bg-gray-50'} text-gray-700 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md`} >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="fill-gray-400 group-hover:fill-gray-500 mr-3 flex-shrink-0 h-6 w-6">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z">
                    </path>
                  </svg>
                  Profile
                </a>

              </div>

              <div>


              </div>

            </nav>

            <ProfileSwitcher showCreateNew={true} />

          </div>
        </div>
      </div>

    </>
  );
};

export default LeftNav;
