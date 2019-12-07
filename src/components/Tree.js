// @flow

import * as React from 'react';
import TreeNode from './TreeNode';
import values from 'lodash.values';
import injectSheet from 'react-jss'

type State = {
  breadcrumbs: string,
  error: any,
  isLoaded: boolean,
  nodes: Object,
}

type Props = {
  classes: Object,
}

class Tree extends React.Component<Props, State> {

  state = {
    breadcrumbs: '',
    nodes: {},
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch("http://www.mocky.io/v2/5d0553893200007b00d78c7a?mocky-delay=300ms")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            nodes: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
  }

  getRootNodes = () => {
    const { nodes } = this.state;

    return values(nodes).filter(node => node.isRoot === true);
  }

  getChildNodes = (node: Object) => {
    const { nodes } = this.state;

    if (!node.children) return [];

    return node.children.map(path => nodes[path]);
  }

  getActiveNodes = (activeNodePath: string): Array<string> => {
    const activeNodePaths: Array<any> = activeNodePath.split('/');

    return activeNodePaths.reduce((acc, currentValue) => {
      const accLength: number = acc.length;

      if (accLength === 0) {
        return [`${acc}/${currentValue}`];
      }

      return [...acc, `${acc[accLength-1]}/${currentValue}`];
    });
  }

  updateBreadcrumbs = (activeNodePath: string) => {
    const { nodes } = this.state;
    const activeNodes: Array<string> = this.getActiveNodes(activeNodePath);
    const breadcrumbs: string = activeNodes.map(nodePath => nodes[nodePath].title).join(' / ');

    this.setState({ breadcrumbs: `/ ${breadcrumbs}` });
  }

  onToggle = (node: Object) => {
    const { nodes } = this.state;

    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes }, () => this.updateBreadcrumbs(node.path));
  }

  getTree = () => {
    const rootNodes: Array<Object> = this.getRootNodes();

    return rootNodes.map((node, i) => (
      <TreeNode
        key={i}
        node={node}
        getChildNodes={this.getChildNodes}
        onToggle={this.onToggle}
      />
    ));
  }

  render() {
    const { breadcrumbs, isLoaded, error } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.breadcrumbs}>{breadcrumbs}</div>
        {error && error}
        {isLoaded ? this.getTree() : 'Loading...'}
      </React.Fragment>
    )
  }
}

const styles = {
  breadcrumbs: {
    fontSize: '12px',
    padding: '5px 15px',
    minHeight: '20px',
  },
};

export default injectSheet(styles)(Tree);