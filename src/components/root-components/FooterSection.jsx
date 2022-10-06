import React from "react";
import DropDown from "./footersection-components/DropDown";
import AboutList from "./footersection-components/AboutList";
import FeatureCard from "./footersection-components/FeatureCard";
import FAIconList from "./footersection-components/FAIconList";
import Button from "./footersection-components/Button";

function FooterSection() {
    return (
        <section id="footer-section">
            <h1 className="quote">
                <span className="light">Kudos to</span>{" "}
                <span className="dark">"Fudos"</span>
            </h1>
            <div className="row about-features">
                <FeatureCard key="0" img="/images/star.png" text="4.8 Rating" />
                <FeatureCard
                    key="1"
                    img="/images/badge.png"
                    text="Top 5 Restaurant"
                />
                <FeatureCard
                    key="2"
                    img="/images/cross.png"
                    text="Covid Guidelines"
                />
                <FeatureCard
                    key="3"
                    img="/images/headset.png"
                    text="24/7 Support"
                />
            </div>
            <div className="lang-country-div">
                <span className="title-text">Fudo</span>
                <DropDown
                    name="Language"
                    items={["English", "Hindi", "Telugu"]}
                />
                <DropDown name="Country" items={["India", "USA", "UK"]} />
            </div>
            <div className="row about-row">
                <AboutList
                    title="ABOUT FUDO"
                    items={[
                        "Who we are",
                        "Blog",
                        "Work with us",
                        "Investor relations",
                        "Report fraud",
                    ]}
                />
                <AboutList
                    title="FUDOVERSE"
                    items={["Fudo", "Feeling India", "Hyperpure", "Fudoland"]}
                />
                <AboutList
                    title="LEARM MORE"
                    items={["Privacy", "Security", "Terms", "Sitemap"]}
                />
            </div>
            <div className="row links-row">
                <FAIconList
                    title="SOCIAL LINKS"
                    icons={[
                        "linkedin",
                        "twitter",
                        "instagram",
                        "youtube",
                        "facebook",
                    ]}
                />
                <div className="col">
                    <h3 className="col-title">AVAILABLE ON</h3>
                    <Button text="App Store" icon="apple" />
                    <Button text="Play Store" icon="google-play" />
                </div>
            </div>
            <p className="copyright-text">
                By continuing past this page,you agree to our Terms of Service ,
                Cookie Policy, Privacy Policy and content policies. All
                trademarks are properties of their respective owners 2008-2022.
                All rights are reserved.
            </p>
        </section>
    );
}

export default FooterSection;
