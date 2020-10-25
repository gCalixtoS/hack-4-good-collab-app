import React, {useState, useRef} from 'react'
import { useHistory } from "react-router-dom"

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

const Task = props => {
    const history = useHistory()
    const toast = useRef()

    const url = process.env.REACT_APP_API_COMPANY

    const [taskOrder, setTaskOrder] = useState(0)
    const [task, setTask] = useState('')
    const [hours, setHours] = useState(0)
    const [description, setDescription] = useState('')
    const [resMsg, setResMsg] = useState('')

    const save = () => {
        axios.post(`${url}/Tasks`, {
            taskOrder: parseInt(taskOrder),
            description: description,
            hours: parseInt(hours),
            task: task,
            company: {ID:'483b33e5-6954-428c-8a79-db4a48b8f2c4'}
        }).then(resp => {
            setResMsg('Task saved!')
            toast.current.show()
        })
    }

    return (
        <>
            <Grid defaultSpan='XL12 L12 M12 S12' style={{height:'100%'}}>
                <Form
                    columnsL={2}
                    columnsM={2}
                    columnsS={2}
                    columnsXL={2}
                    labelSpanL={4}
                    labelSpanM={2}
                    labelSpanS={12}
                    labelSpanXL={4}
                    title="New Task"
                    style={{minHeight:'100%'}}
                >
                    <FormGroup title="Task data">
                        <FormItem label="Order">
                            <Input
                                disabled={false}
                                highlight={false}
                                readonly={false}
                                required={false}
                                showSuggestions={false}
                                type="Number"
                                valueState="None"
                                onChange={(e) => {setTaskOrder(e.target.value)}}
                            />
                        </FormItem>
                        <FormItem label="Task">
                            <Input
                                disabled={false}
                                highlight={false}
                                readonly={false}
                                required={false}
                                showSuggestions={false}
                                type="Text"
                                valueState="None"
                                onChange={(e) => {setTask(e.target.value)}}
                            />
                        </FormItem>
                        <FormItem label="Hours required">
                            <Input
                                disabled={false}
                                highlight={false}
                                readonly={false}
                                required={false}
                                showSuggestions={false}
                                type="Number"
                                valueState="None"
                                onChange={(e) => {setHours(e.target.value)}}
                            />
                        </FormItem>
                        <FormItem label="Description">
                            <TextArea onChange={(e) => {setDescription(e.target.value)}}></TextArea>
                        </FormItem>
                    </FormGroup>
                </Form>
                <Bar
                    contentRight={
                        <>
                            <Button design="Emphasized" onClick={() => {save()}} style={{marginRight: '8px'}}>Save</Button>
                            <Button design="Transparent" onClick={() => history.goBack()}>Cancel</Button>
                        </>
                    }
                    design="FloatingFooter"
                    style={{ height: '44px' }}
                />
            </Grid>
            <Toast ref={toast}>{resMsg}</Toast>
        </>
    )
}

export default Task