import React from "react";

import {FaUserAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

import {myProfileRouteLink} from "../routes/routeLinks";


const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <div>
                My-Health
            </div>
            <div>
                Search
            </div>
            <div className="navbar__right">
                <Link
                    to={myProfileRouteLink}>
                    <FaUserAlt className="profile-icon"/>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
