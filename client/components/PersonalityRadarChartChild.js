import React, {Component} from 'react'
import Radar from 'react-d3-radar'
import ReactToolTip from 'react-tooltip'
import {connect} from 'react-redux'
import {Popup} from './Popup'
import PersonalityRadarChart from './PersonalityRadarChart'

export class PersonalityRadarChartChild extends Component {
    
    constructor() {
        super()
        this.state = {
            isHovering: false,
            popupX: 0,
            popupY: 0,
            popupMessage: ''
        }
    }
    
    //this is a workaround for the react-d3-radar -> the hover radius was way too big, this cuts the 
    // radius down to just 5 pixels around the actual circle
    handleHover = (point) => {
        let rect;
        if (this.container) {
            var svg = this.container.querySelector('svg');
            rect = svg.getBoundingClientRect();
            let mouseXInChart = window.event.clientX - (this.props.chartWidth / 2 + rect.left)
            let mouseYInChart = window.event.clientY - (this.props.chartHeight / 2 + rect.top)
            if (point &&
                (mouseXInChart > Math.floor(point.x) - 5 && mouseXInChart < Math.floor(point.x) + 5) &&
                (mouseYInChart > Math.floor(point.y) - 5 && mouseYInChart < Math.floor(point.y) + 5)) {
                    let percentage = Math.floor(point.value) + '%'
                    this.setState({
                        isHovering: true,
                        popupX: window.event.clientX,
                        popupY: window.event.clientY + window.pageYOffset - 98,
                        popupMessage: percentage
                    })             
            } else {
                this.setState({
                    isHovering: false
                })
            }
        }
    }
    
    //this is a workaround for the react-d3-radar -> the hover radius was way too big, this cuts the 
    render() {
        if (this.props.personalityTrait) {
            
            const personalityTrait = this.props.personalityTrait;
            const name = this.props.name;
            let variables = [];
            let values = {};

            personalityTrait.forEach(childTrait => {
                variables.push({key: childTrait.name, label: childTrait.name})
                values[childTrait.name] = childTrait.percentile * 100;
            })
            return (
                <div
                    className='personality-radar-child radar'
                    ref={(ref) => this.container = ref}
                >
                    {this.state.isHovering && 
                        <Popup x={this.state.popupX} y={this.state.popupY} message={this.state.popupMessage} />
                    }
                    <h3>{name}</h3>
                    <Radar
                        width={this.props.chartWidth}
                        height={this.props.chartHeight}
                        padding={90}
                        domainMax={100}
                        highlighted={null}
                        onHover={this.handleHover}
                        data={{
                            variables,
                            sets: [
                                {
                                    key: 'me',
                                    label: 'My Scores',
                                    values
                                }
                            ]
                        }}
                    />
                </div>
            )  
        } else {
            return null;
        }
    }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
    return {
        name: ownProps.name,
        personalityTrait: ownProps.trait,
        chartHeight: ownProps.height,
        chartWidth: ownProps.width,
        parentHeight: ownProps.parentHeight
    }
}

export default connect(mapState)(PersonalityRadarChartChild)
