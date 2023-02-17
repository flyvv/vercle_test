import { PageContainer } from '@ant-design/pro-components'
import { Link, history, useNavigate } from '@umijs/max'
import { Button } from 'antd'

export default function Page() {
	const na = useNavigate() // 这个来自于react-router-domV6(www.reactrouter.cn)
	return (
		<PageContainer>
			<h1 className={`text-lg text-red-600`}>首页</h1>
			<Link to="/profile">个人中心</Link>
			<Button
				className={`text-lg text-blue-600`}
				type="primary"
				onClick={() => history.push('/profile')}
			>
				个人中心
			</Button>
			<Button type="dashed" onClick={() => na('/profile')}>
				个人中心
			</Button>
		</PageContainer>
	)
}
