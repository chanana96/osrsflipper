import { api } from '../config/axios';
import {
	Item,
	LatestItemData,
	GrandExchangeData,
	ItemVolumeData,
} from '../types/grandexchange-data-types';
import moment from 'moment';

const calculatePotentialProfit = (limit: number, priceData: LatestItemData & ItemVolumeData) => {
	const { high, low, highTime, lowTime, highPriceVolume, lowPriceVolume } = priceData;
	const GRANDEXCHANGE_TAX = 0.02;
	const tax = Math.ceil(high * GRANDEXCHANGE_TAX);
	const margin = high - low - tax;
	const marginPercentage = Math.ceil((margin / low) * 100);
	const potentialProfit = margin * limit;
	const lastHourVolume = highPriceVolume + lowPriceVolume || 0;
	return {
		potentialProfit,
		tax,
		margin,
		marginPercentage,
		high,
		low,
		highTime,
		lowTime,
		highPriceVolume,
		lowPriceVolume,
		lastHourVolume,
	};
};

const filterProfitableItems = (data: GrandExchangeData) => {
	const { potentialProfit, lastHourVolume } = data;
	const profitFilter = 300000;
	if (lastHourVolume < 1000) return false;
	else if (potentialProfit >= profitFilter) return true;
	return false;
};

export const getGrandExchangeData = async (): Promise<GrandExchangeData[]> => {
	try {
		const allItemData = (await api.get(`mapping`)).data;
		const latestItemPrices = (await api.get(`latest`)).data;
		const itemVolume1h = (await api.get(`1h`)).data;

		const pricesMap = new Map<number, LatestItemData>();

		for (const [itemIdStr, priceData] of Object.entries(latestItemPrices.data)) {
			const itemId = parseInt(itemIdStr, 10);
			pricesMap.set(itemId, { ...priceData, ...itemVolume1h.data[itemId] } as LatestItemData &
				ItemVolumeData);
		}

		const items = allItemData
			.filter((item: Item) => pricesMap.has(item.id))
			.map((item: Item) => ({
				id: item.id,
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
