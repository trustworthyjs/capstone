import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper'


export const LandingPage = () => {
    const style = {
        height: 230,
        width: 230,
        margin: 20,
        textAlign: 'center',
        display: 'flex',
        position: 'absolute',
        top: '140px',
        left: '800px',
        alignItems: 'center',
        opacity: '.85'
    };

    return (
        <Paper className="banner" style={{ marginTop: '70px' }}>
            <img src={`/images/free_write.jpg`} />
            <NavLink to="/home">
                <Paper style={style} zDepth={2} circle={true} children={<h2>Let Your Creativity Flow and Start Writting</h2>} />
            </NavLink>
        </Paper>
    )
}

export default connect(null)(LandingPage);
