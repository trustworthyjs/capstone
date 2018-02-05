/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchBar from './SearchBar'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SearchBar', () => {

  it('correctly sorts array of entries', () => {
    expect(3).to.be.equal(2)
  })
})
