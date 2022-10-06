import React from 'react';

function MainSection() {
    return (
        <section id='home-main-section'>
                <div className="row top-row align-items-center">
                    <div className="col text-col">
                        <h1 className="col-text">Hey!! <br></br><span className="pink-text">Are you hungry?</span> <br></br>Order the food in
                            <span className="pink-text"> Fudo!</span>
                        </h1>
                        <p>Nothing brings people together like good fudo!!</p>
                    </div>
                    <div className="col text-center">
                        <img className="chef-img" src="/images/Chef.png" alt="chef img" width="700px" height="600px" />
                    </div>
                </div>
        </section>
    );
}

export default MainSection;