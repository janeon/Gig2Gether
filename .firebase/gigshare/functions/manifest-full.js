export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","Boost-Earnings.png","Community.png","Connect-&-Thrive.png","Data-Control.png","Data-Uploading.png","Instant-Insights.png","NSF.png","Planner.png","Platform.png","Registration.png","Sharing-Settings.png","Smarter-Policies.png","Trends.png","Work-Smarter.png","favicon.ico","job1.jpg","job2.jpg","job3.jpg","quest1.png","quest2.jpg","quest3.jpg","quest4.jpg","rover1.jpg","rover2.jpg","trip1.jpg","trip2.jpg","trip3.jpg","up-profile1.jpg","up-profile2.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start._EQJpWl9.js","app":"_app/immutable/entry/app.DePDZ1Qr.js","imports":["_app/immutable/entry/start._EQJpWl9.js","_app/immutable/chunks/entry.Ddf6s1Sl.js","_app/immutable/chunks/scheduler.Tn1ca7fi.js","_app/immutable/entry/app.DePDZ1Qr.js","_app/immutable/chunks/scheduler.Tn1ca7fi.js","_app/immutable/chunks/index.CSvEDU_A.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(auth)/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(auth)/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/protected",
				pattern: /^\/protected\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/protected/(settings)/account",
				pattern: /^\/protected\/account\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/protected/(settings)/demographics",
				pattern: /^\/protected\/demographics\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/expenses",
				pattern: /^\/protected\/expenses\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/manual-quests",
				pattern: /^\/protected\/manual-quests\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/manual-trips",
				pattern: /^\/protected\/manual-trips\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/manual",
				pattern: /^\/protected\/manual\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/protected/(settings)/profile",
				pattern: /^\/protected\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/quest-screenshot",
				pattern: /^\/protected\/quest-screenshot\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/quests",
				pattern: /^\/protected\/quests\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/rover-screenshot",
				pattern: /^\/protected\/rover-screenshot\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/rover-upload",
				pattern: /^\/protected\/rover-upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/protected/(settings)/sharingpreferences",
				pattern: /^\/protected\/sharingpreferences\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/trip-screenshot",
				pattern: /^\/protected\/trip-screenshot\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/trips",
				pattern: /^\/protected\/trips\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/protected/upload",
				pattern: /^\/protected\/upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/upwork-job-screenshot",
				pattern: /^\/protected\/upwork-job-screenshot\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/upwork-job",
				pattern: /^\/protected\/upwork-job\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/protected/(upload)/upwork-profile",
				pattern: /^\/protected\/upwork-profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/protected/welcome",
				pattern: /^\/protected\/welcome\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/(auth)/registerpolicymaker",
				pattern: /^\/registerpolicymaker\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(auth)/registerworker",
				pattern: /^\/registerworker\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(auth)/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
