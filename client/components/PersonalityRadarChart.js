import React, {Component} from 'react'
import Radar from 'react-d3-radar'
import ReactToolTip from 'react-tooltip'
import {connect} from 'react-redux'
import {Popup} from './Popup'
import PersonalityRadarChartChild from './PersonalityRadarChartChild';

export class PersonalityRadarChart extends Component {

    constructor() {
        super()
        this.state = {
            isHovering: false,
            popupX: 0,
            popupY: 0,
            popupMessage: '',
            chartWidth: 500,
            chartHeight: 500,
        }
        this.rect = {}
    }

    //this is a workaround for the react-d3-radar -> the hover radius was way too big, this cuts the
    // radius down to just 5 pixels around the actual circle
    handleHover = (point) => {
        if (this.container) {
            var svg = this.container.querySelector('svg');
            this.rect = svg.getBoundingClientRect();
            let mouseXInChart = window.event.clientX - (this.state.chartWidth / 2 + this.rect.left)
            let mouseYInChart = window.event.clientY - (this.state.chartHeight / 2 + this.rect.top)
            if (point &&
                (mouseXInChart > Math.floor(point.x) - 5 && mouseXInChart < Math.floor(point.x) + 5) &&
                (mouseYInChart > Math.floor(point.y) - 5 && mouseYInChart < Math.floor(point.y) + 5)) {
                    let percentage = Math.floor(point.value) + '%'
                    this.setState({
                        isHovering: true,
                        popupX: window.event.clientX,
                        popupY: window.event.clientY - this.rect.top,
                        popupMessage: percentage
                    })
            } else {
                this.setState({
                    isHovering: false
                })
            }
        }
    }


    render() {
        if (this.container) this.rect = this.container.querySelector('svg').getBoundingClientRect();
        var data = this.props.data

        if (data.personality) {

            const personality = data.personality;

            let variables = [];
            let values = {};

            let personalityChildren = {};
            personality.forEach(trait => {
                variables.push({key: trait.name, label: trait.name})
                values[trait.name] = trait.percentile * 100;
                personalityChildren[trait.name] = trait.children;
            })
            return (
                <div>
                    <h2 style={{
                        textAlign: 'center'}}>
                        "Big 5 Personality Traits"
                    </h2>
                    <div
                        className='personality-radar-main radar'
                        ref={(ref) => this.container = ref}
                        onMouseLeave={this.handleHover}
                    >
                        {this.state.isHovering &&
                            <Popup x={this.state.popupX} y={this.state.popupY} message={this.state.popupMessage} />
                        }
                        <Radar
                            width={this.state.chartWidth}
                            height={this.state.chartHeight}
                            padding={100}
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
                    <div id="child-radar-container">
                        {Object.keys(personalityChildren).map(childTraitName => {
                            return (
                                <div key={childTraitName}>
                                    <PersonalityRadarChartChild
                                        key={childTraitName}
                                        name={childTraitName}
                                        trait={personalityChildren[childTraitName]}
                                        width={350}
                                        height={350}
                                        parentHeight={this.rect.top + this.rect.height}/>
                                </div>
                            )
                        })}
                    </div>
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
const mapState = ({data}) => ({data})

export default connect(mapState)(PersonalityRadarChart)
