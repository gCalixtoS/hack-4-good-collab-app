import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"

import { Table } from '@ui5/webcomponents-react/lib/Table'
import { TableColumn } from '@ui5/webcomponents-react/lib/TableColumn'
import { TableRow } from '@ui5/webcomponents-react/lib/TableRow'
import { TableCell } from '@ui5/webcomponents-react/lib/TableCell'
import { Label } from '@ui5/webcomponents-react/lib/Label'
import { Grid } from '@ui5/webcomponents-react/lib/Grid'
import { Button } from '@ui5/webcomponents-react/lib/Button'
import { ColumnChart } from '@ui5/webcomponents-react-charts/lib/ColumnChart'

import axios from 'axios'

import "@ui5/webcomponents-icons/dist/icons/add"

import Card from '../components/Card'

const Company = props => {
    const history = useHistory()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_COMPANY}/Tasks?$orderby=taskOrder asc&$filter=company_ID eq 483b33e5-6954-428c-8a79-db4a48b8f2c4`)
            .then(resp => {
                setTasks(resp.data.value)
            })
    }, [])

    return (
        <>
            <Grid defaultSpan='XL6 L6 M6 S6'>
                <Card
                    heading="Tasks"
                    width="100%"
                >
                    <Grid defaultSpan='XL12 L12 M12 S12' style={{ padding: '1%', textAlign: 'right' }}>
                        <Button design="Emphasized" icon="add" onClick={() => history.push('/task')}>
                        </Button>
                    </Grid>
                    <Table
                        columns={<>
                            <TableColumn demandPopin={false} minWidth={Infinity} style={{ width: '12rem' }}>
                                <Label required={false} showColon={false} wrap={false}>Order</Label>
                            </TableColumn>
                            <TableColumn demandPopin={false} minWidth={800} popinText="Supplier">
                                <Label required={false} showColon={false} wrap={false}>Task</Label>
                            </TableColumn>
                            <TableColumn demandPopin minWidth={600} popinText="Dimensions">
                                <Label required={false} showColon={false} wrap={false}>Description</Label>
                            </TableColumn>
                            <TableColumn demandPopin minWidth={600} popinText="Weight">
                                <Label required={false} showColon={false} wrap={false}>Required amount of hours</Label>
                            </TableColumn>
                        </>}
                        onPopinChange={function noRefCheck() { }}
                        onRowClick={function noRefCheck() { }}
                        showNoData={true}
                        noDataText="There are no tasks."
                        stickyColumnHeader={false}
                    >
                        {
                            tasks.map((task, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Label>{task.taskOrder}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <Label>{task.task}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <Label>{task.description}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <Label>{task.hours}</Label>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </Table>
                </Card>
                <Card
                    heading="Donated hours"
                    width="100%"
                >
                    <ColumnChart
                        chartConfig={{
                            gridHorizontal: true,
                            gridStroke: 'var(--sapList_BorderColor)',
                            gridVertical: false,
                            legendHorizontalAlign: 'left',
                            legendPosition: 'bottom',
                            resizeDebounce: 250,
                            xAxisVisible: true,
                            yAxisVisible: false,
                            zoomingTool: false
                        }}
                        dataset={[
                            {
                                name: 'Voluntariado',
                                users: 100
                            },
                            {
                                name: 'Reciclagem',
                                users: 230
                            },
                            {
                                name: 'Doação',
                                users: 240
                            }
                        ]}
                        dimensions={[
                            {
                                accessor: 'name'
                            }
                        ]}
                        measures={[
                            {
                                accessor: 'users',
                                color: '#db1f77'
                            }
                        ]}
                        onDataPointClick={function noRefCheck() { }}
                        onLegendClick={function noRefCheck() { }}
                        style={{
                            height: '40vh',
                            width: '95%'
                        }}
                    />
                </Card>
            </Grid>
        </>

    )
}

export default Company