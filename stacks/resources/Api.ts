import { Api, Stack } from "@serverless-stack/resources";

const CONTROLLERS_PATH = "application/api/controllers";

export class ApplicationApi {
	private static resource: Api;

	private constructor() {}

	public static provision(stack: Stack): Api {
		if (!ApplicationApi.resource) {
			const api = new Api(stack, "api", {
				routes: {
					"GET /": `${CONTROLLERS_PATH}/healthCheck.handler`,
				},
			});

			ApplicationApi.resource = api;
		}

		return ApplicationApi.resource;
	}
}
