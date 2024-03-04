import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Footer from '../../components/Footer'
import { useAppContext } from '../../context/AppContext'
import "../../css/properties/Billing.css"
import PaymentSuccessful from '../../modals/PaymentSuccessful'
import mobileView from '../../utilities/mobileView'

export default function Billing() {
    const navigate = useNavigate()

    const { isPaymentSuccess, setIsPaymentSuccess } = useAppContext()

    function handleSubmit(e) {
        e.preventDefault()
        navigate("/checkout")
    }

    return (
        <div>
            <div className='paymentCheckout-container' style={{ marginBottom: "5rem" }}>
                <div className='checkout-top'>
                    <i className={`bx bx-chevron-left bx-${mobileView() ? "sm" : "md"}`} />
                    <h1>BILLING DETAILS</h1>
                    <span></span>
                </div>

                <div className='personal-details-card'>
                    <h1>BILLING DETAILS</h1>
                    <form className='billingDetails-form' onSubmit={handleSubmit}>
                        <div>
                            <input type="text" autoComplete='nope' placeholder='Card Holders Name' />
                            <input type="number" placeholder='Card Number' />
                        </div>

                        <div>
                            <input type="number" placeholder='Valid Through' />
                            <input type="number" placeholder='CVV' />
                        </div>

                        <button type='submit'>CONTINUE</button>
                    </form>

                    <button className='billingDetails-existing-btn' onClick={() => navigate("/payment-method")}>EXISTING CARD</button>
                </div>
            </div>

            <Footer />
            {isPaymentSuccess && <PaymentSuccessful />}
        </div>
    )
}
