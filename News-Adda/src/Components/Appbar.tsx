import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Appbar = () => {
    return (
        <div className="h-20 bg-violet-500 w-full flex items-around">
            <div className="logo w-1/2 flex justify-end items-center">News Adda</div>
            <div className=" w-1/2 flex justify-end items-center">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="mr-2 inline-flex justify-center rounded-md bg-gray-200 text-sm font-medium text-violet-500 hover:bg-violet-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            <UserCircleIcon className={`h-10 w-10`} aria-hidden="true" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-violet-200 shadow-lg ring-1 ring-black/5 focus:outline-none">
                            <div className="px-1 py-1 rounded-xl flex flex-col gap-2">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link to={"/signin"}>
                                            <button
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm border-violet-300 border-2`}
                                            >
                                                Sign In
                                            </button>
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link to={"/signup"}
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-xl px-2 py-2 text-sm border-violet-300 border-2`}
                                        >
                                            Sign up
                                        </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link to={"/signin"}
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-xl px-2 py-2 text-sm border-violet-300 border-2`}
                                        >
                                            Sign Out
                                        </Link>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    )
}

export default Appbar;