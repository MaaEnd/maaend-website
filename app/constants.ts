// GitHub 仓库相关链接
const GITHUB_REPO_BASE = "https://github.com/MaaEnd/MaaEnd";

export const GITHUB_URLS = {
  REPO: GITHUB_REPO_BASE,
  RELEASES: `${GITHUB_REPO_BASE}/releases`,
  ISSUES: `${GITHUB_REPO_BASE}/issues`,
  DOCS: `${GITHUB_REPO_BASE}/blob/v2/README.md`,
  API_LATEST_RELEASE:
    "https://api.github.com/repos/MaaEnd/MaaEnd/releases/latest",
  // 含预发布版的最近几个 release，用于稳定版缺少某平台产物时回退
  API_RECENT_RELEASES:
    "https://api.github.com/repos/MaaEnd/MaaEnd/releases?per_page=5",
} as const;

// QQ 群号和链接
export const QQ_GROUPS = {
  USER_GROUP: "1097256935",
  USER_GROUP_LINK: "https://qm.qq.com/q/2AK5MoVfOQ",
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
    id: "mirrorchyan",
    name: "Mirror酱",
    href: "https://mirrorchyan.com/zh/projects?rid=MaaEnd&source=maaend.com-link",
    iconSrc: "/friend/mirrorchyan.png",
    iconAlt: "Mirror酱",
  },
  {
    id: "ef-yituliu",
    name: "终末地一图流",
    href: "https://ef.yituliu.cn/",
    iconSrc: "/friend/ef-yituliu.png",
    iconAlt: "终末地一图流",
  },
  {
    id: "zmd-map",
    name: "终末地地图站",
    href: "https://www.zmdmap.com/",
    iconSrc: "/friend/zmd-map.png",
    iconAlt: "终末地地图站",
  },
  {
    id: "endfield-terminal",
    name: "终末地-协议终端",
    href: "https://end.shallow.ink",
    iconSrc: "/friend/endfield-terminal.svg",
    iconAlt: "终末地-协议终端",
  },
  {
    id: "opendfieldmap",
    name: "终末地地图集",
    href: "https://opendfieldmap.cn/",
    iconSrc: "/friend/opendfieldmap.svg",
    iconAlt: "Open Endfield Map",
  },
];
