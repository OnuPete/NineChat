import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import App from '../client/components/App'


describe('(Component) App', () => {
  it('renders App', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.have.length(1);
  });
});

describe()
