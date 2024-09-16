/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

export default function LoginPage() {

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-5xl text-center mb-4"> Login </h1>
                <form className="max-w-md mx-auto">
                    <input type="email" name="" id="" placeholder="your@email.com" />
                    <input type="password" name="" placeholder="Enter your password here" id="" />
                    <button type="submit" className="primary">Login</button>
                    <div className="text-center mt-4 text-gray-500">
                        Don't have an account yet? <Link to="/register" className="text-primary underline"> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}