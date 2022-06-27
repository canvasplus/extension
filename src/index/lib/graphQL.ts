import { createEffect, createSignal, on } from "solid-js";
import Axios, { AxiosResponse } from "axios";
import { query, setQuery, getCSRFToken } from "./util";
import type { GraphqlResponse } from "./types/GraphqlResponse";

const [response, setResponse] = createSignal<AxiosResponse<GraphqlResponse>>();
let hasMount = false;

const GraphQL: Function = async(data: string, type: string) => {
	!hasMount ? setQuery(current => current += `\n${ data }`) : null;
	return new Promise (async(resolve) =>
		!hasMount ? createEffect(async() =>
			response() ? resolve(response().data.data) : null
		) :
		resolve((await Fetch(data)).data.data)
	);
};

const Fetch = async(data: string) => {
	hasMount = true;
	return new Promise<AxiosResponse<GraphqlResponse>>(resolve =>
		chrome.storage.local.get(["token", "id"], async ({ token, id }) => {
			resolve(await Axios.post("/api/graphql", {
				"query": `${ data.includes("$self") ? "query ($self: ID!) " : "" }{ ${ data } }`,
				"variables": data.includes("$self") ? { self: id } : {},
				}, {
					headers: {
						Authorization: `Bearer ${ token }`,
						"Content-Type": "application/json",
						"X-CSRF-Token": getCSRFToken(),
				}
			}))
		})
	);
};

!hasMount ? createEffect(on(query, async() => {
	query() != "" ? setResponse(await Fetch(query())): null
})) : null;


export default GraphQL;
