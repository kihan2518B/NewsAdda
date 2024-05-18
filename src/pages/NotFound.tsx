// import React from 'react';
import './styles.css';

const Notfound = () => {
  return (
    <div className='bg-gray-300 flex justify-center items-center w-full h-[100vh]'>
      <div className="">
        <h1 className='text-red-500 text-9xl'>404 Not Found :(</h1>
        <a href="/">
          <button id='backToHomeButton' className="cssbuttons-io-button">
            <div className="icon">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            Back To Dashboard
          </button>
        </a>
      </div>

    </div>
  )
}

export default Notfound