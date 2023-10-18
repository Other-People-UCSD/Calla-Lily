import Typography from './Typography';

export default {
  component: Typography,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  title: 'Typography',
  tags: ['autodocs'],
}

const DefaultTypography = {
  size: '12px',
  weight: 'normal',
  color: '#000',
  family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}
const basierFamily = 'basier_circlemonoregular';
const monospaceFamily = 'monospace, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const DefaultTypographyList = [
  { ...DefaultTypography},
  { ...DefaultTypography, size: '14px'},
  { ...DefaultTypography, size: '16px'},
  { ...DefaultTypography, size: '18px'},
  { ...DefaultTypography, size: '24px'},
  { ...DefaultTypography, size: '28px'},
  { ...DefaultTypography, size: '32px'},
  { ...DefaultTypography, size: '40px'},
]

export const Apple = {
  args: { typographyList: DefaultTypographyList, },
};

export const Basier = {
  args: {
    typographyList: DefaultTypographyList.map(typography => {
      return {...typography, family: basierFamily}
    }),
  },
}

export const Monospace = {
  args: {
    typographyList: DefaultTypographyList.map(typography => {
      return {...typography, family: monospaceFamily}
    }),
  },
}

export const AppleDark = {
  args: {
    typographyList: DefaultTypographyList.map(typography => {
      return {...typography, color: 'white'}
    }),
  },
  decorators: [
    (story) => <div style={{ backgroundColor: 'black', color: 'black'}}>{story()}</div>
  ]
};


export const Gold = {
  args: {
    typographyList: [
      { ...DefaultTypography, color: '#ff9900'},
      { ...DefaultTypography, size: '14px', color: '#ff9900'},
      { ...DefaultTypography, size: '16px', color: '#ff9900'},
      { ...DefaultTypography, size: '18px', color: '#ff9900'},  
      { ...DefaultTypography, family: basierFamily, color: '#ff9900'},
      { ...DefaultTypography, size: '14px', family: basierFamily, color: '#ff9900'},
      { ...DefaultTypography, size: '16px', family: basierFamily, color: '#ff9900'},
      { ...DefaultTypography, size: '18px', family: basierFamily, color: '#ff9900'},
      { ...DefaultTypography, family: monospaceFamily, color: '#ff9900'},
      { ...DefaultTypography, size: '14px', family: monospaceFamily, color: '#ff9900'},
      { ...DefaultTypography, size: '16px', family: monospaceFamily, color: '#ff9900'},
      { ...DefaultTypography, size: '18px', family: monospaceFamily, color: '#ff9900'},
    ]
  }
}