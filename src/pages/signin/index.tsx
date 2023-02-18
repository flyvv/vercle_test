import { useRequest } from 'ahooks'
import { Button, Card, Col, Form, Input, Row } from 'antd'
import { signin } from '@/services/auth'
import { useNavigate, useModel } from '@umijs/max'
import { Link } from '@umijs/max'
import { decode } from 'jsonwebtoken'
import { useEffect } from 'react'

export default function Page() {
	const navigate = useNavigate()
	const { initialState, setInitialState } = useModel('@@initialState')
	const { loading, run } = useRequest(signin, {
		manual: true,
		onSuccess(result) {
			localStorage.setItem('token', result)
			const currentUser = decode(result)
			setInitialState({ currentUser })
		},
	})

	useEffect(() => {
		if (initialState?.currentUser) {
			navigate('/home')
		}
	}, [initialState])

	const onFinish = (values: API.User) => {
		run(values)
	}

	return (
		<Row className="h-screen bg-gray-200" align="middle">
			<Col offset={8} span={8}>
				<Card title="请登录" extra={<Link to="/signup">去注册</Link>}>
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
						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button htmlType="submit" loading={loading}>
								提交
							</Button>
						</Form.Item>
					</Form>
					<Button onClick={() => navigate('/play')}>
						先去玩把小游戏
					</Button>
				</Card>
			</Col>
		</Row>
	)
}
