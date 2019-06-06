import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../../../components/commons/Spinner';


describe('Spinner Component', () => {
  it('should render the Spinner Component', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
