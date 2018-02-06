import React, { Component } from 'react'
import { connect } from 'react-redux'
import randomColor from 'randomcolor'
import TagCloud from 'react-tag-cloud'

function styles (largestPercent, currentPercent) {
  let stylesObj = {
    fontSize: (80 * currentPercent) / largestPercent
  }
  return stylesObj
}

class WordCloud extends Component {

  state = {
    nouns: [],
    largestPercent: 0
  }

  setNouns = () => {
    let updateNouns = this.props.type === 'all-entries' ? this.props.allEntriesNouns : this.props.singleEntryNouns
    if (updateNouns) {
      this.setState({
        nouns: updateNouns,
        largestPercent: updateNouns[0].percent
      })
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 10000)
    this.setNouns()
  }

  render() {
    return (
      <div className="app-outer">
        <div className="app-inner">
          <TagCloud
            className="tag-cloud"
            style={{
              fontFamily: `'Ubuntu Mono', monospace`,
              //fontSize: () => Math.round(Math.random() * 50) + 16,
              fontSize: 30,
              color: () => randomColor({
                hue: 'blue'
              }),
              padding: 5,
            }}>
            { this.state.nouns.length > 0 &&
              this.state.nouns.map(noun =>
              <div style={styles(this.state.largestPercent, noun.percent)} key={ noun.normal }>{ noun.normal }</div>
              )
            }
          </TagCloud>
        </div>
      </div>
    );
  }


}

const mapState = (state) => {
  return {
    allEntriesNouns: state.data.wcNouns ? state.data.wcNouns.slice(0, 60) : undefined
  }
}

export default connect(mapState)(WordCloud)
