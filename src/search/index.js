import React from 'react';
import ReactDom from 'react-dom';
import './search.less'
import logo from './images/webpack-logo.png'
import '../../common'
import { a } from './tree-shaking'
class Search extends React.Component {  
  render () {
    const funcA = a()
    return <div className="search-text">
      search text{funcA}
              <img src={logo}/>
            </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)