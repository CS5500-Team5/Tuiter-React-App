import {useState} from "react";
import * as service from "../../services/security-service";
import {useNavigate} from "react-router-dom";
import { ReactSession } from 'react-client-session';

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () =>
        service.register(newUser)
            .then(() => {
                ReactSession.set("UserId", newUser._id);
                return navigate('/home');})
            .catch(e => alert(e));
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, username: e.target.value})}
                   placeholder="username"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, password: e.target.value})}
                   placeholder="password" type="password"/>
            <input className="mb-2 form-control"
                   onChange={(e) =>
                       setNewUser({...newUser, email: e.target.value})}
                   placeholder="email" type="email"/>
            <button onClick={signup}
                    className="btn btn-primary mb-5">Signup
            </button>
        </div>
    );
}
export default Signup;