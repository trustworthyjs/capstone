import React from 'react'
import { Line } from '@nivo/line'
import {connect} from 'react-redux'
import {getEntriesDb} from '../store'
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

class ToneGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      toneGraphData: [],
      currentView: ''
    }
    this.onClickSeven = this.onClickSeven.bind(this)
    this.onClickThirty = this.onClickThirty.bind(this)
    this.onClickAll = this.onClickAll.bind(this)
    this.getSingle = this.getSingle.bind(this)
  }

  async componentDidMount(){
    if (!this.props.type){ //if this is rendered from the data analysis page
      let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData)
      this.setState({
        toneGraphData: data,
        currentView: 'last30Days'
      })
    } else if (this.props.type === 'all') { //if rendered from single entry 'all'
      this.onClickAll()
    } else if (this.props.type === 'single'){ //if rendered from single entry 'single'
      this.getSingle(this.props.singleEntry.id)
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.singleEntry.tones !== nextProps.singleEntry.tones){
      if (this.props.type === 'single'){
        this.getSingle(this.props.singleEntry.id)
      } else if (this.props.type === 'all'){
        this.onClickAll()
      }
    }
  }

  selectEntries = (entries, range ) => {
    let nowDate = new Date();
    nowDate.setHours(23, 59, 59, 0)
    let beginRangeDate = new Date();
    if (range === 'last7Days'){
      beginRangeDate.setDate(nowDate.getDate() - 7)
      beginRangeDate.setHours(0, 0, 0, 0 )
    }
    else if (!range || range === 'last30Days'){
      beginRangeDate.setDate(nowDate.getDate() - 30)
      beginRangeDate.setHours(0, 0, 0, 0)
    }
    else if (range === 'all'){
      return entries.filter(entry => entry.submitted === true)
    }
    else if (typeof range === 'number'){
      return entries.filter(entry => entry.id === range)
    }
    let filteredEntries = entries.filter((entry) => {
      return new Date(entry.savedAt) >= beginRangeDate && new Date(entry.savedAt) <= nowDate && entry.submitted
    })
    return filteredEntries
  }

  calculateDataFunc = (filtered) => {
    let dataObj = {}
    let count = {}
    filtered.forEach((entry) => {
      let savedAt = entry.savedAt.slice(0, entry.savedAt.indexOf('T'))
      //if there are entries and the date has not yet been added
      if (!dataObj[savedAt]){
        dataObj[savedAt] = entry.tones
        count[savedAt] = {num: 1, totals: []}
        if (dataObj[savedAt]){
          dataObj[savedAt].forEach((tone) => {
            tone.score = parseFloat(tone.score.toPrecision(2))
            count[savedAt].totals.push({
              score: tone.score,
              tone_id: tone.tone_id
            })
          })
        }
      } else {
        //if date exists...
        count[savedAt].num++
        //if this entry has tones...
        if (entry.tones){
          entry.tones.forEach((entryTone) => {
            //for each tone, check if it already exists for this day
            let thing = dataObj[savedAt].find((tone) => {
              return tone.tone_id === entryTone.tone_id
            })
            if (thing){
              //if it exists for the day, update the count total for that day's tone
              let countTotal = count[savedAt].totals.find((countTone) => {
                return countTone.tone_id === entryTone.tone_id
              })
              countTotal.score = countTotal.score + entryTone.score
              //update the score in the data object with the correct value
              dataObj[savedAt].find((tone) => {
                return tone.tone_id === entryTone.tone_id
              }).score = countTotal.score / count[savedAt].num
              //turn it into 2 decimals
              dataObj[savedAt].find((tone) => {
                return tone.tone_id === entryTone.tone_id
              }).score = parseFloat(dataObj[savedAt].find((tone) => {
                return tone.tone_id === entryTone.tone_id
              }).score.toPrecision(2))
            } else {
              //if the tone isnt in the day which already exists
              // dataObj[savedAt].totals.push(entryTone)
              entryTone.score = parseFloat(entryTone.score.toPrecision(2))
              count[savedAt].totals.push({
                score: entryTone.score,
                tone_id: entryTone.tone_id
              })
              dataObj[savedAt].push(entryTone)
            }
          })
        }
      }
    })
    //sort by date
    let sortedObj = {}
    let keys = Object.keys(dataObj)
    keys.sort()

    for (let i = 0 ; i < keys.length ; i++ ){
      let item = keys[i]
      sortedObj[item] = dataObj[item]
    }
    return sortedObj
  }

  prepData = (entries) => {
    if (Object.keys(entries).length === 0){
      return []
    }
    let graphData = []
    let tones = {
      tentative: {"color": "hsl(90, 70%, 50%)"},
      anger: {"color": "hsl(20, 70%, 50%)"},
      sadness: {"color": "hsl(272, 70%, 50%)"},
      analytical: {"color": "hsl(119, 70%, 50%)"},
      confident: {"color": "hsl(163, 70%, 50%)"},
      joy: {"color": "hsl(352, 70%, 50%)"},
      fear: {"color": "hsl(97, 70%, 50%)"},
    }

    for (let tone in tones) {
      if (tones.hasOwnProperty(tone)){
        let entryData = []
        for (let day in entries){
          if (entries.hasOwnProperty(day)){
            if (entries[day]){
              let value = entries[day].find((obj) => {
                return obj.tone_id === tone
              })
              entryData.push({
                "x": day,
                "y": value ? value.score : 0,
              })
            }
          }
        }
        graphData.push({
          "id": tone,
          "color": tones[tone].color,
          "data": entryData
        })
      }
    }
    return graphData
  }

  async onClickSeven(event) {
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData, 'last7Days')
    this.setState({
      toneGraphData: data,
      currentView: 'last7Days'
    })
  }

  async onClickThirty(event) {
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData, 'last30Days')
    this.setState({
      toneGraphData: data,
      currentView: 'last30Days'
    })
  }

  async onClickAll(event) {
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData, 'all')
    this.setState({
      toneGraphData: data,
      currentView: 'all'
    })
  }

  async getSingle (entryId) {
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData, entryId)
    this.setState({
      toneGraphData: data
    })
  }
