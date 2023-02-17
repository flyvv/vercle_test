import { deleteUser } from '@/services/user'
import { Link, useAccess, useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'

export default function Page() {
	const { data, loading, refresh } = useModel('user.model')
	const { run } = useRequest(deleteUser, {
		manual: true,
		onSuccess: refresh,
	})

	const access = useAccess()

	const columns: ColumnsType<API.User> = [
		{
			title: '用户名',
			dataIndex: 'user',
			render: (value, row) => (
				<Link
					style={{ color: '#40a9ff' }}
					to={`/user/detail/${row.id}`}
					state={row}
				>
					{row.username}
				</Link>
			),
		},
		{
			title: '手机',
			dataIndex: 'phone',
		},
		{
			title: '角色',
			dataIndex: 'role',
		},
		{
			title: '操作',
			dataIndex: 'operate',
			render: (value, row) => (
				<>
					{access.adminCan && (
						<span
							style={{ cursor: 'pointer' }}
							className={`text-blue-600`}
							onClick={() => {
								run(row?.id)
							}}
						>
							删除
						</span>
					)}
				</>
			),
		},
	]

	return (
		<>
			<div>共记{data?.list?.length}条</div>
			<Table
				// header={<div>用户列表</div>}
				// footer={<div>共记{data?.list?.length}条</div>}
				bordered
				loading={loading}
				dataSource={data?.list}
				columns={columns.map((v: any) => ({ ...v, key: v.dataIndex }))}
			/>
		</>
	)
}
