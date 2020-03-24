'use strict';

import React from 'react'
import ReactDom from 'react-dom'
import '../../common'
import './search.less'

class Search extends React.Component {
    render() {
        return <div className='searchText'>搜索文字 见证多页面打包 我是第二个页面search</div>;
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)