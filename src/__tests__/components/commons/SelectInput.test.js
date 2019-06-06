import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '../../../components/commons/SelectInput';
import { authors } from '../../../../tools/mockData';


describe('SelectInput Component', () => {
  it('should render the SelectInput Component', () => {
    const props = {
      name: '',
      label: '',
      onChange: jest.fn(),
      defaultOption: '',
      value: '',
      error: '',
      options: authors.map(author => ({
        value: author.id,
        text: author.name,
      })),
    };
    const wrapper = shallow(<SelectInput {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
