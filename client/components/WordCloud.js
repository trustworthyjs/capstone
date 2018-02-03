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
    this.setState({
      nouns: this.props.nouns,
      largestPercent: this.props.nouns[0].percent
    })
  }

  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 20000)
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
    nouns: state.data.wcNouns ? state.data.wcNouns.slice(0, 60) : undefined
  }
}

export default connect(mapState)(WordCloud)
