import React, { useEffect, useState } from 'react';
import SigninForm from './SigninForm';

const Signin: React.FC = () => {
    const [showMessage, setShowMessage] = useState(false);

    const ChangePassStatus = localStorage.getItem("ChangePassStatus") ?? ""
    useEffect(() => {
        if (ChangePassStatus) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                localStorage.removeItem("ChangePassStatus")
            }, 2000); // Set timeout for 2 seconds

            return () => clearTimeout(timer);
        }
    }, [])
    return (

        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            {showMessage && (
                <div className="absolute h-fit w-fit p-2 top-0 left-0 bg-green-600 flex justify-center items-center">
                    {ChangePassStatus}
                </div>
            )}
            <div className="max-w-md w-full px-6 py-8 bg-violet-300 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-violet-800 mb-8">Sign in</h1>
                <SigninForm />
            </div>
        </div>
    );
}

export default Signin;