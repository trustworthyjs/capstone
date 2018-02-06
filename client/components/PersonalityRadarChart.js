import React, {Component} from 'react'
import Radar from 'react-d3-radar'
import ReactToolTip from 'react-tooltip'
import {connect} from 'react-redux'
import {Popup} from './Popup'
import PersonalityRadarChartChild from './PersonalityRadarChartChild';
import CircularProgress from 'material-ui/CircularProgress'

export class PersonalityRadarChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isHovering: false,
            popupX: 0,
            popupY: 0,
            popupMessage: '',
            textBoxes: [],
            activeLabel: '',
            displayingToolTip: false
        }
        this.personality = props.dataFor.personality 
        this.showChildren = props.showChildren
        this.showTooltips = props.showTooltips
        this.chartWidth = props.width
        this.chartHeight =  props.height
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
        if (this.container && this.showTooltips) {
            var svg = this.container.querySelector('svg');
            this.rect = svg.getBoundingClientRect();
            let mouseXInChart = window.event.clientX - (this.chartWidth / 2 + this.rect.left)
            let mouseYInChart = window.event.clientY - (this.chartHeight / 2 + this.rect.top)
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

    handleLabelHover = (event) => {
        if (this.state.activeLabel !== event.target.getAttribute('value')){
            this.setState({activeLabel: event.target.getAttribute('value'),
                            displayingToolTip: true})
        } else {
            this.setState({activeLabel: ''})
            setTimeout(() => {
                if (this.state.activeLabel === '')
                    this.setState({displayingToolTip: false})
            }, 1000)
        }
    }

    render() {
        if (this.container) this.rect = this.container.querySelector('svg').getBoundingClientRect();
        var textBoxData
        if (this.state.textBoxes.length && this.showTooltips) {
            textBoxData = {Openness: this.state.textBoxes[0].getBoundingClientRect(),
                            Conscientiousness: this.state.textBoxes[1].getBoundingClientRect(),
                            Extraversion: this.state.textBoxes[2].getBoundingClientRect(),
                            Agreeableness: this.state.textBoxes[3].getBoundingClientRect(),
                            EmotionalRange: this.state.textBoxes[4].getBoundingClientRect()};
        }
        if (this.personality && this.props.data) {
            const personality = this.personality;

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
                    {this.showChildren &&
                        <div style={{
                            marginTop: '50px',
                            textAlign: 'center',
                            display: 'inline-block',
                            width: '100%'
                        }}>
                            <h2 >"Big 5 Personality Traits"</h2>
                            <h4>Hover over the '...' to see a detailed explaination of each trait</h4>
                        </div>
                    }
                    <div
                        className='personality-radar-main radar'
                        ref={(ref) => this.container = ref}
                        onMouseLeave={this.handleHover}
                    >
                        {textBoxData &&
                            Object.keys(textBoxData).map(textBoxKey => {
                                const boxData = textBoxData[textBoxKey]
                                return (
                                    <span key={textBoxKey}>
                                        <div 
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
                                            onMouseEnter={this.handleLabelHover}
                                            onMouseLeave={this.handleLabelHover}
                                            value={textBoxKey}
                                            style={{
                                                position: 'absolute',
                                                top: boxData.y - 98 + window.pageYOffset,
                                                left:boxData.x + boxData.width,
                                                border: 'none',
                                                textShadow: this.state.activeLabel === textBoxKey ? '10px 10px 10px #ACD3F2' : 'none'
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
                                        key={trait}
                                        name= {trait}
                                        className="tooltip"
                                        style={{
                                            display: this.state.displayingToolTip ? 'inline-block' : 'none',
                                            opacity: this.state.activeLabel === trait ? 1 : 0,
                                            borderRadius: '5px',
                                            position: "absolute",
                                            top: textBoxData[trait].top + window.pageYOffset - 98,
                                            left: textBoxData[trait].right + 30,
                                            padding: "5px"
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
                            width={this.chartWidth}
                            height={this.chartHeight}
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
                    {this.showChildren &&
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
                    }
                </div>
            )
        } else {
            return <CircularProgress size={60} thickness={7} />
        }
    }
}

/**
 * CONTAINER
 */
const mapState = ({data}) => ({data})

export default connect(mapState)(PersonalityRadarChart)
