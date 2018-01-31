import React, { Component } from 'react'
import { connect } from 'react-redux'
import CloudItem from './CloudItem'
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
    }, 20000);
  }

  render() {
    let largestPercent = 0
    let nouns = []
    if (this.props.nouns) {
      largestPercent = this.props.nouns[0].percent
      nouns = this.props.nouns
    }

    return (
      <div className='app-outer'>
        <div className='app-inner'>
          <TagCloud
            className='tag-cloud'
            style={{
              fontFamily: 'sans-serif',
              //fontSize: () => Math.round(Math.random() * 50) + 16,
              fontSize: 30,
              color: () => randomColor({
                hue: 'blue'
              }),
              padding: 5,
            }}>
            { nouns !== undefined
              ?
              nouns.map(noun =>
              <div style={styles(largestPercent, noun.percent)} key={ noun.normal }>{ noun.normal }</div>
              )
              : <div /> }
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

// <div
//               style={{
//                 fontFamily: 'serif',
//                 fontSize: 40,
//                 fontStyle: 'italic',
//                 fontWeight: 'bold',
//                 color: randomColor()
//               }}>Futurama</div>
//             <CloudItem text="Custom item, Hover me!" />
//             <CloudItem text="Custom item 2, Hover me!" />
//             <div style={styles.large}>Transformers</div>
//             <div style={styles.large}>Simpsons</div>
//             <div style={styles.large}>Dragon Ball</div>
//             <div style={styles.large}>Rick & Morty</div>
//             <div style={{fontFamily: 'courier'}}>He man</div>
//             <div style={{fontSize: 30}}>World trigger</div>
//             <div style={{fontStyle: 'italic'}}>Avengers</div>
//             <div style={{fontWeight: 200}}>Family Guy</div>
//             <div style={{color: 'green'}}>American Dad</div>
//             <div className="tag-item-wrapper">
//               <div>
//                 Hover Me Please!
//               </div>
//               <div className="tag-item-tooltip">
//                 HOVERED!
//               </div>
//             </div>
//             <div>Gobots</div>
//             <div>Thundercats</div>
//             <div>M.A.S.K.</div>
//             <div>GI Joe</div>
//             <div>Inspector Gadget</div>
//             <div>Bugs Bunny</div>
//             <div>Tom & Jerry</div>
//             <div>Cowboy Bebop</div>
//             <div>Evangelion</div>
//             <div>Bleach</div>
//             <div>GITS</div>
//             <div>Pokemon</div>
//             <div>She Ra</div>
//             <div>Fullmetal Alchemist</div>
//             <div>Gundam</div>
//             <div>Uni Taisen</div>
//             <div>Pinky and the Brain</div>
//             <div>Bobs Burgers</div>
//             <div style={styles.small}>Dino Riders</div>
//             <div style={styles.small}>Silverhawks</div>
//             <div style={styles.small}>Bravestar</div>
//             <div style={styles.small}>Starcom</div>
//             <div style={styles.small}>Cops</div>
//             <div style={styles.small}>Alfred J. Kwak</div>
//             <div style={styles.small}>Dr Snuggles</div>
