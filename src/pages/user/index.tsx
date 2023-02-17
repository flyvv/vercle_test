import { PageContainer } from '@ant-design/pro-components'
import { Outlet } from 'umi'

export default function Page() {
	return (
		<PageContainer>
			<Outlet />
		</PageContainer>
	)
}
