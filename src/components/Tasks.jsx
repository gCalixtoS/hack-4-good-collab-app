import React from 'react'
import {useHistory} from 'react-router-dom'
import '../styles/tasks.css'
import { Grid } from '@ui5/webcomponents-react/lib/Grid'
import { Icon } from '@ui5/webcomponents-react/lib/Icon'
import { Label } from '@ui5/webcomponents-react/lib/Label'

import "@ui5/webcomponents-icons/dist/icons/locked"

const Tasks = props => {

    const history = useHistory()

    if (props.tasks.length === 0) {
        return (
            <Grid defaultSpan='XL1 L1 M1 S1' style={{ padding: '2%' }}>
                <Label>There are no tasks for the company</Label>
            </Grid>
        )
    } else {
        return (
            <>
                <Grid defaultSpan='XL1 L1 M1 S1' style={{ padding: '2%' }}>
                    {
                        props.tasks.map((task, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {
                                        i !== 0 && (
                                            <div class="arrow right"></div>
                                        )
                                    }
                                    <div class="start" style={{ marginLeft: i === 0 ? '0%' : '25%' }} onClick={() => history.push(`/userTask/${task.taskID}`)}>
                                        { task.task } {"\n"}
                                        {task.taskApproved === 1 ? '' : <Icon name="locked" style={{color:"white"}}/>}
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </Grid>
            </>
        )
    }

}

export default Tasks