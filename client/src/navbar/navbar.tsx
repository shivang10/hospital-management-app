import React from "react";

import {FaUserAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

import {myProfileRouteLink} from "../routes/routeLinks";
import {getUserDetails} from "../utils/tokenDetails";

const Navbar: React.FC = () => {
    const {username} = getUserDetails();

    return (
        <div className="navbar">
            <div>My-Health</div>
            <div>Search</div>
            <div className="navbar__right">
                <Link
                    className="navbar__right-link"
                    to={myProfileRouteLink}>
                    <FaUserAlt className="profile-icon"/>{username}
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
