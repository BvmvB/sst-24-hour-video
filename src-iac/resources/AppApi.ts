import { Api, Stack } from "@serverless-stack/resources";

const CONTROLLERS_PATH = "application/api/controllers";

export class AppApi {
	private static resource: Api;

	private constructor() {}

	public static provision(stack: Stack): Api {
		if (!AppApi.resource) {
			const api = new Api(stack, "api", {
				routes: {
					"GET /": `${CONTROLLERS_PATH}/healthCheck.handler`,
				},
			});

			AppApi.resource = api;
		}

		return AppApi.resource;
	}
}
