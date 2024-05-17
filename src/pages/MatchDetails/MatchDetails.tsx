import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/constants';
import { matchDetails } from '../../context/LiveMatches/types';

const MatchDetails = () => {
    const { matchId } = useParams()
    console.log(matchId)
    const [isLoading, setIsLoading] = useState<boolean>()
    const [Match, setMatch] = useState<matchDetails>()

    useEffect(() => {
        const fetchMatchDetails = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json()
                console.log(data)
                setMatch(data)
                if (res.ok) {
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMatchDetails()
    }, [])
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true);
    const close = () => {
        setIsOpen(false)
        navigate('../../')
    }
    if (isLoading) {
        return <>Loading...</>
    }
    return (
        <>
            {Match &&
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10 focus:outline-none " onClose={close}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                            <div className="flex w-full full items-center justify-center p-4 ">
                                <TransitionChild
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 transform-[scale(95%)]"
                                    enterTo="opacity-100 transform-[scale(100%)]"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 transform-[scale(100%)]"
                                    leaveTo="opacity-0 transform-[scale(95%)]"
                                >
                                    <DialogPanel className="bg-violet-200 w-full h-full rounded-xl p-6 backdrop-blur-2xl">
                                        <DialogTitle as="h3" className="flex h-fit flex-col lg:flex-row w-full text-violet-900 items-center justify-center">
                                            <div className="w-full font-bold flex items-center justify-center text-[1rem] sm:text-lg md:text-xl lg:text-2xl">
                                                {Match.name}
                                            </div>
                                            <div className="lg:w-[20%] lg:text-xl w-[100%] text-black text-base justify-end">
                                                {Match.isRunning && <div className="text-xl font-bold flex justify-end absolute top-2 right-10 text-red-500">
                                                    <li>Live</li>
                                                </div>}
                                                <div className="flex justify-end h-fit">
                                                    Date: {Match.startsAt.split("T")[0]}
                                                </div>
                                            </div>
                                        </DialogTitle>
                                        <div className="w-full mt-2 flex flex-col items-center">
                                            <div className="flex-col h-20 w-full justify-center items-center flex">
                                                <div className="text-2xl font-bold">
                                                    {Match.sportName}
                                                </div>
                                                <div className="w-full flex flex-col mt-2">
                                                    <p className='text-left font-bold'>Scores: </p>
                                                    {Match.score && Object.entries(Match.score).map(([teamName, score]) => (
                                                        <div key={teamName} className="flex w-full gap-1 text-sm">
                                                            {/* <div className="flex h-full w-full items-center "> */}
                                                            <p className='underline text-left '>{teamName}:  </p>
                                                            <p className='text-left'>{score}</p>
                                                            {/* </div> */}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-5 font-serif font-semibold lg:h-[50%] h-[70vh] overflow-y-auto text-sm/6 text-black">
                                                <p className='text-xl'>Match Story: </p>{Match.story}
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <Button
                                                className="inline-flex items-center gap-2 rounded-md bg-violet-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                                                onClick={close}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            }

        </>
    )
}

export default MatchDetails
