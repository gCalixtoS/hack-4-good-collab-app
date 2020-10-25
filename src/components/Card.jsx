import React from 'react'
import { Card } from '@ui5/webcomponents-react/lib/Card'
import "@ui5/webcomponents-icons/dist/icons/person-placeholder"

const card = props => {
    return (
        <Card
            heading={props.heading}
            subheading={props.subheading}
            style={{
                width: props.width,
            }}
        >
            {props.children}
        </Card>
    )
}

export default card