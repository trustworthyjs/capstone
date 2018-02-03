import React from 'react'
import { Icon } from 'semantic-ui-react'

const footer = () => {
  return (
    <div className="footer">
      <div className="footer-text">
      A capstone project developed at <img style={{height: '1rem'}} src="/images/Fullstack.png"/> <a target="_blank" href="https://www.fullstackacademy.com/">Fullstack Academy</a> <br />
      Many thanks to our fellows and instructors <br /><br />
      <a target="_blank" href="https://github.com/trustworthyjs/capstone"><Icon name="github" size='large' /></a>
      <br /><br /> by
      <a target="_blank" href="https://www.linkedin.com/in/niharika-narain/"> Niharika Narain</a> , <a target="_blank" href="https://www.linkedin.com/in/jintingw/">JT Wang</a>, <a target="_blank" href="https://www.linkedin.com/in/daniel-reed-002485b8/">Daniel Reed</a>, and <a target="_blank" href="https://www.linkedin.com/in/alec-davidson/">Alec Davidson</a>
      </div>
    </div>
  )
}

export default footer
