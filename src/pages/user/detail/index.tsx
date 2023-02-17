import { useLocation } from '@umijs/max'
import { Descriptions } from 'antd'

export default function Page() {
	const loaction = useLocation()
	const user = loaction.state as API.User

	return (
		<Descriptions>
			<Descriptions.Item label="用户名">
				{user.username}
			</Descriptions.Item>

			<Descriptions.Item label="用户ID">{user.id}</Descriptions.Item>
			<Descriptions.Item label="用户手机">{user.phone}</Descriptions.Item>
		</Descriptions>
	)
}
