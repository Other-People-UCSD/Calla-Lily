import PostCard from './PostCard';

export default {
  component: PostCard,
  title: 'Card/PostCard',
  tags: ['autodocs'],
}

export const Default = {
  args: {
    slug: "/",
    title: "Card title",
    contributor: "Contributor",
    collection: "1",
    tags: ["Poetry"],
    thumbnail: null,
  },
};