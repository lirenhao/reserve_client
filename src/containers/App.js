import React from 'react'
import {connect} from 'react-redux'
import * as Ons from 'react-onsenui'
import Login from '../components/Login'
import List from '../components/List'
import Toolbar from '../components/Toolbar'
import * as actions from '../actions'
import ws from '../ws'

const App = (props) => {

    return (
        <Ons.Page
            renderToolbar={() =>
                <Ons.Toolbar>
                    <div className='center'>预约入厕</div>
                </Ons.Toolbar>
            }
            renderBottomToolbar={() =>
                <Toolbar user={props.user}
                         showTodo={props.list.indexOf(props.user) == -1}
                         showDone={props.list[0] == props.user}
                         handleTodo={() => ws.send(actions.todo(props.user))}
                         handleDone={() => ws.send(actions.done(props.user))}
                />
            }>

            <Login
                user={props.user}
                onLogin={props.login}
                onLogout={props.logout}
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