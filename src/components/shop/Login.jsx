import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../../css/shop/CreateAccount.css"

export default function LoginForm() {
    const [inputType, setInputType] = useState("password")
    const [RegisterType, setRegisterType] = useState("password")

    const navigate = useNavigate()

    const createAccountForm = useRef()
    const passwordReferCreateAcc = useRef()
    const passwordReferLogin = useRef()

    function changeInputType() {
        if (inputType === "password" && passwordReferLogin.current.value !== "") {
            setInputType("text")
        } else {
            setInputType("password")
        }
    }

    function changeRegisterType() {
        if (RegisterType === "password" && passwordReferCreateAcc.current.value !== "") {
            setRegisterType("text")
        } else {
            setRegisterType("password")
        }
    }

    function handleRegister() {
        navigate("/art-craft")
    }

    function handleSignIn() {
        navigate("/art-craft")
    }
    return (
        <form ref={createAccountForm} className="register-account-form create-account-form" onSubmit={handleRegister}>
            <input type="text" placeholder="First Name" name="First Name" className="registerInputs" />
            <input type="text" placeholder="Last Name" name="Last Name" className="registerInputs" />
            <input type="email" placeholder="Email" name="email" className="registerInputs" />
            <div className='w-100 d-flex align-items-baseline justify-content-between'>
                <input ref={passwordReferCreateAcc} type={RegisterType} placeholder="Password" />
                <p onClick={changeRegisterType}>{RegisterType === "password" ? "show" : "hide"}</p>
            </div>
            <button className='ca-btn'>CREATE ACCOUNT</button>
        </form>
    )
}
