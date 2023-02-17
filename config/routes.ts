export default [
	{ path: '/', redirect: '/home' },
	{
		icon: 'HomeOutlined',
		path: '/home',
		name: '首页',
		component: './home/index',
	},
	{
		icon: 'ProfileOutlined',
		path: '/profile',
		name: '个人中心',
		component: './profile/index',
		// hideInMenu: true, // 隐藏菜单
	},
	{
		icon: 'UserOutlined',
		path: '/user',
		name: '用户管理',
		component: './user/index',
		routes: [
			{
				icon: 'BorderBottomOutlined',
				name: '添加用户',
				path: '/user/add',
				component: './user/add/index',
				access: 'adminCan',
			},
			{
				icon: 'ArrowLeftOutlined',
				name: '用户列表',
				path: '/user/list',
				component: './user/list/index',
				access: 'memberCan',
			},
			{
				icon: 'BorderBottomOutlined',
				name: '用户详情',
				path: '/user/detail/:id',
				component: './user/detail/index',
				hideInMenu: true,
			},
		],
	},
	{
		path: '/signup',
		name: '注册',
		component: './signup/index',
		hideInMenu: true,
		layout: false,
	},
	{
		path: '/signin',
		name: '登录',
		component: './signin/index',
		hideInMenu: true,
		layout: false,
	},
]
