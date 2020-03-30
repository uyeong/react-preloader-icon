import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Preloader from './Preloader';
import Oval from './loaders/Oval';

describe('Preloader', () => {
  it('with Oval', () => {
    const wrapper = shallow(<Preloader use={Oval} />);
    expect(wrapper).to.contain(<Oval strokeWidth={3} strokeColor="#f0ad4e" duration={800} />);
  });
});
