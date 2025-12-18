/* eslint-disable */
// Generated for Percify Avatar Co-Pilot
// Update with: wrangler types env.d.ts --include-runtime false
declare namespace Cloudflare {
	interface Env {
		Chat: DurableObjectNamespace<import("./src/server").PercifyAvatarAgent>;
		AI: Ai;
	}
}
interface Env extends Cloudflare.Env {}
