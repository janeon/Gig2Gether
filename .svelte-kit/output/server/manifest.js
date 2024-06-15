export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.BsNuKok9.js","app":"_app/immutable/entry/app.CGEyh_X8.js","imports":["_app/immutable/entry/start.BsNuKok9.js","_app/immutable/chunks/entry.2zjSjI6B.js","_app/immutable/chunks/scheduler.DCWCPtl2.js","_app/immutable/entry/app.CGEyh_X8.js","_app/immutable/chunks/scheduler.DCWCPtl2.js","_app/immutable/chunks/index.Bb8AvSvR.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