/*eslint-disable complexity*/
  render () {
    let dataStyles = {
      width: 900,
      height: 500,
      lineWidth: 4,
      axisBottom: {
        "orient": "bottom",
        "tickSize": 1,
        "tickPadding": 4,
        "tickRotation": 50,
        "legend": "entries",
        "legendOffset": 59,
        "legendPosition": "center"
      },
      dotSize: 8,
      dotBorderWidth: 2,
      legends: [
        {
            "anchor": "bottom-right",
            "direction": "column",
            "translateX": 100,
            "itemWidth": 80,
            "itemHeight": 20,
            "symbolSize": 12,
            "symbolShape": "circle"
        }
      ],
      margin: {
        "top": 35,
        "right": 130,
        "bottom": 60,
        "left": 50
      },
      enableDotLabel: true
    }
    let singleEntryStyles = {
      width: 550,
      height: 350,
      lineWidth: 1,
      axisBottom: {
        "orient": "bottom",
        "tickSize": 1,
        "tickPadding": 5,
        "tickRotation": 50,
        "legend": "entries",
        "legendOffset": 70,
        "legendPosition": "center"
      },
      dotSize: 5,
      dotBorderWidth: 1,
      legends: [
        {
            "anchor": "bottom-right",
            "direction": "column",
            "translateX": 100,
            "itemWidth": 70,
            "itemHeight": 12,
            "symbolSize": 6,
            "symbolShape": "circle"
        }
      ],
      margin: {
        "top": 20,
        "right": 130,
        "bottom": 75,
        "left": 50
      },
      enableDotLabel: false,
      style: {
        fontSize: 9
      }
    }
    return (
      <div className={!this.props.type ? "container" : ""}>
        {/*Buttons will only show up on the data analysis page, not single entries*/}
        {!this.props.type && this.props.allEntries && this.props.allEntries.length > 0 &&
          <span>
            <h5>Filter by: (default 'Last 30 Days')</h5>
          <div>
            <FlatButton label="Last 7 Days" onClick={this.onClickSeven} secondary={true} style={this.state.currentView === "last7Days" ? {} : {color: '#1595A3'}} />
            <FlatButton label="Last 30 Days" secondary={true} onClick={this.onClickThirty} style={this.state.currentView === "last30Days" ? {} : {color: '#1595A3'}} />
            <FlatButton label="All Entries" onClick={this.onClickAll} secondary={true} style={this.state.currentView === "all" ? {} : {color: '#1595A3'}} />
          </div>
          </span>}
        {!this.props.type && this.props.allEntries && !this.props.allEntries.length &&
          <div>You do not have any entries to analyze!</div>}
        {this.state.toneGraphData.length > 0 ?
          <Line
            data={this.state.toneGraphData}
            width={!this.props.type ? dataStyles.width : singleEntryStyles.width}
            height={!this.props.type ? dataStyles.height : singleEntryStyles.height}
            margin={!this.props.type ? dataStyles.margin : singleEntryStyles.margin}
            minY="auto"
            axisBottom={this.props.type === 'all' ? singleEntryStyles.axisBottom : dataStyles.axisBottom}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "tone score",
                "legendOffset": -40,
                "legendPosition": "center"
            }}
            lineWidth={!this.props.type ? dataStyles.lineWidth : singleEntryStyles.lineWidth}
            colors={'set2'}
            dotSize={!this.props.type ? dataStyles.dotSize : singleEntryStyles.dotSize}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={!this.props.type ? dataStyles.dotBorderWidth : singleEntryStyles.dotBorderWidth}
            dotBorderColor="#ffffff"
            enableDotLabel={false}
            dotLabel="y"
            dotLabelYOffset={-12}
            enableArea={true}
            enableGridX={false}
            animate={true}
            curve={'monotoneX'}
            motionStiffness={90}
            motionDamping={15}
            legends={!this.props.type ? dataStyles.legends : singleEntryStyles.legends}
          />
          :
          <div>
            {this.props.type ?
              <div className="our-loader">
                <div className="ui active inline loader" />
              </div>
            : <div style={{height: '20vh'}}>No entries in the time period selected!</div>
            }
          </div>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    allEntries: state.allEntries,
    user: state.user,
    singleEntry: state.singleEntry
  }
}

const mapDispatch = (dispatch) => {
  return {
    getEntryData: (userId, entryFilterFunc, calculateFunc, prepFunc, range) => {
      return dispatch(getEntriesDb(userId))
      .then((actionType) => {
        return entryFilterFunc(actionType.entries, range)
      })
      .then((filteredEntries) => {
        return calculateFunc(filteredEntries)
      })
      .then((preppedEntries) => {
        return prepFunc(preppedEntries)
      })
    },
  }
}

export default connect(mapState, mapDispatch)(ToneGraph)
