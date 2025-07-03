import { api } from '../config/axios';
import { Item, LatestItemData, GrandExchangeData } from '../types/grandexchange-data-types';
import moment from 'moment';

const calculatePotentialProfit = (limit: number, priceData: LatestItemData) => {
	const { high, low, highTime, lowTime } = priceData;
	const GRANDEXCHANGE_TAX = 0.02;
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
		const itemVolume1h = (await api.get(`1h`)).data;
		console.log(itemVolume1h);
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
