// GitHub 仓库相关链接
const GITHUB_REPO_BASE = "https://github.com/MaaEnd/MaaEnd";

export const GITHUB_URLS = {
  REPO: GITHUB_REPO_BASE,
  RELEASES: `${GITHUB_REPO_BASE}/releases`,
  ISSUES: `${GITHUB_REPO_BASE}/issues`,
  DOCS: `${GITHUB_REPO_BASE}/blob/main/README.md`,
  API_LATEST_RELEASE:
    "https://api.github.com/repos/MaaEnd/MaaEnd/releases/latest",
} as const;

// QQ 群号和链接
export const QQ_GROUPS = {
  USER_GROUP: "755643532",
  USER_GROUP_LINK: "https://qm.qq.com/q/o4HDYMHUGc",
  DEV_GROUP: "1072587329",
  DEV_GROUP_LINK: "https://qm.qq.com/q/EyirQpBiW4",
} as const;
