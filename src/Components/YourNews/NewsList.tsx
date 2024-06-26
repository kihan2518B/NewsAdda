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
import { usePreferencesState } from "../../context/Preferences/context";
import { useArticleState } from "../../context/NewArticles/context";
import { Article } from "../../context/NewArticles/types";

const NewsList = () => {
    const YourNewsState: any = useYourNewsState()

    const PreferencesState: any = usePreferencesState()
    const ArticleState: any = useArticleState()

    const { theme } = useContext(ThemeContext)

    const { articles } = ArticleState
    const { isLoading, isError, sports, errorMessage } = YourNewsState;
    // console.log(articles)
    // console.log(PreferencesState.preferences)
    const allTeams = YourNewsState.teams
    // console.log("sports", sports)
    // console.log("teams", allTeams)

    const [SelectedSport, setSelectedSport] = useState<sport>({ id: 0, name: "" });
    const [Selectedteam, setSelectedTeam] = useState<team>({ id: 0, name: "", plays: "" });
    // console.log("matches", matches)

    const [filteredSports, setfilteredSports] = useState(sports)
    const [filteredTeams, setFilteredTeams] = useState<team[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

    const token = localStorage.getItem("authToken")

    useEffect(() => {
        if (token) {
            console.log("User signed in")

            //Check if user has already selected preferences or not
            //If there are no preferences selected (A new user signedup) then filteredsports and filteredteams will be empty
            if (PreferencesState.preferences.selectedSports || PreferencesState.preferences.selectedTeams) {   //If userPrefrences is there (i.e. user has selected preferences)

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
            }
        }
        else {
            console.log("User not signed in")
            setfilteredSports(sports)

        }
    }, [allTeams, articles, PreferencesState, sports])

    console.log(filteredArticles)
    useEffect(() => {
        //initailly there will not be any team name we will update it when sport is selected

        if (typeof SelectedSport !== "string" && SelectedSport.name) {
            const filteredTeamList = allTeams.filter((team: team) => team.plays === SelectedSport.name);

            setSelectedTeam({ id: 0, name: "", plays: "" })

            const filteredArticle_Sport = articles.filter((article: Article) => article.sport.name === SelectedSport.name);
            console.log("filteredArticleList", filteredArticle_Sport)

            if (token) { //check if user is signned in
                // Filter preferred teams from the filtered team list
                const preferredTeams = PreferencesState.preferences.selectedTeams;

                const filteredPreferredTeams = filteredTeamList.filter((Team: team) => preferredTeams.includes(Team.name));
                console.log("filteredPreferredTeams", filteredPreferredTeams)
                setFilteredTeams(filteredPreferredTeams);

                if (filteredPreferredTeams.length == 0) {
                    setFilteredArticles([])
                } else {
                    setFilteredArticles(filteredArticle_Sport)
                }
            } else {
                setFilteredArticles(filteredArticle_Sport)
                setFilteredTeams(filteredTeamList);
            }

        } else {
            setFilteredTeams([]);
            if (PreferencesState.preferences.selectedSports || PreferencesState.preferences.selectedTeams) {   //If userPrefrences is there (i.e. user is loggedin)

                //If Array is zero then show all articles
                if (PreferencesState.preferences.selectedSports.length == 0) {
                    setFilteredArticles(articles);
                } else {
                    // Filter articles based on the preferred sports from preferences
                    const preferredFilteredArticles = articles.filter((article: Article) =>
                        PreferencesState.preferences.selectedSports.some((Sport: string) => {
                            // console.log(Sport === article.sport.name)
                            return Sport === article.sport.name
                        })
                    );
                    // console.log("preferredFilteredArticles", preferredFilteredArticles)
                    setFilteredArticles(preferredFilteredArticles)
                }
            } else {//User is not signed in
                setFilteredArticles(articles);
            }
        }
    }, [SelectedSport, allTeams, articles, sports, PreferencesState]);

    // console.log(filteredArticles)
    useEffect(() => {
        // console.log(Selectedteam)
        // setSelectedTeam(filteredTeams[1])
        if (typeof Selectedteam !== "string" && Selectedteam.name) {

            const filteredArticles_Team = articles.filter((article: Article) =>
                article.teams.some((Team: { id: number; name: string }) => Team.name === Selectedteam.name)
            );
            console.log("filteredArticles_Team", filteredArticles_Team)
            setFilteredArticles(filteredArticles_Team)
        }
    }, [Selectedteam])


    if (isLoading) {
        return <>Loading...</>
    }
    if (isError) {
        return <div className="text-red-500">{errorMessage}</div>
    }

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

                {filteredArticles.length == 0 ? <div className="text-red-500 font-bold text-2xl">No Articles to show</div> : filteredArticles.map((article, index) => (
                    <div key={index} className={`mx-auto md:h-48 md:w-[80%] h-56 w-56 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"}  border  rounded-md flex flex-col items-center justify-evenly`}>
                        <p className="mx-auto h-10 flex justify-between items-center w-[95%] font-bold text-lg">
                            {article.sport.name}
                        </p>
                        <p className="mx-auto h-40 w-[95%] overflow-y-hidden">
                            Title: {article.title}
                            <br></br>
                            {article.teams.length != 0 ? <div>
                                Teams:
                                {article.teams.map((Team) => (
                                    <li>{Team?.name}</li>
                                ))}
                            </div>
                                : ""}
                        </p>
                        <a href={`articles/${article.id}`} className="mx-auto h-10 mb-2 w-[95%] bg-violet-500 flex justify-center items-center rounded-lg hover:shadow-sm hover:shadow-white">Read More</a>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default NewsList;