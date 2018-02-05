import React from 'react'
import { Line } from '@nivo/line'
import {connect} from 'react-redux'
import {getEntriesDb} from '../store'
import FlatButton from 'material-ui/FlatButton';

class ToneGraph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      toneGraphData: []
    }
    this.onClickSeven = this.onClickSeven.bind(this)
    this.onClickThirty = this.onClickThirty.bind(this)
    this.onClickAll = this.onClickAll.bind(this)
  }

  async componentDidMount(){
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData)
    this.setState({
      toneGraphData: data
    })
  }

  selectEntries = (entries, range ) => {
    let nowDate = new Date();
    nowDate.setHours(23, 59, 59, 0)
    let beginRangeDate = new Date();
    if (range === 'last7Days'){
      beginRangeDate.setDate(nowDate.getDate() - 7)
      beginRangeDate.setHours(0, 0, 0, 0 )
    }
    if (!range || range === 'last30Days'){
      beginRangeDate.setDate(nowDate.getDate() - 40)
      beginRangeDate.setHours(0, 0, 0, 0)
    }
    if (range === 'all'){
      return entries.filter(entry => entry.submitted === true)
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
            let value = entries[day].find((obj) => {
              return obj.tone_id === tone
            })
            entryData.push({
              "x": day,
              "y": value ? value.score : 0,
            })
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
      toneGraphData: data
    })
  }

  async onClickThirty(event) {
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData, 'last30Days')
    this.setState({
      toneGraphData: data
    })
  }

  async onClickAll(event) {
    let data = await this.props.getEntryData(this.props.user.id, this.selectEntries, this.calculateDataFunc, this.prepData, 'all')
    this.setState({
      toneGraphData: data
    })
  }

  render () {
    return (
      <div className="container">
        {this.props.allEntries && this.props.allEntries.length > 0 ?
          <div>
            <h5>Filter by: (default 'Last 30 Days')</h5>
            <FlatButton label="Last 7 Days" onClick={this.onClickSeven} />
            <FlatButton label="Last 30 Days" primary={true} onClick={this.onClickThirty} />
            <FlatButton label="All Entries" secondary={true} onClick={this.onClickAll} />
          </div> :
          <div>You do not have any entries to analyze!</div>}
        {this.state.toneGraphData.length > 0 ?
          <Line
            data={this.state.toneGraphData}
            width={900}
            height={500}
            margin={{
                "top": 35,
                "right": 130,
                "bottom": 50,
                "left": 50
            }}
            minY="auto"
            axisBottom={{
                "orient": "bottom",
                "tickSize": 1,
                "tickPadding": 3,
                "tickRotation": 0,
                "legend": "entries",
                "legendOffset": 36,
                "legendPosition": "center"
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "tone score",
                "legendOffset": -40,
                "legendPosition": "center"
            }}
            lineWidth={4}
            colors={'set2'}
            dotSize={8}
            dotColor="inherit:darker(0.3)"
            dotBorderWidth={2}
            dotBorderColor="#ffffff"
            enableDotLabel={true}
            dotLabel="y"
            dotLabelYOffset={-12}
            enableArea={true}
            enableGridX={false}
            animate={true}
            curve={'monotoneX'}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    "anchor": "bottom-right",
                    "direction": "column",
                    "translateX": 100,
                    "itemWidth": 80,
                    "itemHeight": 20,
                    "symbolSize": 12,
                    "symbolShape": "circle"
                }
            ]}
          />
          :
          <div>No entries in the time period selected!</div>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    allEntries: state.allEntries,
    user: state.user
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
