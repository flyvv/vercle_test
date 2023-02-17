import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { addUser } from '@/services/user'
import { useNavigate, useModel } from '@umijs/max'
import { useEffect } from 'react'

export default function Page() {
	const { refresh } = useModel('user.model')
	const navigate = useNavigate()
	const { data, loading, run } = useRequest(addUser, {
		manual: true,
		onSuccess() {
			refresh()
		},
	})

	useEffect(() => {
		if (data) {
			navigate('/user/list')
		}
	}, [data])

	const onFinish = (values: API.User) => {
		run(values)
	}

	return (
		<Row>
			<Col offset={8} span={8}>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinish}
				>
					<Form.Item
						label="用户名"
						name="username"
						rules={[{ required: true, message: '请输入用户名' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="密码"
						name="password"
						rules={[{ required: true, message: '请输入密码' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="手机号"
						name="phone"
						rules={[{ required: true, message: '请输入手机号' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="角色"
						name="role"
						rules={[{ required: true, message: '角色' }]}
					>
						<Select
							options={[
								{ label: 'root', value: 'root' },
								{ label: 'admin', value: 'admin' },
								{ label: 'member', value: 'member' },
							]}
						/>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button htmlType="submit" loading={loading}>
							提交
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	)
}
