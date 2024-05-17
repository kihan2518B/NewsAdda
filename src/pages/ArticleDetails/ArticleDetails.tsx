import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/constants';
import { Article } from '../../context/NewArticles/types';
const ArticleDetails = () => {
    const { articleId } = useParams()
    console.log(articleId)
    const [isLoading, setIsLoading] = useState<boolean>()
    const [Article, setArticle] = useState<Article>()

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
                    headers: { 'Content-Type': 'application/json' }
                })
                const data = await res.json()
                console.log(data)
                setArticle(data)
                if (res.ok) {
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchArticleDetails()
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
            {Article &&
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
                                        <DialogTitle as="h3" className="flex h-16 flex-col lg:flex-row w-full text-violet-900 items-center justify-center">
                                            <div className="w-full font-bold flex items-center justify-center text-[1rem] sm:text-lg md:text-xl lg:text-2xl">
                                                {Article.title}
                                            </div>
                                            <div className="lg:w-[20%] lg:text-xl w-[100%] text-black text-base flex justify-end">
                                                Date: {Article.date.split("T")[0]}
                                            </div>
                                        </DialogTitle>
                                        <div className="w-full flex flex-col lg:flex-row items-center">
                                            <img className='w-[90%] lg:w-[50%] object-contain' src={Article.thumbnail} alt="" />
                                            <div className="mt-2 font-serif font-semibold lg:h-[50%] h-[70vh] overflow-y-auto text-sm/6 text-black">
                                                {Article.content}
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

export default ArticleDetails
