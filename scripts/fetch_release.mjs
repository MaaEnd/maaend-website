import fs from "node:fs";

const LATEST_API = "https://api.github.com/repos/MaaEnd/MaaEnd/releases/latest";
const TAG_API = "https://api.github.com/repos/MaaEnd/MaaEnd/releases";

async function fetchRelease() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const RELEASE_TAG = process.env.RELEASE_TAG ?? "latest";
  const FETCH_API =
    RELEASE_TAG === "latest" ? LATEST_API : `${TAG_API}/${RELEASE_TAG}`;

  const res = await fetch(FETCH_API, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${API} ${res.status}: ${await res.text()}`
    );
  }

  const data = res.json();
  return data;
}

function writeEnvFine(data) {
  fs.writeFileSync(".release_info.json", JSON.stringify(data, null, 4), "utf8");
}

async function main() {
  const data = await fetchRelease();
  writeEnvFine(data);
}

await main();
