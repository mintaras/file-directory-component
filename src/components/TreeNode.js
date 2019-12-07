// @flow

import { FaCaretRight } from 'react-icons/fa';
import injectSheet from 'react-jss'
import React from 'react';

type Props = {
  classes: Object,
  getChildNodes: Function,
  node: Object,
  onToggle: Function,
};

class TreeNode extends React.Component<Props> {

  getNodes = () => {
    const { classes, node, getChildNodes } = this.props;

    return getChildNodes(node).map((childNode, i) => (
      <ul key={i} className={classes.nodeWrapper}>
        <TreeNode 
          {...this.props}
          node={childNode}
        />
      </ul>
    ))
  }

  render() {
    const { classes, node, onToggle } = this.props;

    return (
      <React.Fragment>
        <li className={classes.node} onClick={() => onToggle(node)}>
          <FaCaretRight className={`${classes.icon} ${node.isOpen && classes.isOpen}`} />
          <span>
            { node.title }
          </span>
        </li>

        { node.isOpen && this.getNodes() }
      </React.Fragment>
    );
  }
}

const styles = {
  node: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5px 8px',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    }, 
  },
  nodeWrapper: {
    padding: '0 0 0 15px',
  },
  icon: {
    margin: '3px 3px 0 0',
    fontSize: '12px',
  },
  isOpen: {
    transform: 'rotate(45deg)',
  },
};

export default injectSheet(styles)(TreeNode);
