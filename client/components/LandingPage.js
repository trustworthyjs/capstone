import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

export class LandingPage extends Component {
    constructor() {
        super()
        this.navbar = Array.from(document.getElementsByClassName('nav-stuff'))
    }

    componentDidMount() {
        this.navbar.forEach(navItem => navItem.style.visibility = "hidden");
    }

    componentWillUnmount () {
        this.navbar.forEach(navItem => navItem.style.visibility = "visible");
    }

    render() {
        return (
            <div className="landing-page-container">
                <Link to="/home" className="mode-option" params={{mode: 'freeWrite'}}>
                    <div>
                        Free Writing
                    </div>
                </Link>
                <Link to="/home" className="mode-option" params={{mode: 'mindfulJournal'}}>
                    <div>
                        Journal for Mindfulness
                    </div>
                </Link>
                <Link to="/home" className="mode-option" params={{mode: 'custom'}}>
                    <div>
                        Custom
                    </div>
                </Link>
            </div>
        )
    }
}

export default connect(null)(LandingPage);