import Option from './Option';

export default {
  component: Option,
  title: 'Dropdown/Option',
  tags: ['autodocs'],
}

export const Default = {
  args: {
    option: {
      id: '1',
      title: 'Test Option',
      state: 'UNSELECTED',
    }
  }
};

export const Selected = {
  args: {
    option: {
      ...Default.args.option,
      state: 'SELECTED',
    },
  },
};