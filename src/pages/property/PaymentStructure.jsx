import { useNavigate } from "react-router-dom"
import Footer from '../../components/Footer'
import PropertyNavbar from '../../components/Properties/PropertyNavbar'
import "../../css/properties/PaymentStructure.css"

export default function PaymentStructure() {
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        navigate("/payment-overview")
    }

    return (
        <div>
            <PropertyNavbar active="apartments" />
            <div className='create-account-container paymentStructure-container'>
                <h4>Contact us</h4>
                <h1>Payment Structure</h1>
                <p>We're glad og your choice and we'd love to help you own this property. Please select your flexible plan a you're done.</p>

                <div className='ps-form-container'>
                    <p>Payment Flexibility</p>
                    <form className="ps-form" style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                            <input type="text" placeholder="Select when you want to pay" name="paymentDate" />
                            <input type="number" placeholder="Enter Amount" name="paymentAmount" />
                        </div>

                        <button className='password-forgotPassword' type='button'>Forgot password?</button>
                        <button className='paymentStructure-btn' type='submit'>Update</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
