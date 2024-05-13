import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { useContext, useEffect, useState } from "react";
import "../../App.css"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../../context/theme";
import { sport, team } from "../../context/YourNews/types";
import { API_ENDPOINT } from "../../config/constants";


const YourNews = () => {
    const { theme } = useContext(ThemeContext)

    // useEffect(() => {
    //     const fetchSports = async () => {
    //         const token = localStorage.getItem("authToken") ?? ''
    //         try {
    //             const res = await fetch(`${API_ENDPOINT}/sports`, {
    //                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    //             })
    //             const data: sport[] = await res.json()
    //             console.log("Sports: ", data);
    //             return data
    //         } catch (error) {
    //             console.log("error while fetching sports", error);
    //             return error
    //         }
    //     }

    //     const fetchTeams = async () => {
    //         const token = localStorage.getItem("authToken") ?? ''
    //         try {
    //             const res = await fetch(`${API_ENDPOINT}/teams`, {
    //                 headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    //             })
    //             const data: team[] = await res.json()
    //             console.log("Teams: ", data);
    //             return data
    //         } catch (error) {
    //             console.log("error while fetching Teams", error);
    //         }
    //     }

    //     const sports = fetchSports()
    //     console.log("sportName", sports)
    //     const Teams = fetchTeams()
    //     console.log("TeamName", Teams)
    // })

    const sportName = [
        { id: 1, name: "Cricket" },
        { id: 2, name: "football" },
        { id: 3, name: "hocky" },
        { id: 4, name: "vollybal" },
    ];

    const teamName = [
        { id: 1, name: "CSK" },
        { id: 2, name: "MI" },
        { id: 3, name: "RR" },
        { id: 4, name: "KKR" },
    ];
    const [sport, setSport] = useState(sportName[0]);
    const [team, setTeam] = useState(teamName[0]);

    return (
        <div className={`md:h-full ${theme == 'dark' ? "bg-violet-500  text-white " : "bg-violet-400 "} rounded-xl flex flex-col h-full w-full`}>
            <div className="mx-auto md:h-40 md:w-[80%] h-fit py-4 w-full flex md:flex-col md:justify-evenly ">
                <p className="md:w-[70%] md:mx-0 w-[33%] mx-2 h-7 font-bold text-xl flex items-center">
                    Favourites
                </p>
                <div className="h-10 md:w-[70%] w-[33%] rounded-md">
                    <Listbox value={sport} onChange={setSport}>
                        <ListboxButton
                            className={`
                                relative block w-full rounded-lg ${theme == 'dark' ? "bg-violet-300  text-violet-700 " : "bg-violet-500 "} py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
                        >
                            {sport.name}
                            <ChevronDownIcon
                                className={`${theme == 'dark' ? "fill-violet-700 " : ""} group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60`}
                                aria-hidden="true"
                            />
                        </ListboxButton>
                        <Transition
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ListboxOptions
                                anchor="bottom"
                                className={`w-[var(--button-width)] rounded-xl border border-white/5 ${theme == 'dark' ? "bg-violet-300  text-violet-700 " : "bg-violet-500 text-violet-50"} mt-0.5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none`}
                            >
                                {sportName.map((sport) => (
                                    <ListboxOption
                                        key={sport.name}
                                        value={sport}
                                        className={`group flex ${theme == 'dark' ? 'data-[focus]:bg-violet-800/10' : 'data-[focus]:bg-white/10'} cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none `}
                                    >
                                        <CheckIcon className="invisible size-4 fill-white group-data-[sport]:visible" />
                                        <div className="text-sm/6 ">{sport.name}</div>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </Listbox>
                </div>
                <div className="h-10 md:w-[70%] md:mx-0 mx-2 w-[33%] rounded-md">
                    <Listbox value={team} onChange={setTeam}>
                        <ListboxButton
                            className={`
                            relative block w-full rounded-lg ${theme == 'dark' ? "bg-violet-300  text-violet-700 " : "bg-violet-500 "} py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
                        >
                            {team.name}
                            <ChevronDownIcon
                                className={`${theme == 'dark' ? "fill-violet-700 " : ""} group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60`}
                                aria-hidden="true"
                            />
                        </ListboxButton>
                        <Transition
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <ListboxOptions
                                anchor="bottom"
                                className={`w-[var(--button-width)] rounded-xl border border-white/5 ${theme == 'dark' ? "bg-violet-300  text-violet-700 " : "bg-violet-500 text-violet-50"} mt-0.5 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none`}
                            >
                                {teamName.map((teamName) => (
                                    <ListboxOption
                                        key={teamName.name}
                                        value={teamName}
                                        className={`group flex ${theme == 'dark' ? 'data-[focus]:bg-violet-800/10' : 'data-[focus]:bg-white/10'} cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none `}
                                    >
                                        <CheckIcon className="invisible size-4 fill-white group-data-[team]:visible" />
                                        <div className="text-sm/6">{teamName.name}</div>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </Listbox>
                </div>
            </div>
            <div className="h-[55vh] w-full flex max-[769px]:flex-wrap min-[769px]:flex-col gap-5 overflow-y-scroll scrollbar">
                {/* Iterating over matches */}

                <div className={`mx-auto md:h-48 md:w-[80%] h-56 w-56 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"}  border  rounded-md flex flex-col items-center justify-evenly`}>
                    <p className="mx-auto h-10 flex items-center w-[95%] font-bold text-lg">CSK Wins IPL 2023</p>
                    <p className="mx-auto h-24 w-[95%] overflow-y-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo aperiam soluta delectus ratione repellendus. Accusamus alias unde facilis cupiditate consequuntur in maiores officia saepe explicabo? Dolore fugiat id et eius.</p>
                    <button className="mx-auto h-10 mb-2 w-[95%] bg-violet-500 flex justify-center items-center rounded-lg hover:shadow-sm hover:shadow-white">Read More</button>
                </div>
                <div className={`mx-auto md:h-48 md:w-[80%] h-56 w-56 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"}  border  rounded-md flex flex-col items-center justify-evenly`}>
                    <p className="mx-auto h-10 flex items-center w-[95%] font-bold text-lg">CSK Wins IPL 2023</p>
                    <p className="mx-auto h-24 w-[95%] overflow-y-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo aperiam soluta delectus ratione repellendus. Accusamus alias unde facilis cupiditate consequuntur in maiores officia saepe explicabo? Dolore fugiat id et eius.</p>
                    <button className="mx-auto h-10 mb-2 w-[95%] bg-violet-500 flex justify-center items-center rounded-lg hover:shadow-sm hover:shadow-white">Read More</button>
                </div>
                <div className={`mx-auto md:h-48 md:w-[80%] h-56 w-56 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"}  border  rounded-md flex flex-col items-center justify-evenly`}>
                    <p className="mx-auto h-10 flex items-center w-[95%] font-bold text-lg">CSK Wins IPL 2023</p>
                    <p className="mx-auto h-24 w-[95%] overflow-y-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo aperiam soluta delectus ratione repellendus. Accusamus alias unde facilis cupiditate consequuntur in maiores officia saepe explicabo? Dolore fugiat id et eius.</p>
                    <button className="mx-auto h-10 mb-2 w-[95%] bg-violet-500 flex justify-center items-center rounded-lg hover:shadow-sm hover:shadow-white">Read More</button>
                </div>
                <div className={`mx-auto md:h-48 md:w-[80%] h-56 w-56 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"}  border  rounded-md flex flex-col items-center justify-evenly`}>
                    <p className="mx-auto h-10 flex items-center w-[95%] font-bold text-lg">CSK Wins IPL 2023</p>
                    <p className="mx-auto h-24 w-[95%] overflow-y-hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo aperiam soluta delectus ratione repellendus. Accusamus alias unde facilis cupiditate consequuntur in maiores officia saepe explicabo? Dolore fugiat id et eius.</p>
                    <button className="mx-auto h-10 mb-2 w-[95%] bg-violet-500 flex justify-center items-center rounded-lg hover:shadow-sm hover:shadow-white">Read More</button>
                </div>

            </div>
        </div>
    );
};

export default YourNews;