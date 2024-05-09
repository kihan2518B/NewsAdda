import React from 'react';
import SigninForm from './SigninForm';

const Signin: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full px-6 py-8 bg-violet-300 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-violet-800 mb-8">Sign in</h1>
                <SigninForm />
            </div>
        </div>
    );
}

export default Signin;