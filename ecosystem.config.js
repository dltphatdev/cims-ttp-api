module.exports = {
	apps: [
		{
			name: "cims-ttp-api",
			script: "npm",
			args: "run start", 
			env: {
				NODE_ENV: "production",
				PORT: 8080,
			},
		},
	],
};
