import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import  User  from "../views/User"
import  Company  from "../views/Company"
import  Task  from "../views/Task"
import  UserTask  from "../views/UserTask"


const routes = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={User}></Route>
                <Route exact path='/user' component={User}></Route>
                <Route exact path='/company' component={Company}></Route>
                <Route exact path='/task' component={Task}></Route>
                <Route exact path='/userTask/:taskid' component={UserTask}></Route>
            </Switch>
        </BrowserRouter>
    )
}

export default routes