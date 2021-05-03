import React, { ReactElement } from 'react';
import {
  Container, Grid, Hidden, IconButton,
} from '@material-ui/core';
import { ExpandLessRounded } from '@material-ui/icons';

import { useHistory } from 'react-router-dom';
import { MusicControls } from '../MusicControls';
import { MusicSlider } from '../MusicSlider';
import { useStyles } from './styles';
import { useMusicPlayerMachine } from '../../hooks';
import { MusicName } from '../MusicName';

export function BottomControlsBar(): ReactElement {
  const styles = useStyles();
  const history = useHistory();
  const [current] = useMusicPlayerMachine();

  const {
    context: {
      currentPlayingMusic,
    },
  } = current;

  return (
    <div className={styles.root}>
      <Container>
        <Grid container alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            justify="space-between"
            lg={4}
            xs={12}
            sm={7}
          >
            <Grid item xs={1}>
              {' '}
              <IconButton
                disabled={
                  !currentPlayingMusic
                }
                onClick={
                  () => {
                    history.push(`/play/${currentPlayingMusic?.id}`);
                  }
                }
                className={styles.expandBtn}
              >
                <ExpandLessRounded />
              </IconButton>
            </Grid>
            <Grid item xs={10} style={{ marginLeft: '5px', boxSizing: 'border-box' }}>
              <MusicName
                title={currentPlayingMusic?.title}
                artists={currentPlayingMusic?.artists}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item sm={5} lg={4}>
            <Hidden only={['xs']}>
              <MusicControls size="small" />
            </Hidden>
          </Grid>
          <Grid item lg={4}>
            <Hidden only={['xs', 'sm', 'md']}>
              <MusicSlider size="small" />
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
