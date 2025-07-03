export type Item = {
	examine: string;
	id: number;
	members: boolean;
	lowalch: number;
	limit: number;
	value: number;
	highalch: number;
	icon: string;
	name: string;
};

export type LatestItemData = {
	high: number;
	highTime: number;
	low: number;
	lowTime: number;
};

export type GrandExchangeData = {
	high: number;
	highTime: number;
	icon: string;
	limit: number;
	low: number;
	lowTime: number;
	margin: number;
	name: string;
	potentialProfit: number;
	tax: number;
};
