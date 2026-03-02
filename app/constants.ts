// GitHub 仓库相关链接
const GITHUB_REPO_BASE = "https://github.com/MaaEnd/MaaEnd";

export const GITHUB_URLS = {
  REPO: GITHUB_REPO_BASE,
  RELEASES: `${GITHUB_REPO_BASE}/releases`,
  ISSUES: `${GITHUB_REPO_BASE}/issues`,
  DOCS: `${GITHUB_REPO_BASE}/blob/main/docs/zh_cn/developers/development.md`,
  API_LATEST_RELEASE:
    "https://api.github.com/repos/MaaEnd/MaaEnd/releases/latest",
} as const;
