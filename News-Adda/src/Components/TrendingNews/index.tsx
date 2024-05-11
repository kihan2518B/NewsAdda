import { useContext } from "react"
import NewsArticles from "../NewsArtilces"
import { ThemeContext } from "../../context/theme"

const TrendingNews = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <h1 className="py-2 ml-10 text-2xl font-semibold">Trending News</h1>
            <div className={`flex md:flex-row ${theme == 'dark' ? 'dark' : ''} flex-col w-[95%] mx-auto`}>
                <div className={` border-r-2 ${theme == 'dark' ? 'border-purple-500 ' : 'border-gray-800'} md:w-2/3 w-full flex-grow sm:col-span-1 min-h-96 h-full`}>
                    <NewsArticles />
                </div>
                <div className=" w-full md:w-1/3 flex-grow sm:col-span-1 min-h-96">
                    {/* <NewsArticles /> */}
                </div>
            </div>

        </>
    )
}

export default TrendingNews