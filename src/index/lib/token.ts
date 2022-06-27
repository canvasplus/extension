import { onMount } from "solid-js";
import Axios, { AxiosResponse } from "axios";
import { getCSRFToken } from "././util";

export const SetToken: Function = async() => {
	const { data }: AxiosResponse<{ visible_token: string }> = await Axios.post("/profile/tokens", `authenticity_token=${ getCSRFToken() }&access_token[purpose]=Canvas%2B`, {
		headers: {
			"accept": "application/x-www-form-urlencoded",
			"x-requested-with": "XMLHttpResquest",
		},
	});
	await chrome.storage.local.set({ "token": data.visible_token });
};

export const SetID: Function = async() => {
	onMount(async() => {
		const { data }: AxiosResponse<{ id: string }> = await Axios.get("/api/v1/users/self");
		await chrome.storage.local.set({ "id": data.id });
	});
};