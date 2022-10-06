import React from 'react';

function AboutList(props) {
    return (
        <div className="col-lg-4 col-md-4 col-sm-12 p-3">
            <h3 className="col-title">{props.title}</h3>
            {
                props.items.map((item, index) => {
                    return (
                        <a key={index} href="/">
                            <h2 className="col-item">{item}</h2>
                        </a>
                    );
                })
            }
        </div>
    );
}

export default AboutList;