import React, {Component} from 'react'
import Radar from 'react-d3-radar'
import ReactToolTip from 'react-tooltip'
import {connect} from 'react-redux'
import {Popup} from './Popup'
import PersonalityRadarChartChild from './PersonalityRadarChartChild';
import Tooltip from "react-simple-tooltip"

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
            textBoxes: [],
            activeLabel: ''
        }
        this.rect = {}
        this.traitSummaries = {
            Agreeableness: "Higher: Value getting along with others. They have a more optimistic view of human nature. Lower: Value self interests over others. They are more skeptical of others' motives.",
            Conscientiousness: "Higher: More self-disciplined, dutiful, or aiming for achievement against measures or outside expectations. Lower: More likely to prefer the spontaneous over the planned.",
            Extraversion: "Higher: More energetic and pronounced engagement with the external world. Likes high group visibility, talking, and asserting themselves. Lower: Needs less stimulation and are more independent of their social world. It does not mean they are shy, un-friendly, or antisocial.",
            EmotionalRange: "Higher: More likely to have negative emotions or get upset. It could mean they are going through a tough time. Lower: More calm and less likely to get upset. It does not mean they are positive, or happy people.",
            Openness: "Higher: Intellectually curious, emotionally-aware, sensitive to beauty and willing to try new things. Lower: Preferring the plain, straightforward, and obvious over the complex, ambiguous, and subtle."
        }
    }

    componentDidMount() {
        const personalityRadar = document.getElementsByClassName('personality-radar-main');
        const texts = Array.from(personalityRadar[0].getElementsByTagName('text')).slice(-5);
        this.setState({textBoxes: texts})
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
                        popupY: window.event.clientY - 98,
                        popupMessage: percentage
                    })             
            } else {
                this.setState({
                    isHovering: false
                })
            }
        }
    }

    handleLabelClick = (event) => {
        if (this.state.activeLabel !== event.target.getAttribute('value')){
            this.setState({activeLabel: event.target.getAttribute('value')})
        } else {
            this.setState({activeLabel: ''})
        }
    }
    
    render() {
        if (this.container) this.rect = this.container.querySelector('svg').getBoundingClientRect();
        var data = this.props.data
        var textBoxData
        if (this.state.textBoxes.length) {
            textBoxData = {Openness: this.state.textBoxes[0].getBoundingClientRect(),
                            Conscientiousness: this.state.textBoxes[1].getBoundingClientRect(),
                            Extraversion: this.state.textBoxes[2].getBoundingClientRect(),
                            Agreeableness: this.state.textBoxes[3].getBoundingClientRect(),
                            EmotionalRange: this.state.textBoxes[4].getBoundingClientRect()};
        }
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
                    {/*start here after lunch - hardcode in the blurbs about each trait.*/}
                    <h2 style={{
                        textAlign: 'center'}}>
                        "Big 5 Personality Traits"
                    </h2>
                    <div
                        className='personality-radar-main radar'
                        ref={(ref) => this.container = ref}
                        onMouseLeave={this.handleHover}
                    >
                        {textBoxData && 
                            Object.keys(textBoxData).map(textBoxKey => {
                                const boxData = textBoxData[textBoxKey]
                                return (
                                    <span>
                                        <div 
                                            key={textBoxKey}
                                            className="text-container"
                                            name={textBoxKey}
                                            style={{
                                                position: 'absolute',
                                                top: boxData.y - 98,
                                                left:boxData.x,
                                                width: boxData.width,
                                                height: boxData.height
                                            }}
                                        />
                                        <button 
                                            className="label-btn"
                                            onMouseEnter={this.handleLabelClick} 
                                            onMouseLeave={this.handleLabelClick} 
                                            value={textBoxKey}
                                            style={{
                                                position: 'absolute',
                                                top: boxData.y - 98 + window.pageYOffset,
                                                left:boxData.x + boxData.width,
                                                border: 'none',
                                                backgroundColor: 'rgba(255,255,255,0)'
                                            }}
                                        >
                                        ...
                                        </button>
                                    </span>
                                )
                            })
                        }
                        {textBoxData && 
                            Object.keys(textBoxData).map(trait => {
                                return (
                                    <div
                                        name= {trait}
                                        className="tooltip"
                                        style={{
                                            opacity: this.state.activeLabel === trait ? 1 : 0,
                                            position: "absolute",
                                            top: textBoxData[trait].top + window.pageYOffset - 98,
                                            left: textBoxData[trait].right + 30
                                        }}
                                    >
                                        {this.traitSummaries[trait]}
                                    </div>
                                )
                            })
                        }

                        {this.state.isHovering && 
                            <Popup x={this.state.popupX} y={this.state.popupY + window.pageYOffset} message={this.state.popupMessage} />
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
                                <div>
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
