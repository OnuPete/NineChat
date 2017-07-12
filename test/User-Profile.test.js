import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import UserProfile from '../client/components/user-profile'

describe('UserProfile Component') {
  beforeEach(() => {
    const props = {currentChat: {
      username: "iramos",
      name: "ian",
      photo: "potato"
    }}
    const createWrapper = props => shallow(<UserProfile {...props} />)
  })
}
