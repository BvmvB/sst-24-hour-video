import { StackContext } from "@serverless-stack/resources";

import { ApplicationApi } from "./resources/Api";

export function MyStack({ stack }: StackContext) {
	const api = ApplicationApi.provision(stack);

	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
