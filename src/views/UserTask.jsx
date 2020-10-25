import React, { useState, useRef, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Form } from '@ui5/webcomponents-react/lib/Form'
import { FormGroup } from '@ui5/webcomponents-react/lib/FormGroup'
import { FormItem } from '@ui5/webcomponents-react/lib/FormItem'
import { Input } from '@ui5/webcomponents-react/lib/Input'
import { TextArea } from '@ui5/webcomponents-react/lib/TextArea'
import { Bar } from '@ui5/webcomponents-react/lib/Bar'
import { Button } from '@ui5/webcomponents-react/lib/Button'
import { Grid } from '@ui5/webcomponents-react/lib/Grid'
import { Toast } from '@ui5/webcomponents-react/lib/Toast'
import axios from 'axios'



const UserTask = props => {
    const { taskid } = useParams()

    const toast = useRef()

    const history = useHistory()

    const url = process.env.REACT_APP_API_COMPANY

    const [taskOrder, setTaskOrder] = useState(0)
    const [task, setTask] = useState('')
    const [hours, setHours] = useState(0)
    const [description, setDescription] = useState('')
    const [hoursCompleted, sethoursCompleted] = useState('')
    const [commentary, setCommentary] = useState('')
    const [resMsg, setResMsg] = useState('')

    useEffect(() => {
        axios.get(`${url}/UnlockedTasks?$filter=taskID eq ${taskid}`)
            .then(resp => {
                setTaskOrder(resp.data.value[0].taskOrder)
                setTask(resp.data.value[0].task)
                setHours(resp.data.value[0].taskOrder)
                setDescription(resp.data.value[0].description)
            })
    }, [])

    const save = () => {
        axios.post(`${url}/UserTask`, {
            user: {ID:'aadef333-01ae-45c9-9ebf-f0fd3095b989'},
            task: {ID:taskid},
            hoursCompleted: parseInt(hoursCompleted),
            commentary: commentary,
        }).then(resp => {
            setResMsg('Task saved!')
            toast.current.show()
        })
    }

    return (
        <Grid defaultSpan='XL12 L12 M12 S12' style={{ height: '100%' }}>
            <Form
                columnsL={1}
                columnsM={1}
                columnsS={1}
                columnsXL={1}
                labelSpanL={4}
                labelSpanM={2}
                labelSpanS={12}
                labelSpanXL={4}
                title="User Task"
                style={{ minHeight: '100%' }}
            >
                <FormGroup title="Task data">
                    <FormItem label="Order">
                        <Input
                            disabled={true}
                            highlight={false}
                            readonly={false}
                            required={false}
                            showSuggestions={false}
                            type="Number"
                            valueState="None"
                            onChange={(e) => { setTaskOrder(e.target.value) }}
                            value={taskOrder}
                        />
                    </FormItem>
                    <FormItem label="Task">
                        <Input
                            disabled={true}
                            highlight={false}
                            readonly={false}
                            required={false}
                            showSuggestions={false}
                            type="Text"
                            valueState="None"
                            onChange={(e) => { setTask(e.target.value) }}
                            value={task}
                        />
                    </FormItem>
                    <FormItem label="Hours required">
                        <Input
                            disabled={true}
                            highlight={false}
                            readonly={false}
                            required={false}
                            showSuggestions={false}
                            type="Number"
                            valueState="None"
                            onChange={(e) => { setHours(e.target.value) }}
                            value={hours}
                        />
                    </FormItem>
                    <FormItem label="Description">
                        <TextArea value={description} disabled={true} onChange={(e) => { setDescription(e.target.value) }}></TextArea>
                    </FormItem>
                </FormGroup>
                <FormGroup title="Hours Completed">
                    <FormItem label="Hours">
                        <Input
                            disabled={false}
                            highlight={false}
                            readonly={false}
                            required={false}
                            showSuggestions={false}
                            type="Number"
                            valueState="None"
                            onChange={(e) => { sethoursCompleted(e.target.value) }}
                        />
                    </FormItem>
                    <FormItem label="Commentary">
                        <TextArea value={description} onChange={(e) => { setCommentary(e.target.value) }}></TextArea>
                    </FormItem>
                </FormGroup>
            </Form>
            <Bar
                contentRight={
                    <>
                        <Button design="Emphasized" onClick={() => { save() }} style={{ marginRight: '8px' }}>Save</Button>
                        <Button design="Transparent" onClick={() => history.goBack()}>Cancel</Button>
                    </>
                }
                design="FloatingFooter"
                style={{ height: '44px' }}
            />
            <Toast ref={toast}>{resMsg}</Toast>
        </Grid>
    )
}

export default UserTask