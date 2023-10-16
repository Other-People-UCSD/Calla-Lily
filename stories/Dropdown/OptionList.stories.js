import OptionList from './OptionList';

import * as OptionStories from './Option.stories';

export default {
  component: OptionList,
  title: 'Dropdown/OptionList',
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
}

export const Default = {
  args: {
    options: [
      { ...OptionStories.Default.args.option, id: '1', title: 'Option 1' },
      { ...OptionStories.Default.args.option, id: '2', title: 'Option 2' },
      { ...OptionStories.Default.args.option, id: '3', title: 'Option 3' },
      { ...OptionStories.Default.args.option, id: '4', title: 'Option 4' },
      { ...OptionStories.Default.args.option, id: '5', title: 'Option 5' },
      { ...OptionStories.Default.args.option, id: '6', title: 'Option 6' },
    ],
  },
};


export const SelectedTasks = {
  args: {
    options: [
      { ...OptionStories.Default.args.option, id: '1', title: 'Option 1' },
      { ...OptionStories.Default.args.option, id: '2', title: 'Option 2', state: 'SELECTED' },
      { ...OptionStories.Default.args.option, id: '3', title: 'Option 3' },
      { ...OptionStories.Default.args.option, id: '4', title: 'Option 4' },
      { ...OptionStories.Default.args.option, id: '5', title: 'Option 5' },
      { ...OptionStories.Default.args.option, id: '6', title: 'Option 6', state: 'SELECTED' },
    ],
  },
}