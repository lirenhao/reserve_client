import React from 'react'
import * as ons from 'onsenui'
import * as Ons from 'react-onsenui'

const Toolbar = (props) => {
    return (
        <Ons.BottomToolbar>
            <section style={{textAlign: 'center'}}>
                {props.showTodo ?
                    <Ons.Button modifier='quiet large' onClick={() => {
                        if (props.user)
                            props.handleTodo()
                        else
                            ons.notification.alert('先登录')
                    }}>
                        预约
                    </Ons.Button> :
                    <Ons.Button modifier='quiet large' onClick={() => {
                        if (props.user)
                            props.handleDone()
                        else
                            ons.notification.alert('先登录')
                    }}>
                        {props.showDone ? '完成' : '取消'}
                    </Ons.Button>
                }
            </section>
        </Ons.BottomToolbar>
    )
}

Toolbar.propTypes = {
    user: React.PropTypes.string.isRequired,
    showTodo: React.PropTypes.bool.isRequired,
    showDone: React.PropTypes.bool.isRequired,
    handleTodo: React.PropTypes.func.isRequired,
    handleDone: React.PropTypes.func.isRequired
}

export default Toolbar