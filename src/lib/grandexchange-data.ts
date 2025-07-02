import { api } from '../config/axios';
import moment from 'moment';

const GRANDEXCHANGE_TAX = 0.02;

type Item = {
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

type LatestItemData = {
	high: number;
	highTime: number;
	low: number;
	lowTime: number;
};

type GrandExchangeData = {
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

const calculatePotentialProfit = (limit: number, priceData: LatestItemData) => {
	const { high, low, highTime, lowTime } = priceData;
	const tax = Math.ceil(high * GRANDEXCHANGE_TAX);
	const margin = high - low - tax;
	const potentialProfit = margin * limit;
	return {
		potentialProfit,
		tax,
		margin,
		high,
		low,
		highTime,
		lowTime,
	};
};

const filterProfitableItems = (data: GrandExchangeData) => {
	const { potentialProfit } = data;
	const profitFilter = 300000;
	if (potentialProfit >= profitFilter) return true;
	return false;
};

export const getGrandExchangeData = async (): Promise<GrandExchangeData[]> => {
	try {
		const allItemData = (await api.get(`mapping`)).data;
		const latestItemPrices = (await api.get(`latest`)).data;

		const pricesMap = new Map<number, LatestItemData>();

		for (const [itemIdStr, priceData] of Object.entries(latestItemPrices.data)) {
			const itemId = parseInt(itemIdStr, 10);
			pricesMap.set(itemId, priceData as LatestItemData);
		}
		const items = allItemData
			.filter((item: Item) => pricesMap.has(item.id))
			.map((item: Item) => ({
				name: item.name,
				limit: item.limit,
				icon: item.icon,
				...calculatePotentialProfit(item.limit, pricesMap.get(item.id)!),
			}));
		return items
			.filter((item) => filterProfitableItems(item))
			.map((item: GrandExchangeData) => ({
				...item,
				highTime: moment.unix(item.highTime).format('MMMM Do YYYY, h:mm:ss a'),
				lowTime: moment.unix(item.lowTime).format('MMMM Do YYYY, h:mm:ss a'),
			}));
	} catch (e) {
		console.error(e);
		throw e;
	}
};
