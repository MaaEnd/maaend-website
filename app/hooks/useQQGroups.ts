import { useCallback, useEffect, useState } from "react";
import { QQ_GROUPS } from "../constants";

interface QQGroup {
  number: string;
  link: string;
}

interface QQGroups {
  user: QQGroup;
  dev: QQGroup;
}

const CACHE_KEY = "maaend-qq-groups";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

const fallback: QQGroups = {
  user: { number: QQ_GROUPS.USER_GROUP, link: QQ_GROUPS.USER_GROUP_LINK },
  dev: { number: QQ_GROUPS.DEV_GROUP, link: QQ_GROUPS.DEV_GROUP_LINK },
};

function readCache(): QQGroups | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch {
    return null;
  }
}

function writeCache(data: QQGroups) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // storage full or unavailable
  }
}

export function useQQGroups() {
  const [groups, setGroups] = useState<QQGroups>(fallback);

  const fetchGroups = useCallback(async () => {
    const cached = readCache();
    if (cached) {
      setGroups(cached);
      return;
    }
    try {
      const res = await fetch("https://end.maafw.com/index.json");
      if (!res.ok) return;
      const data = await res.json();
      const qq = data.qq_groups;
      if (
        qq?.user?.number &&
        qq?.user?.link &&
        qq?.dev?.number &&
        qq?.dev?.link
      ) {
        const result: QQGroups = { user: qq.user, dev: qq.dev };
        setGroups(result);
        writeCache(result);
      }
    } catch {
      // fallback to constants
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchGroups();
    })();
  }, [fetchGroups]);

  return groups;
}
