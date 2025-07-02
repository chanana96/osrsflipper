import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://prices.runescape.wiki/api/v1/osrs/',
});
