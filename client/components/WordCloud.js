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

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 10000)
  }

  render() {
    console.log('this props nouns: ', this.props.nouns)
    return (
      <div className="app-outer">
        {this.props.nouns ?
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
            {
              this.props.nouns.map(noun =>
              (<div
                style={styles(this.props.largestPercent, noun.percent)}
                key={ noun.normal }>
                { noun.normal }
              </div>))
            }
          </TagCloud>
        </div> :
          <h1>Word Cloud is loading... </h1>
        }
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  let nouns, largestPercent
  if (state.data.wcNouns) {
    if (ownProps.type === 'all-entries') {
      nouns = state.data.wcNouns.slice(0, 60)
    } else {
      nouns = ownProps.singleEntryNouns.slice(0, 30)
    }
    largestPercent = nouns[0].percent
  }
  return {
    nouns,
    largestPercent
  }
}

export default connect(mapState)(WordCloud)
