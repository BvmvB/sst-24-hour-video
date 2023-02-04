import { StackContext } from "@serverless-stack/resources";

import { AppApi } from "./resources/AppApi";

export function MyStack({ stack }: StackContext) {
	const api = AppApi.provision(stack);

	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
