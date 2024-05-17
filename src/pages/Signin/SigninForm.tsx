import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

type Input = {
    email: string,
    password: string,
}

const SigninForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Input>()
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<Input> = async (data) => {
        try {
            const { email, password } = data;
            const res = await fetch(`${API_ENDPOINT}/users/sign_in`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) {
                throw new Error('signin Failed')
            }
            const jsonRes = await res.json()
            console.log(jsonRes);
            localStorage.setItem("authToken", jsonRes.auth_token);
            localStorage.setItem("userData", JSON.stringify(jsonRes.user));
            localStorage.setItem("signedIn", "true");
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block font-semibold mb-2 text-violet-800">Email:</label>
                    <input {...register('email', { required: true })} name="email" id="email" className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                    {errors.email && <span className="bg-pink-500 text-violet-800">This field is required</span>}
                </div>
                <div>
                    <label className="block font-semibold mb-2 text-violet-800">Password:</label>
                    <input {...register('password', { required: true })} name='password' id='password' className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue" />
                    {errors.password && <span className="bg-pink-500 text-violet-800">This field is required</span>}
                </div>
                <button type="submit" className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">Sign In</button>
            </form>
            <a href="/signup" className="text-violet-800 underline">Not a user</a>
            <a href="/" className="ml-5 text-right text-violet-800 underline">Go to dashboard without sign_in</a>
        </>
    );
};

export default SigninForm;