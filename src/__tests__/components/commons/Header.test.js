import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/commons/Header';


describe('Header Component', () => {
  it('should render the Header Component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
});
