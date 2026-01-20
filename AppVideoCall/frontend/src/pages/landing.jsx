import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
    <div>
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>VideoCallApp</h2>
                </div>
                <div className='navList'>
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role='button'><p>login</p></div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:"#ff9"}}>Connect</span> with you</h1>
                    <p>Cover a Distance by Apna Video Call</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Stared</Link>
                    </div>
                </div>
                <div>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    </div>
    );
}