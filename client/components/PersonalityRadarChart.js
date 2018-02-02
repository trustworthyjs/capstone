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
            chartHeight: 500
        }
    }
    
    //this is a workaround for the react-d3-radar -> the hover radius was way too big, this cuts the 
    // radius down to just 5 pixels around the actual circle
    handleHover = (point) => {
        let rect;
        if (this.container) {
            var svg = this.container.querySelector('svg');
            rect = svg.getBoundingClientRect();
            let mouseXInChart = window.event.clientX - (this.state.chartWidth / 2 + rect.left)
            let mouseYInChart = window.event.clientY - (this.state.chartHeight / 2 + rect.top)
            if (point &&
                (mouseXInChart > Math.floor(point.x) - 5 && mouseXInChart < Math.floor(point.x) + 5) &&
                (mouseYInChart > Math.floor(point.y) - 5 && mouseYInChart < Math.floor(point.y) + 5)) {
                    let percentage = Math.floor(point.value) + '%'
                    this.setState({
                        isHovering: true,
                        popupX: window.event.clientX - rect.left,
                        popupY: window.event.clientY - rect.top,
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
                    <div
                        className='personality-radar-main'
                        ref={(ref) => this.container = ref}
                    >
                        {this.state.isHovering && 
                            <Popup x={this.state.popupX} y={this.state.popupY} message={this.state.popupMessage} />
                        }
                        <Radar
                            width={this.state.chartWidth}
                            height={this.state.chartHeight}
                            padding={70}
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
                    <div>
                        <div>
                            <PersonalityRadarChartChild name='Openness' trait={personalityChildren['Openness']} width={350} height={350}/>
                        </div>
                        <div>
                            <PersonalityRadarChartChild name='Conscientiousness' trait={personalityChildren['Conscientiousness']} width={350} height={350}/>
                        </div>
                        <div>
                            <PersonalityRadarChartChild name='Extraversion' trait={personalityChildren['Extraversion']} width={350} height={350}/>
                        </div>
                        <div>
                            <PersonalityRadarChartChild name='Agreeableness' trait={personalityChildren['Agreeableness']} width={350} height={350}/>
                        </div>
                        <div>
                            <PersonalityRadarChartChild name='Emotional Range' trait={personalityChildren['Emotional range']} width={350} height={350}/>
                        </div>
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
