import { useRequest } from 'ahooks'
import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { signup } from '@/services/auth'
import { useNavigate } from '@umijs/max'
import { Link } from '@umijs/max'
import { ROLES } from '@/constants'

export default function Page() {
	const navigate = useNavigate()
	const { loading, run } = useRequest(signup, {
		manual: true,
		onSuccess() {
			navigate('/signup')
		},
	})

	const onFinish = (values: API.User) => {
		run(values)
	}

	return (
		<Row className="h-screen bg-gray-200" align="middle">
			<Col offset={8} span={8}>
				<Card title="请注册" extra={<Link to="/signin">去登录</Link>}>
					<Form
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 16 }}
						onFinish={onFinish}
					>
						<Form.Item
							label="用户名"
							name="username"
							rules={[
								{ required: true, message: '请输入用户名' },
							]}
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
							rules={[
								{ required: true, message: '请输入手机号' },
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="角色"
							name="role"
							rules={[{ required: true, message: '角色' }]}
						>
							<Select>
								{ROLES.map((role) => (
									<Select.Option
										value={role.code}
										key={role.code}
									>
										{role.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button htmlType="submit" loading={loading}>
								提交
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Col>
		</Row>
	)
}
