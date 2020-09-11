import React from 'react';
import { Link } from "react-router-dom"

class Header extends React.Component {
    render() {

        const loginButton = (
            <li>
                <Link to="/login">
                    <div>
                        {console.log(this.props)}
                    </div>
                    <i className="material-icons">vpn_key</i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li>
                    <Link to="/logout">
                        <i className="material-icons">vpn_key</i>
                    </Link>
            </li>
        );


        return (
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <Link className="brand-logo center" to="/">Fuck</Link>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


export default Header;