'use client';

import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Col,
    Flex,
    Form,
    Grid,
    Input,
    message,
    Row,
    theme,
    Typography,
    Upload,
    Space
} from 'antd';
import {UserOutlined, SaveOutlined} from '@ant-design/icons';
import {useTranslations} from 'next-intl';
import type {UploadProps} from 'antd';

const {useToken} = theme;
const {useBreakpoint} = Grid;
const {Text} = Typography;

interface UserProfile {
    profileImage?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export default function ProfilePage() {
    const {token} = useToken();
    const screens = useBreakpoint();
    const t = useTranslations("app.dashboard.profile");
    const [form] = Form.useForm();

    // Mock user data - in real app this would come from API/context
    const [userProfile, setUserProfile] = useState<UserProfile>({
        profileImage: undefined,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1234567890'
    });

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(userProfile.profileImage);

    // Handle form submission
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedProfile = {
                ...userProfile,
                ...values,
                profileImage: imageUrl
            };

            setUserProfile(updatedProfile);
            message.success(t('profileUpdated'));
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    // Handle image upload
    const uploadProps: UploadProps = {
        name: 'avatar',
        showUploadList: false,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error(t('invalidImage'));
                return false;
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error(t('maxFileSize'));
                return false;
            }

            // Create preview URL
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImageUrl(reader.result as string);
            });
            reader.readAsDataURL(file);

            return false; // Prevent actual upload
        },
    };

    return (
        <Flex
            vertical
            flex={1}
            style={{
                width: "100%",
                padding: `${token.paddingLG}px ${token.padding}px`,
            }}
            gap="large"
            justify="flex-start"
            align="center"
        >
            <Flex
                vertical
                style={{
                    width: "100%",
                    maxWidth: "700px",
                    backgroundColor: token.colorBgBase,
                    padding: `${token.paddingLG}px ${token.paddingLG}px`,
                    borderRadius: token.borderRadiusLG,
                    border: `1px solid ${token.colorBorderSecondary}`,
                }}
                gap="large"
            >
                {/* Profile Picture */}
                <Flex justify="center" align="center" style={{ marginBottom: token.margin }}>
                    <Flex vertical align="center" gap="middle">
                        <Upload {...uploadProps}>
                            {imageUrl ? (
                                <Avatar
                                    size={140}
                                    src={imageUrl}
                                    style={{
                                        cursor: 'pointer',
                                        border: `3px solid ${token.colorBorder}`,
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            ) : (
                                <Avatar
                                    size={140}
                                    icon={<UserOutlined/>}
                                    style={{
                                        cursor: 'pointer', 
                                        backgroundColor: token.colorPrimary,
                                        border: `3px solid ${token.colorBorder}`,
                                        transition: 'all 0.3s ease'
                                    }}
                                />
                            )}
                        </Upload>
                        <Text type="secondary" style={{ fontSize: '14px', textAlign: 'center' }}>
                            Click to change profile picture
                        </Text>
                    </Flex>
                </Flex>

                {/* Form */}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={userProfile}
                    requiredMark={false}
                    style={{ width: '100%' }}
                >
                    {/* First Name and Last Name Row */}
                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={
                                    <Text strong style={{ fontSize: '16px', color: token.colorText }}>
                                        {t('firstName')}
                                    </Text>
                                }
                                name="firstName"
                                rules={[
                                    {required: true, message: 'Please enter your first name'},
                                    {min: 2, message: 'First name must be at least 2 characters'}
                                ]}
                                style={{ marginBottom: token.marginLG }}
                            >
                                <Input
                                    placeholder={t('firstName')}
                                    size="large"
                                    style={{
                                        borderRadius: token.borderRadiusLG,
                                        padding: `${token.paddingMD}px ${token.paddingLG}px`,
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={
                                    <Text strong style={{ fontSize: '16px', color: token.colorText }}>
                                        {t('lastName')}
                                    </Text>
                                }
                                name="lastName"
                                rules={[
                                    {required: true, message: 'Please enter your last name'},
                                    {min: 2, message: 'Last name must be at least 2 characters'}
                                ]}
                                style={{ marginBottom: token.marginLG }}
                            >
                                <Input
                                    placeholder={t('lastName')}
                                    size="large"
                                    style={{
                                        borderRadius: token.borderRadiusLG,
                                        padding: `${token.paddingMD}px ${token.paddingLG}px`,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Phone Number and Email Row */}
                    <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={
                                    <Text strong style={{ fontSize: '16px', color: token.colorText }}>
                                        {t('phoneNumber')}
                                    </Text>
                                }
                                name="phoneNumber"
                                rules={[
                                    {required: true, message: 'Please enter your phone number'},
                                    {pattern: /^[+]?[0-9\s-()]+$/, message: 'Please enter a valid phone number'}
                                ]}
                                style={{ marginBottom: token.marginLG }}
                            >
                                <Input
                                    placeholder={t('phoneNumber')}
                                    size="large"
                                    style={{
                                        borderRadius: token.borderRadiusLG,
                                        padding: `${token.paddingMD}px ${token.paddingLG}px`,
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                label={
                                    <Text strong style={{ fontSize: '16px', color: token.colorText }}>
                                        {t('email')}
                                    </Text>
                                }
                                name="email"
                                help={
                                    <Text type="secondary" style={{fontSize: '13px', marginTop: '4px'}}>
                                        {t('emailLocked')}
                                    </Text>
                                }
                                style={{ marginBottom: token.marginLG }}
                            >
                                <Input
                                    placeholder={t('email')}
                                    size="large"
                                    disabled
                                    style={{
                                        borderRadius: token.borderRadiusLG,
                                        padding: `${token.paddingMD}px ${token.paddingLG}px`,
                                        backgroundColor: token.colorBgContainerDisabled,
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Save Button */}
                    <Form.Item style={{marginBottom: 0, textAlign: 'center', marginTop: token.marginXL}}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined/>}
                            loading={loading}
                            size="large"
                            style={{
                                minWidth: '180px',
                                height: '48px',
                                borderRadius: token.borderRadiusLG,
                                fontSize: '16px',
                                fontWeight: 600,
                                boxShadow: 'none',
                            }}
                        >
                            {t('saveChanges')}
                        </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </Flex>
    );
}
