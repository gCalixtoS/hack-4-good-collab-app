import React, { useEffect, useState } from 'react'
import { Grid } from '@ui5/webcomponents-react/lib/Grid'
import Card from '../components/Card'
import Tasks from '../components/Tasks'
import { FilterBar } from '@ui5/webcomponents-react/lib/FilterBar'
import { FilterGroupItem } from '@ui5/webcomponents-react/lib/FilterGroupItem'
import { Select } from '@ui5/webcomponents-react/lib/Select'
import { Option } from '@ui5/webcomponents-react/lib/Option'

import "@ui5/webcomponents-icons/dist/icons/search"
import "@ui5/webcomponents-icons/dist/icons/add"

import axios from 'axios'

const User = props => {

    const [companies, setCompanies] = useState([])
    const [companyId, setCompanyId] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_COMPANY}/Companies`)
            .then(resp => {
                setCompanies(resp.data.value)
                setCompanyId(resp.data.value[0].ID)
                setCompanyName(resp.data.value[0].name)
            })
    }, [])

    useEffect(() => {
        if(companyId !== ''){
            axios.get(`${process.env.REACT_APP_API_COMPANY}/UnlockedTasks?$orderby=taskOrder asc&$filter=company_ID eq ${companyId}`)
                .then(resp => {
                    setTasks(resp.data.value)
                })
        }
            

    }, [companyId])

    return (
        <Grid defaultSpan='XL12 L12 M12 S12'>
            <FilterBar>
                <FilterGroupItem
                    groupName="default"
                    label="Company"
                    required={false}
                    visible
                    visibleInFilterBar
                    style={{ width: '100%' }}
                >
                    <Select style={{ width: '100%' }} onChange={(e) => {
                        setCompanyId(e.detail.selectedOption.dataset.id)
                        setTasks(e.detail.selectedOption.dataset.name)
                        alert(e.detail.selectedOption.dataset.name)
                    }}>
                        {
                            companies.map((company, i) => {
                                return (
                                    <Option key={company.ID} data-name={company.name} data-id={company.ID} selected={i === 0 ? 'true' : 'false'}>
                                        {company.name}
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </FilterGroupItem>
            </FilterBar>
            <Card heading="Tarefas" subheading={companyName} width="100%">
                <Tasks tasks={tasks} />
            </Card>
        </Grid>
    )
}

export default User