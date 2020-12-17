import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface FakeViewProps {
    location: Location
}
function FakeView(props: FakeViewProps) {
    return (
        <div>
            <Title>Fake View for {props.location.pathname}</Title>
        </div>
    );
}

export default FakeView;