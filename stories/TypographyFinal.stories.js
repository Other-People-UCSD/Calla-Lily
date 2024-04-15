import TypoFamily from './TypographyFinal';
import * as tokens from './_variables.js';

export default {
  component: TypoFamily,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  title: 'TypographyStyleguide',
  tags: ['autodocs'],
}

export const Arial = {
  args: {
    familyName: 'Arial',
    family: tokens.OpmFontArial,
    typoFamilyItems: [
      { size: '16px', usage: 'Body', example: 'Lorem ipsum dolor sit amet' },
      { size: '4rem', usage: 'Titles', example: 'SPRING 2023' },
      { size: '2rem', usage: 'Landing Page h1s', example: 'Lorem ipsum dolor sit amet' },
      { size: '1.4rem', usage: 'Submission Page subheadings', example: 'Lorem ipsum dolor sit amet' },
      { size: '1.2rem', usage: 'Post titles, Genre nav', example: 'Lorem ipsum dolor sit amet' },
      { size: '1.1rem', usage: 'Long post titles', example: 'Lorem ipsum dolor sit amet' },
    ],
  }
};

export const Basier = {
  args: {
    familyName: 'Basier Circle Mono',
    family: tokens.OpmFontBasier,
    typoFamilyItems: [
      { size: '0.8rem', usage: 'Footnotes', example: '[1] [2] [3]' },
      { size: '0.8rem', usage: 'Subtext (Genre, Copyright)', example: 'Lorem ipsum dolor sit amet' },
    ],
  }
};

export const Apple = {
  args: {
    familyName: 'Apple System',
    family: tokens.OpmFontApple,
    typoFamilyItems: [
      { size: '16px', usage: 'Post content', example: 'Lorem ipsum dolor sit amet' },
    ],
  }
}

export const Helvetica = {
  args: {
    familyName: 'Helvetica',
    family: tokens.OpmFontHelvetica,
    typoFamilyItems: [
      { size: '16px', usage: 'Post content', example: 'Lorem ipsum dolor sit amet' },
    ],
  }
}

export const B612Mono = {
  args: {
    familyName: 'B612Mono',
    family: tokens.OpmFontMonospace,
    typoFamilyItems: [
      { size: '16px', usage: 'Post content', example: 'Lorem ipsum dolor sit amet' },
    ],
  }
}