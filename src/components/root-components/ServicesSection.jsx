import React from 'react';
import HeadingLetter from './servicessection-components/HeadingLetter';
import ServiceCard from './servicessection-components/ServiceCard';

function ServicesSection() {

    const letters = "SERVICES".split("");

    return (
        <section id="services-section">
            <div className="services-heading">
                {
                    letters.map((letter, index) => {
                        return <HeadingLetter letter={letter} key={index} />;
                    })
                }
            </div>
            <div className="row services">
                <ServiceCard key="0" img="images/easy-to-order.png" text="Easy to Order" />
                <ServiceCard key="1" img="images/best-quality.png" text="Best Quality" />
                <ServiceCard key="2" img="images/door-delivery.png" text="Door Delivery" />
            </div>
        </section>
    );
}

export default ServicesSection;