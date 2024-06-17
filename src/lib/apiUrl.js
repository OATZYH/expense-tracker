export const apiUrls = {
	user: {
		upgrade: '/api/user/upgrade',
		modify: '/api/user',
		usage: 'api/user/usage',
	},
	auth: {
		signup: '/api/auth/signup',
		login: '/api/auth/login',
	},
	expenses: {
		add: '/api/expenses/add',
		modify: '/api/expenses',
		getExpenses: ({ from, to }) => `/api/expenses?from=${from}&to=${to}`,
	},
	income: {
		add: '/api/income/add',
		modify: '/api/income',
		getIncome: ({ from, to }) => `/api/income?from=${from}&to=${to}`,
	},
	subscriptions: {
		add: '/api/subscriptions/add',
		modify: '/api/subscriptions',
		getSubscriptions: ({ from, to }) => `/api/subscriptions?from=${from}&to=${to}`,
	},
};
// export const getApiUrl = (filterKey, apiPath, categories, isNotRange = false) => {
// 	if (isNotRange) {
// 		return `/api/${apiPath}`;
// 	}

// 	if (filterKey === views.all.key) {
// 		return `/api/${apiPath}?categories=${categories?.join(',')}`;
// 	}

// 	const [start, end] = getRangeDateForFilter(filterKey);
// 	return `/api/${apiPath}?from=${start}&to=${end}&categories=${categories?.join(',')}`;
// };