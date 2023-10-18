import SearchList from './SearchList';

export default {
  component: SearchList,
  title: 'SearchList',
  decorators: [(story) => <div style={{ padding: '3rem', backgroundColor: 'black' }}>{story()}</div>],
  tags: ['autodocs'],
}

const defaultItem = {
  slug: '/',
  title: 'title',
  contributor: 'contributor',
  tags: ['poetry']
}

const defaultItemList = [
  { ...defaultItem },
  { ...defaultItem, title: 'title 2' },
];

export const Default = {
  args: { items: defaultItemList },
};
