import React from 'react';
import TitleLetter from './mainsection-components/TitleLetter';

function MainSection(props) {

    const titleLetters = "FUDO".split("");

    return (
        <section id="main-section">
            <div className="container-fluid">
                <div className="row text-center align-items-center">
                    <div className="col">
                        <div className="title">
                            {
                                titleLetters.map((letter, index) => {
                                    return <TitleLetter letter={letter} key={index} />;
                                })
                            }
                        </div>
                        <h2 className="sub-title" id="sub-title">The way you take it “Awesome”</h2>
                    </div>
                    <div className="col">
                        <img id='main-section-pic' className='main-section-pic' src="images/mainSectionPic0.png" alt="food-img" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainSection;