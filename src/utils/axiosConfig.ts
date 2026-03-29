import axios, { AxiosHeaders, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// ----------------------------------------------------------------------

const DEFAULT_TIMEOUT = 10000;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT ?? DEFAULT_TIMEOUT);

let accessToken: string | null = null;

const resolveTimeout = () =>
	Number.isFinite(API_TIMEOUT) && API_TIMEOUT > 0 ? API_TIMEOUT : DEFAULT_TIMEOUT;

const applyAccessToken = (config: InternalAxiosRequestConfig) => {
	const headers = AxiosHeaders.from(config.headers);

	if (accessToken) {
		headers.set('Authorization', `Bearer ${accessToken}`);
	} else {
		headers.delete('Authorization');
	}

	config.headers = headers;

	return config;
};

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: resolveTimeout(),
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((config) => applyAccessToken(config));

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
);

export function setAccessToken(token: string | null) {
	accessToken = token?.trim() || null;
}

export function clearAccessToken() {
	accessToken = null;
}

export default axiosInstance;
