// @flow

import * as React from 'react';
import injectSheet from 'react-jss'
import Tree from './Tree';

type Props = {
  classes: Object,
  Tree: React.Node,
};

const DirectoryBrowser = (props: Props) => { 
  const { classes } = props;

  return (
    <div className={classes.directoryBrowser}>
      <ul className={classes.wrapper}>
        <Tree />
      </ul>
    </div>
  )
}

const styles = {
  directoryBrowser: {
    margin: '0 auto',
    display: 'flex',
  },
  wrapper: {
    width: '350px',
    backgroundColor: '#eee',
    padding: '15px',
    listStyleType: 'none',
    margin: '0',
    height: '100vh',
  },
};

export default injectSheet(styles)(DirectoryBrowser);