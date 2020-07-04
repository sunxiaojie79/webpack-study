import React from 'react';
import ReactDom from 'react-dom';
import largeNumber from 'large-number-666';
import './search.less';
import logo from './images/webpack-logo.png';
import '../../common';
// import { a } from './tree-shaking'
// eslint-disable-next-line no-unused-vars
class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      Text: null,
    };
  }

  loadComponent = () => {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const { Text } = this.state;
    // const funcA = a()
    const addResult = largeNumber('999', '1');
    return (
      <div className="search-text">
        {
          Text ? <Text /> : null
        }
        search text
        {/* {funcA} */}
        {addResult}
        <img src={logo} alt="123" onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root'),
);
