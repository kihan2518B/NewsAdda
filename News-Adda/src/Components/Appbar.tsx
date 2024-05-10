import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { Menu, Dialog, Transition } from '@headlessui/react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../config/constants';
import logo from '../assets/NewsAdda_logo.png'

type Input = {
    current_password: string,
    new_password: string
}

const Appbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<Input>()
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken") ?? ""
    const onSubmit: SubmitHandler<Input> = async (data) => {
        try {
            const { current_password, new_password } = data;
            const res = await fetch(`${API_ENDPOINT}/user/password`, {
                method: "PATCH",
                headers: { 'content-type': 'application/json', "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ current_password, new_password })
            })
            if (!res.ok) {
                throw new Error('Password changing Failed')
            }

            const jsonRes = await res.json()
            console.log("jsonRes", jsonRes);
            localStorage.setItem("ChangePassStatus", jsonRes.status)
            navigate('/signout')
        } catch (error) {
            console.log(error)
        }
    }
    function open() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }
    return (
        <>
            <div className="h-20 bg-violet-500 w-full flex items-around">
                <div className="logo w-1/2 flex justify-end items-center">
                    <img className='h-20 w-40 object-cover' src={logo} alt="" />
                </div>
                <div className=" w-1/2 flex justify-end items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="mr-2 inline-flex justify-center shadow-xl shadow-violet-600 rounded-md bg-gray-200 text-sm font-medium text-violet-500 hover:bg-violet-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
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
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={open}
                                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm border-violet-300 border-2`}
                                            >
                                                Change Password
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            {/* This Form is for change password */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className="mt-2">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <input
                                                    id="current_password"
                                                    type="text"
                                                    placeholder='Enter Current Password...'
                                                    autoFocus
                                                    {...register('current_password', { required: true })}
                                                    className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-violet-500 focus:shadow-outline-blue 'border-red-500' : ''
                                                        }`}
                                                />
                                                {errors.current_password && <span>This field is required</span>}

                                                <input
                                                    id="new_password"
                                                    type="text"
                                                    placeholder='Enter New Password...'
                                                    autoFocus
                                                    {...register('new_password', { required: true })}
                                                    className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-violet-500 focus:shadow-outline-blue 'border-red-500' : ''
                                                        }`}
                                                />
                                                {errors.new_password && <span>This field is required</span>}

                                                <button type="submit" id='ChangePasswordbtn' className="inline-flex justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-violet-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                                                    Submit
                                                </button>
                                                <button type='button' onClick={closeModal} className="inline-flex justify-center rounded-md border border-transparent bg-violet-100 px-4 py-2 text-sm font-medium text-violet-900 hover:bg-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                                                    Cancel
                                                </button>
                                            </form>
                                        </div>
                                    </Dialog.Title>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Appbar;