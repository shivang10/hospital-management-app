import React from "react";

const Homepage: React.FC = () => {
    return (
        <div className="homepage">
            <div className="homepage-left">
                <div className="homepage-images">
                    <span id="item-1"></span>
                    <span id="item-2"></span>
                    <span id="item-3"></span>
                    <div className="carousel-item item-1">
                        <a href="#item-3" className="arrow-prev arrow"></a>
                        <a href="#item-2" className="arrow-next arrow"></a>
                    </div>
                    <div className="carousel-item item-2">
                        <a href="#item-1" className="arrow-prev arrow"></a>
                        <a href="#item-3" className="arrow-next arrow"></a>
                    </div>
                    <div className="carousel-item item-3">
                        <a href="#item-2" className="arrow-prev arrow"></a>
                        <a href="#item-1" className="arrow-next arrow"></a>
                    </div>
                </div>
                <div className="homepage-aboutUs">
                    <h1>About US</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industrys standard dummy text ever since the 
                        1500s, when an unknown printer took a galley of type and scrambled it to 
                        make a type specimen book. It has survived not only five centuries, 
                        but also the leap into electronic typesetting, remaining essentially 
                        unchanged. It was popularised in the 1960s with the release of Letraset 
                        sheets containing Lorem Ipsum passages, and more recently with desktop 
                        publishing software like Aldus PageMaker including versions of Lorem 
                        Ipsum.</p>
                </div>
            </div>
            <div className="homepage-right">
                <div className="homepage-doctor">
                    <div className="doctor-card">
                        <div className="doctor-card-content">
                            <h2 className="doctor-card-title">Are you a Doctor ?</h2>
                            <p className="doctor-card-body">
                                Click on the button and go to Doctors Sign Up Panel
                            </p>
                            <a href="/signUp" className="card-button">Sign Up</a>
                            <a href="/login" className="card-button">Login</a>
                        </div>
                    </div>
                </div>
                
                <div className="homepage-patient">
                    <div className="patient-card">
                        <div className="patient-card-content">
                            <h2 className="patient-card-title">Are you a Patient?</h2>
                            <p className="patient-card-body">
                                Click on the button to go to Patient Login panel
                            </p>
                            <a href="/signUp" className="card-button">Sign Up</a>
                            <a href="/login" className="card-button">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;