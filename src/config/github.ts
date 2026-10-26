export const githubConfig = {
  user: "renataaap",
  endpoint:
    "https://api.github.com/users/renataaap/repos?sort=updated&per_page=100",
  profile: "https://github.com/renataaap",
  ttl: 3 * 60 * 60 * 1000,
  cacheKey: "verso:github:public:v1",
  featured: ["renataaap/versary", "renataaap/gymflow", "renataaap/app_fitness"],
  excluded: ["renataaap/saep_api_notion"],
  topics: ["portfolio", "portfolio-featured"],
} as const;
