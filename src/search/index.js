import React from 'react';
import ReactDom from 'react-dom';
import './search.less'
import logo from './images/webpack-logo.png'
import '../../common'
// import { a } from './tree-shaking'
class Search extends React.Component {
  constructor(p) {
    super(...arguments);

    this.state = {
      Text: null
    };
  }
  loadComponent = () => {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }
  render () {
    const { Text } = this.state;
    // const funcA = a()
    return <div className="search-text">
      {
        Text ? <Text /> : null
      }
      search text
      {/* {funcA} */}
      <img src={logo} onClick={this.loadComponent.bind(this)} />
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)