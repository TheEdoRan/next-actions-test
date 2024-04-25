import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const ac = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
		});
	},
}).use(async ({ next, metadata, clientInput, bindArgsClientInputs, ctx }) => {
	// Here we use a logging middleware.
	const start = Date.now();

	// Here we await the next middleware.
	const result = await next({ ctx });

	const end = Date.now();

	const durationInMs = end - start;

	const logObject: Record<string, any> = { durationInMs };

	logObject.clientInput = clientInput;
	logObject.bindArgsClientInputs = bindArgsClientInputs;
	logObject.metadata = metadata;
	logObject.result = result;

	console.log("LOGGING FROM MIDDLEWARE:");
	console.dir(logObject, { depth: null });

	// And then return the result of the awaited next middleware.
	return result;
});
