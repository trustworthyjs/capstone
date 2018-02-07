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
    return (
      <div>
        {this.props.nouns ?
          <div className={this.props.isSingleEntryView ? "app-outer-single" : "app-outer"}>
            <div className={this.props.isSingleEntryView ? "app-inner-single" : "app-inner"}>
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
            </div>
          </div> :
          <div className="our-loader">
            <div className="ui active inline loader" />
          </div>
        }
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  let nouns, largestPercent
  if (state.data.wcNouns && ownProps.singleEntryNouns) {
    if (ownProps.type === 'all-entries') {
      nouns = state.data.wcNouns.slice(0, 60)
    } else {
      nouns = ownProps.singleEntryNouns.slice(0, 30)
    }
    if (nouns[0]) {
      largestPercent = nouns[0].percent
    }
  }
  return {
    nouns,
    largestPercent
  }
}

export default connect(mapState)(WordCloud)
