import React from 'react'
import { useNavigate } from "react-router-dom"
import Footer from "../../components/Footer"
import PropertyNavbar from '../../components/properties/PropertyNavbar'
import { useAppContext } from '../../context/AppContext'
import "../../css/properties/PaymentOverview.css"
import formatCurrency from '../../utilities/FormatCurrency'
import mobileView from '../../utilities/mobileView'


export default function PaymentOverview() {
    const { propertyItem } = useAppContext()
    if (!propertyItem) return;
    const navigate = useNavigate()
    return (
        <div>
            <PropertyNavbar activeLink="" />

            <section className='paymentCheckout-container'>
                <div className='checkout-top'>
                    {/* <i className={`bx bx-chevron-left bx${mobileView() ? "sm" : "md"}`} /> */}
                    <div></div>
                    <h1>Payment Overview</h1>
                    <span></span>
                </div>

                <div className='property-checkout-card'>
                    <img src={propertyItem.images[0]} alt={propertyItem.title} />

                    <div className='property-checkout-desc'>
                        <h4>{propertyItem.title}</h4>
                        <p>{propertyItem.desc}</p>
                    </div>

                    <h3>{formatCurrency(propertyItem.price)}</h3>
                </div>

                <div className="property-checkout-details">
                    <div>
                        <p>Initial Payment</p>
                        <h3>N20,000,000</h3>
                    </div>
                    <div>
                        <p>Payment Flexibility</p>
                        <h3>4 Installment</h3>
                    </div>
                    <div>
                        <h2>Total</h2>
                        <h2>N22,000,000</h2>
                    </div>
                </div>

                <button className="paymentCheckout-btn" onClick={() => navigate("/property-billing")}>MAKE PAYMENT</button>
            </section>

            <Footer />
        </div>
    )
}
