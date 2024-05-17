import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { useContext, useState, useEffect } from "react";
import "../../App.css"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { ThemeContext } from "../../context/theme";
import { sport, team } from "../../context/YourNews/types";

import { useYourNewsState } from "../../context/YourNews/context";
import { useMatchState } from "../../context/LiveMatches/context";
import { matchDetails } from "../../context/LiveMatches/types";
import { usePreferencesState } from "../../context/Preferences/context";

const NewsList = () => {
    const YourNewsState: any = useYourNewsState()
    const MatchesState: any = useMatchState()

    const PreferencesState: any = usePreferencesState()

    const { theme } = useContext(ThemeContext)

    const { matches } = MatchesState
    const { isLoading, isError, sports, errorMessage } = YourNewsState;
    // console.log(PreferencesState.preferences)
    const allTeams = YourNewsState.teams
    // console.log("sports", sports)
    // console.log("teams", allTeams)

    const [SelectedSport, setSelectedSport] = useState<sport>({ id: 0, name: "" });
    const [Selectedteam, setSelectedTeam] = useState<team>({ id: 0, name: "", plays: "" });
    // console.log("matches", matches)

    const [filteredSports, setfilteredSports] = useState(sports)
    const [filteredTeams, setFilteredTeams] = useState<team[]>([]);
    const [filteredMatches, setFilteredMatches] = useState<any[]>([]);

    const token = localStorage.getItem("authToken")

    useEffect(() => {
        if (token) {
            console.log("User signed in")
            // console.log("Preferences", PreferencesState)

            if (PreferencesState.preferences.selectedTeams.length != 0 || PreferencesState.preferences.selectedSports.length != 0) {   //If userPrefrences is there (i.e. user is loggedin)

                const filtTeams = allTeams.filter((Team: team) =>
                    PreferencesState.preferences.selectedTeams.includes(Team.name)
                )
                // console.log("filtTeams", filtTeams)
                setFilteredTeams(filtTeams)

                const filtSports = sports.filter((Sport: sport) =>
                    PreferencesState.preferences.selectedSports.includes(Sport.name)
                )
                // console.log("filtSports", filtSports)
                setfilteredSports(filtSports)

            } else {
                setfilteredSports(sports)
            }
        }
        else {
            console.log("User not signed in")

        }
    }, [allTeams, matches, PreferencesState, sports])

    useEffect(() => {
        // Filter matches based on the preferred sports from preferences
        const preferredFilteredMatches = matches.filter((Match: matchDetails) =>
            PreferencesState.preferences.selectedSports.some((Sport: string) => {
                console.log(Sport === Match.sportName)
                return Sport === Match.sportName
            })
        );
        console.log("preferredFilteredMatches", preferredFilteredMatches)
        console.log("PreferencesState.preferences.selectedSports", PreferencesState.preferences.selectedSports)
        // setFilteredMatches(preferredFilteredMatches);
    }, [PreferencesState.preferences.selectedSports, matches]);

    // console.log(filteredTeams)
    useEffect(() => {
        //initailly there will not be any team name we will update it when sport is selected

        if (typeof SelectedSport !== "string" && SelectedSport.name) {
            const filteredTeamList = allTeams.filter((team: team) => team.plays === SelectedSport.name);

            setSelectedTeam({ id: 0, name: "", plays: "" })

            const filteredMatch_Sport = matches.filter((match: matchDetails) => match.sportName === SelectedSport.name);
            console.log("filteredMatchList", filteredMatch_Sport)
            if (token) { //check if user is signned in
                // Filter preferred teams from the filtered team list
                const preferredTeams = PreferencesState.preferences.selectedTeams;

                const filteredPreferredTeams = filteredTeamList.filter((Team: team) => preferredTeams.includes(Team.name));
                console.log("filteredPreferredTeams", filteredPreferredTeams)
                setFilteredTeams(filteredPreferredTeams);

                if (filteredPreferredTeams.length == 0) {
                    setFilteredMatches([]);
                } else {
                    setFilteredMatches(filteredMatch_Sport)
                }
            } else { //User is not signed in
                setFilteredMatches(filteredMatch_Sport)
                setFilteredTeams(filteredTeamList);
            }
        } else {
            setFilteredTeams([]);
            setFilteredMatches(matches);
        }
    }, [SelectedSport, allTeams, matches, sports]);

    useEffect(() => {
        // console.log(Selectedteam)
        // setSelectedTeam(filteredTeams[1])
        if (typeof Selectedteam !== "string" && Selectedteam.name) {
            const filteredMatch_Team = matches.filter((match: matchDetails) =>
                match.teams.some((Team: { id: number; name: string }) => Team.name === Selectedteam.name)
            );
            setFilteredMatches(filteredMatch_Team);
        }
    }, [Selectedteam])


    if (isLoading) {
        return <>Loading...</>
    }
    if (isError) {
        return <div className="text-red-500">{errorMessage}</div>
    }

    // console.log("filteredTeams", filteredTeams)
    return (
        <div className={`md:h-full ${theme == 'dark' ? "bg-violet-500  text-white " : "bg-violet-400 "} rounded-xl flex flex-col h-full w-full`}>
            <div className="mx-auto md:h-40 md:w-[80%] h-fit py-4 w-full flex md:flex-col md:justify-evenly ">
                <p className="md:w-[70%] md:mx-0 w-[33%] mx-2 h-7 font-bold text-xl flex items-center">
                    Your News
                </p>
                <div className="h-10 md:w-[70%] w-[33%] rounded-md">
                    <Listbox value={SelectedSport} onChange={setSelectedSport}>
                        <ListboxButton
                            className={` h-full
                                relative block w-full rounded-lg ${theme == 'dark' ? "bg-violet-300  text-violet-700 " : "bg-violet-500 "} py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
                        >
                            {SelectedSport.name ? SelectedSport.name : "Please Select a Sport"}
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
                                {filteredSports.map((sport: sport) => (
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
                    <Listbox value={Selectedteam} onChange={setSelectedTeam}>
                        <ListboxButton
                            className={`h-full
                            relative block w-full rounded-lg ${theme == 'dark' ? "bg-violet-300  text-violet-700 " : "bg-violet-500 "} py-1.5 pr-8 pl-3 text-left text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25`}
                        >
                            {Selectedteam.name ? Selectedteam.name : "Please Select a Team"}
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
                                {filteredTeams.map((Team: team) => (
                                    <ListboxOption
                                        key={Team.name}
                                        value={Team}
                                        className={`group flex ${theme == 'dark' ? 'data-[focus]:bg-violet-800/10' : 'data-[focus]:bg-white/10'} cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none `}
                                    >
                                        <CheckIcon className="invisible size-4 fill-white group-data-[team]:visible" />
                                        <div className="text-sm/6">{Team.name}</div>
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </Listbox>
                </div>
            </div>
            <div className="h-[55vh] w-full flex max-[769px]:flex-wrap min-[769px]:flex-col gap-5 overflow-y-scroll scrollbar">

                {filteredMatches.length == 0 ? <div className="text-red-500 font-bold text-2xl">No Matches to show</div> : filteredMatches.map((match, index) => (
                    <div key={index} className={`mx-auto md:h-48 md:w-[80%] h-56 w-56 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"}  border  rounded-md flex flex-col items-center justify-evenly`}>
                        <p className="mx-auto h-10 flex justify-between items-center w-[95%] font-bold text-lg">
                            {match.sportName}
                            {match.isRunning &&
                                <li className="text-red-500">
                                    {match.isRunning ? "Live" : ""}
                                </li>
                            }
                        </p>
                        <p className="mx-auto h-24 w-[95%] overflow-y-hidden">
                            {match.story}
                        </p>
                        <button className="mx-auto h-10 mb-2 w-[95%] bg-violet-500 flex justify-center items-center rounded-lg hover:shadow-sm hover:shadow-white">Read More</button>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default NewsList;