import React from 'react'
import Footer from "../../components/Footer"
import ApartmentsMain from '../../components/properties/ApartmentsMain'
import PropertyBox from '../../components/properties/PropertyBox'
import "../../css/properties/Apartments.css"
import Data from "../../Data.json"

export default function PropertySearchResults() {
    return (
        <div>
            <ApartmentsMain activeNavLink="" />

            <section>
                <hr className="property-break" />

                <div className="property-group">
                    {Data.propertySection.propertyStore.map(item => (
                        <PropertyBox key={item.id} img={item.images[0]} {...item} />
                    ))}
                </div>

                <div className="user-preference-ad">
                    <div className="user-pref-left">
                        <div className="property-box user-pref-left-box">
                            <div className="property-box-feature">
                                <p>featured</p>
                                {20 ? (<p>3D</p>) : (null)}
                            </div>
                        </div>
                    </div>

                    <div className="user-pref-right">
                        <h2>Not found what you are looking for?</h2>
                        <p>Let us know your preference and our business team will reach out to you with what matches your request.</p>
                        <button>Tell Us <i className="bx bx-right-arrow-alt" /></button>
                    </div>
                </div>

                <div className="property-group">
                    <PropertyBox
                        img="/assets/Property/apartment1.png"
                        is3d={true}
                        title="3 Bedroom flat Apartment"
                        location="Ikeja Lagos"
                    />
                    <PropertyBox
                        img="/assets/Property/apartment2.png"
                        is3d={true}
                        title="3 Bedroom flat Apartment"
                        location="Ajah, Lagos"
                    />
                    <PropertyBox
                        img="/assets/Property/apartment3.png"
                        is3d={false}
                        title="1 Bedroom flat Apartment"
                        location="Samolu, Lagos"
                    />
                </div>
            </section>
            {/* FOOTER */}
            <Footer />
        </div>
    )
}