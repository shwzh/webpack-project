'use strict';

import React from 'react'
import ReactDom from 'react-dom'
import '../../common'
import { a } from './tree-shaking';
import './search.less'

if(0) a()
class Search extends React.Component {
    render() {
        const funcA = a()
    return <div className='searchText'>{funcA}搜索文字 见证多页面打包 我是第二个页面search</div>;
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)