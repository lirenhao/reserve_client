import React from 'react'
import {connect} from 'react-redux'
import * as Ons from 'react-onsenui'
import Login from '../components/Login'
import List from '../components/List'
import * as actions from '../actions'
import Ws from '../ws'

const App = (props) => {

    return (
        <Ons.Page
            renderToolbar={() =>
                <Ons.Toolbar>
                    <div className='center'>预约入厕</div>
                </Ons.Toolbar>
            }
            renderBottomToolbar={() =>
                <Ons.BottomToolbar>
                    <section style={{textAlign: 'center'}}>
                        {props.list.filter((user) => user == props.user).length == 0 ?
                            <Ons.Button modifier='quiet large' onClick={() => Ws.send(actions.todo(props.user))}>
                                预约
                            </Ons.Button> :
                            <Ons.Button modifier='quiet large' onClick={() => Ws.send(actions.done(props.user))}>
                                {props.list[0] == props.user ? '完成' : '取消'}
                            </Ons.Button>
                        }
                    </section>
                </Ons.BottomToolbar>
            }>
            <Login
                user={props.user}
                onLogin={(user) => {
                    Ws.send(actions.login(user))
                    props.login(user)
                }}
                onLogout={(user) => {
                    Ws.send(actions.logout(user))
                    props.logout(user)
                }}
            />
            <List list={props.list}/>
        </Ons.Page>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    list: state.list
})

export default connect(mapStateToProps, {login: actions.login, logout: actions.logout})(App)