import React from 'react'
import * as Ons from 'react-onsenui'

class List extends React.Component {
    render() {
        return (
            <Ons.List
                dataSource={this.props.list}
                renderRow={(row, index) =>
                    <Ons.ListItem key={index}>
                        <div className='center'>
                            {row}
                        </div>
                        <div className='right'>
                            {index == 0 ? '正在使用' : '正在排队'}
                        </div>
                    </Ons.ListItem>
                }
                renderHeader={() =>
                    <Ons.ListHeader>
                        {this.props.list.length == 0 ? '没人' : '排队等待'}
                    </ Ons.ListHeader >
                }
            />
        )
    }
}

List.propTypes = {
    list: React.PropTypes.array.isRequired
}

export default List