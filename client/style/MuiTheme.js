import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        background: '#ffffff',
      }
    },
    MuiExpansionPanel: {
      root: {
        borderRadius: '4px !important',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
        border: '1px solid #eaf0f4',
        margin: '16px 0',
        '&:before': {
          display: 'none',
        },
      },
    },
    MuiExpansionPanelSummary: {
      root: {
        borderBottom: '1px solid #eaf0f4',
        '&$expanded': {
          minHeight: 48,
        },
      },
      content: {
        margin: '0',
        '&$expanded': {
          margin: '0',
        },
      }
    },
    MuiFab: {
      primary: {
        backgroundColor: '#4b4d53',
        '&:hover': {
          backgroundColor: '#4b4d53',
        },
      },
      secondary: {
        backgroundColor: '#3b86ff',
      },
    },
    MuiFormControlLabel: {
      root: {
        '&.full-width': {
          marginLeft: 0,
          marginRight: 0,
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          display: 'flex',
          width: '100%',
        },
      },
    },
  },
  typography: {
    color: '#525252',
    h1: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: '#525252',
    },
    h2: {
      fontSize: '1.6rem',
      fontWeight: 600,
      color: '#525252',
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#525252',
    },
    subtitle1: {
      fontSize: '1.2rem',
      lineHeight: 1.2,
    },
  },
})

export default theme
