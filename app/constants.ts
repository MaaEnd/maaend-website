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

export interface FriendLink {
  id: string;
  name: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
}

// 友情链接：图标来自 public/friend
export const FRIEND_LINKS: FriendLink[] = [
  {
    id: "MAA",
    name: "MAA",
    href: "https://maa.plus/",
    iconSrc: "/friend/maa.png",
    iconAlt: "MAA",
  },
  {
    id: "MaaFramework",
    name: "MaaFramework",
    href: "https://maafw.com/",
    iconSrc: "/friend/maa.png",
    iconAlt: "MAA",
  },
  {
    id: "ef-yituliu",
    name: "终末地一图流",
    href: "https://www.yituliu.cn/",
    iconSrc: "/friend/ef-yituliu.png",
    iconAlt: "终末地一图流",
  },
  {
    id: "mirrorchyan",
    name: "Mirror酱",
    href: "https://mirrorchyan.com/zh/projects?rid=MaaEnd&os=windows&arch=x64&channel=stable",
    iconSrc: "/friend/mirrorchyan.png",
    iconAlt: "Mirror酱",
  },
  {
    id: "endfield-terminal",
    name: "终末地-协议终端",
    href: "https://end.shallow.ink",
    iconSrc: "https://end.shallow.ink/icon.svg",
    iconAlt: "终末地-协议终端",
  },
  {
    id: "zmd-map",
    name: "终末地地图站",
    href: "https://www.zmdmap.com/",
    iconSrc: "https://assets.zmdmap.com/logo.png",
    iconAlt: "终末地地图站",
  },
];
