'use client';

import {Avatar, Button, Flex, theme, Typography} from 'antd';
import {
    InstagramOutlined,
    UserOutlined,
    XOutlined,
    YoutubeFilled
} from '@ant-design/icons';
import {StaffMember} from '@/config/staffs';

const {useToken} = theme;

interface StaffCardProps {
    staff: StaffMember;
}

export function StaffCard({staff}: StaffCardProps) {
    const {token} = useToken();

    return (
        <Flex
            align="center"
            justify="center"
            vertical
            style={{
                width: '100%',
                height: '300px',
                backgroundColor: token.colorBgElevated,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: '2rem',
                padding: token.padding,
                position: 'relative',
            }}
            gap="small"
        >
            <Flex
                vertical
                align="center"
                justify="center"
                gap="middle"
            >
                <Avatar
                    size={140}
                    icon={<UserOutlined/>}
                    src={staff.imageUrl}
                />
                <Flex vertical align="center" justify="center" style={{width: '100%'}}>
                    <Typography.Title level={4} style={{margin: 0, fontWeight: 700}}>
                        {staff.name}
                    </Typography.Title>
                    <Typography.Text type="secondary">
                        {staff.role}
                    </Typography.Text>
                </Flex>
            </Flex>
            <Flex
                justify="space-around"
                align="center"
                style={{
                    width: '100%',
                    padding: token.padding,
                }}
            >
                <Button type="text" shape="circle" icon={<InstagramOutlined/>}/>
                <Button type="text" shape="circle" icon={<XOutlined/>}/>
                <Button type="text" shape="circle" icon={<YoutubeFilled/>}/>
            </Flex>
        </Flex>
    );
}
