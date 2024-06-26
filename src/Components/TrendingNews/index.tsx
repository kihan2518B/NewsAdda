import React, { Suspense, useContext } from "react"
const YourNews = React.lazy(() => import('../YourNews'))
const NewsArticles = React.lazy(() => import('../NewsArtilces'))

import { ThemeContext } from "../../context/theme"

import ErrorBoundary from "../ErrorBoundary"

const TrendingNews = () => {
    const { theme } = useContext(ThemeContext)
    return (
        <div>
            <h1 className={`pl-10 h-12 w-full  ${theme == "dark" ? "text-violet-50" : "text-violet-800"} flex justify-start items-end font-bold text-2xl`}>Trending News</h1>
            <div className={`flex h-full gap-3 md:flex-row ${theme == 'dark' ? 'dark' : ''} flex-col w-[95%] mx-auto`}>
                <div className={`${theme == 'dark' ? ' shadow-violet-600' : 'shadow-violet-400 '} shadow-md rounded-xl md:w-2/3 w-full h-full flex-grow sm:col-span-1`}>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                            <NewsArticles />
                        </Suspense>
                    </ErrorBoundary>
                </div>
                <div className={`${theme == 'dark' ? ' shadow-violet-600' : 'shadow-violet-400 '} shadow-md rounded-xl w-full md:w-1/3 flex-grow sm:col-span-1 min-h-96`}>
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading...</div>}>
                            <YourNews />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>

        </div>
    )
}

export default TrendingNews