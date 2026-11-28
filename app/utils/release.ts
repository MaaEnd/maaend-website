interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  state: string;
}

export interface ReleaseInfo {
  tag_name: string;
  assets: ReleaseAsset[];
  html_url: string;
  prerelease: boolean;
}

const __releaseInfo = process.env.NEXT_PUBLIC_RELEASE_INFO;

if (!__releaseInfo) {
  throw new Error("`NEXT_PUBLIC_RELEASE_INFO` is empty!");
}

export const RELEASE: ReleaseInfo = JSON.parse(__releaseInfo);
