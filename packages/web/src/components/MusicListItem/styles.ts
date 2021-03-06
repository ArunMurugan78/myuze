import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: (
    { height, width }
    : { height: number, width: number },
  ) => ({
    padding: '2px',
    boxSizing: 'border-box',
    height: `${height}`,
    width: `${width}`,
    maxWidth: '90vw',
  }),
  card: (
    { isCurrentPlayingMusic }
    : { isCurrentPlayingMusic: boolean, height: number, width: number },
  ) => ({
    backgroundColor: 'rgb(var(--bg-color-lighter))',
    padding: '20px',
    textOverflow: 'ellipsis',
    color: 'rgb(var(--primary-bright))',
    fontWeight: isCurrentPlayingMusic ? 'bold' : 'normal',
    boxSizing: 'border-box',
    opacity: isCurrentPlayingMusic ? 1 : 0.8,
    '&:hover, &:focus': {
      opacity: 1,
    },
    cursor: 'pointer',
  }),
  artists: {
    fontWeight: 'normal',
    fontSize: '14px',
    marginTop: '5px',
    color: 'rgb(var(--primary-dark))',
  },
});
