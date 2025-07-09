export type TabType = {
	id: string;
	title: string;
	url: string;
	pinned: boolean;
	icon: string;
};

export const initialTabs: TabType[] = [
	{
		id: '1',
		title: 'Dashboard',
		url: '/dashboard',
		pinned: false,
		icon: '/img/tabs/apps.svg',
	},
	{
		id: '2',
		title: 'Banking',
		url: '/banking',
		pinned: false,
		icon: '/img/tabs/bank.svg',
	},
	{
		id: '3',
		title: 'Telefonie',
		url: '/telefonie',
		pinned: false,
		icon: '/img/tabs/phone-call.svg',
	},
	{
		id: '4',
		title: 'Accounting',
		url: '/accounting',
		pinned: false,
		icon: '/img/tabs/user-add.svg',
	},
	{
		id: '5',
		title: 'Verkauf',
		url: '/verkauf',
		pinned: false,
		icon: '/img/tabs/shop.svg',
	},
	{
		id: '6',
		title: 'Statistik',
		url: '/statistik',
		pinned: false,
		icon: '/img/tabs/chart-pie.svg',
	},
	{
		id: '7',
		title: 'Post Office',
		url: '/post-office',
		pinned: false,
		icon: '/img/tabs/envelope.svg',
	},
	{
		id: '8',
		title: 'Administration',
		url: '/administration',
		pinned: false,
		icon: '/img/tabs/settings.svg',
	},
	{
		id: '9',
		title: 'Help',
		url: '/help',
		pinned: false,
		icon: '/img/tabs/book-alt.svg',
	},
	{
		id: '10',
		title: 'Warenbestand',
		url: '/warenbestand',
		pinned: false,
		icon: '/img/tabs/cube.svg',
	},
	{
		id: '11',
		title: 'Auswahlisten',
		url: '/auswahlisten',
		pinned: false,
		icon: '/img/tabs/list.svg',
	},
	{
		id: '12',
		title: 'Einkauf',
		url: '/einkauf',
		pinned: false,
		icon: '/img/tabs/shopping-cart-check.svg',
	},
	{
		id: '13',
		title: 'Rechn',
		url: '/rechnung',
		pinned: false,
		icon: '/img/tabs/browser.svg',
	},
];
