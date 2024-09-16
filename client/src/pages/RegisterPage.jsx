import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeat, setRepeat] = useState('');

   async function registerUser(e){
        e.preventDefault();
        try {
         await   axios.post('/register', {
                name,
                email,
                password
            })
            alert('Registration was successful :). Try to login now')
            
        } catch (er) {
            alert('Registration failed :(')
            console.error(er);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-5xl text-center mb-4"> Register </h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input type="text" name="" placeholder="your username" id="username" value={name} onChange={e => setName(e.target.value)}/>
                    <input type="email" name="" id="useremail" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" name="" placeholder="Enter your password here" id="userpassword" value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type="password" name="" placeholder="Repeat your password here" id="passrepeat" value={repeat} onChange={e => setRepeat(e.target.value)}/>
                    <button type="submit" className="primary">Register</button>
                    <div className="text-center mt-4 text-gray-500">
                        Already a member? <Link to="/login" className="text-primary underline"> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}