import React from 'react'
import * as ons from 'onsenui'
import * as Ons from 'react-onsenui'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {user: props.user}
    }

    render() {
        if (this.props.user == '')
            return (
                <div style={{textAlign: 'center'}}>
                    <br/>
                    <Ons.Input type='text' modifier='underbar' placeholder='用户名'
                               onChange={(event) => this.setState({user: event.target.value})}/>
                    <Ons.Button modifier='quiet' onClick={() => {
                        if (this.state.user == '')
                            ons.notification.alert('用户名不能为空')
                        else
                            this.props.onLogin(this.state.user)
                    }}>
                        登录
                    </Ons.Button>
                </div>
            )
        else
            return (
                <div style={{textAlign: 'center'}}>
                    <br/>
                    {this.props.user}
                    <Ons.Button modifier='quiet' onClick={() => this.props.onLogout(this.props.user)}>
                        注销
                    </Ons.Button>
                </div>
            )
    }
}

Login.propTypes = {
    user: React.PropTypes.string.isRequired,
    onLogin: React.PropTypes.func.isRequired,
    onLogout: React.PropTypes.func.isRequired
}

export default Login