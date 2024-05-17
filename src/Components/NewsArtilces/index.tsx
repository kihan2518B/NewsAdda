import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useContext, useEffect, useReducer } from "react";

import { ThemeContext } from "../../context/theme";
import { reducer, initialState } from '../../context/NewArticles/reducer';
import { fetchArticles } from '../../context/NewArticles/action';

const NewsArticles = () => {
    const { theme } = useContext(ThemeContext)
    const [state, dispatch] = useReducer(reducer, initialState)
    const { isLoading, isError, errorMessage, articles } = state
    // console.log("articles: ", articles);

    useEffect(() => {
        fetchArticles(dispatch)
    }, [])

    if (isLoading) {
        return < >Loading...</>
    }
    if (isError) {
        return <>{errorMessage}</>
    }

    articles.sort((a, b) => {
        // Parse dates from strings
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        // Compare dates first
        if (dateA.getDate() !== dateB.getDate()) {
            return dateB.getDate() - dateA.getDate();
        } else {
            // If dates are the same, compare times
            return dateB.getTime() - dateA.getTime();
        }
    });

    //Adding sportsname to set to make sure there is unique sport's Name
    const categoriesSet = new Set();
    articles.forEach((article) => {
        categoriesSet.add(article.sport.name);
    });

    //this will convert all element of set to string explicitly 
    const categories: string[] = Array.from(categoriesSet).map(String);
    // console.log(categories)

    return (
        <>
            <TabGroup>
                <div className={`News-Articles  md:h-[95vh] w-full ${theme == 'dark' ? "bg-violet-500  text-white " : "bg-violet-400 "}  rounded-xl`}>
                    <div id="heading-section" className="h-12 w-full ">
                        <div className={` h-full w-full flex items-center justify-evenly text-xl max-[1200px]:text-lg max-[1000px]:text-base max-[835px]:text-xs`}>
                            <TabList className="flex gap-4 overflow-x-auto">
                                {categories.map((category) => (
                                    < Tab
                                        key={category}
                                        className="rounded-full py-1 px-3 text-sm font-semibold text-black focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </TabList>
                        </div>
                    </div>
                    <TabPanels >
                        {categories.map((category) => (
                            <TabPanel key={category}>
                                <div id="Articles" className={`h-[70vh] md:h-[80vh] w-full overflow-y-auto scrollbar2 flex flex-col gap-3 rounded-b-xl`}>
                                    {articles.filter((article) => article.sport.name === category).map((article) => (
                                        <div key={article.id} className={`rounded-xl mx-auto flex gap-2 ${theme == 'dark' ? "bg-violet-700 hover:bg-violet-600 text-white border-violet-950" : "bg-violet-300 border-violet-900 hover:bg-violet-200"} h-[15vw] max-[651px]:h-[16vw] max-[592px]:h-[18vw] max-[581px]:h-[20vw] max-[545px]:h-[22vw] max-[500px]:h-[26vw] max-[421px]:h-[28vw] max-[391px]:h-[32vw] max-[381px]:h-[34vw] max-[353px]:h-[36vw] max-[321px]:h-[38vw] w-[98%] border `}>
                                            <div className="h-full w-[70%] flex flex-col">
                                                <div className="h-[5vw] w-full pl-2 flex justify-between text-lg max-[1200px]:text-base max-[1000px]:text-sm max-[835px]:text-xs ">
                                                    <p className="h-full w-fit flex items-center">
                                                        {article.sport.name}
                                                    </p>
                                                    <div className="h-full w-fit  flex items-center">{article.date.split("T")[0]}</div>
                                                </div>
                                                <p className="h-fit w-full pl-2 flex items-center text-xl max-[1200px]:text-lg max-[1000px]:text-base max-[835px]:text-sm max-[425px]:text-xs font-bold">
                                                    {article.title}
                                                </p>
                                                <p className="h-16 max-[500px]:h-[12vw] max-[391px]:h-[20vw] max-[321px]:h-[22vw] w-full pl-2 flex text-lg max-[1200px]:text-base max-[1000px]:text-sm max-[835px]:text-xs overflow-hidden ">
                                                    {article.summary}
                                                </p>
                                                <div className="h-fit w-full pl-2 flex items-center text-lg max-[1200px]:text-base max-[1000px]:text-sm max-[835px]:text-xs -green-600">
                                                    <div className="cursor-pointer h-full w-full max-[321px]:w-[50%] underline font-bold  flex items-center justify-end">
                                                        Read More...
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="h-full w-[30%] flex justify-center items-center">
                                                <img className="h-full w-full objectfit-contain  rounded-r-xl" src={article.thumbnail} alt="Image" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>

                        ))}
                    </TabPanels>
                </div>
            </TabGroup >
        </>
    );
};

export default NewsArticles;