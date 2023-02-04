import { App } from "@serverless-stack/resources";

import { MyStack } from "./MainStack";

export default function (app: App) {
	app.setDefaultFunctionProps({
		runtime: "nodejs16.x",
		srcPath: "src-app",
		bundle: {
			format: "esm",
		},
	});

	app.stack(MyStack);
}
