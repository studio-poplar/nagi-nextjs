const GITHUB_OWNER = "studio-poplar";
const GITHUB_REPO = "nagi-nextjs";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const GITHUB_API = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents`;

function token(): string {
  const t = process.env.GITHUB_TOKEN;
  if (!t) {
    throw new Error(
      "GITHUB_TOKEN が設定されていません。管理画面から保存するには、GitHub Personal Access Token を環境変数に設定してください。"
    );
  }
  return t;
}

function githubRequest(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${GITHUB_API}/${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

async function getFileSha(path: string): Promise<string | null> {
  const res = await githubRequest(`${path}?ref=${GITHUB_BRANCH}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub からのファイル取得に失敗しました（${res.status}）：${await res.text()}`);
  const data = (await res.json()) as { sha: string };
  return data.sha;
}

/** Creates or updates a file in the repo via a single commit. `content` is the raw
 * (not yet base64-encoded) file contents. */
export async function putFile(path: string, content: Buffer | string, message: string): Promise<void> {
  const sha = await getFileSha(path);
  const base64Content = (Buffer.isBuffer(content) ? content : Buffer.from(content, "utf-8")).toString("base64");
  const res = await githubRequest(path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: base64Content,
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) throw new Error(`GitHubへのコミットに失敗しました（${res.status}）：${await res.text()}`);
}

/** No-op if the file doesn't exist. */
export async function deleteFile(path: string, message: string): Promise<void> {
  const sha = await getFileSha(path);
  if (!sha) return;
  const res = await githubRequest(path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch: GITHUB_BRANCH }),
  });
  if (!res.ok) throw new Error(`GitHubでの削除に失敗しました（${res.status}）：${await res.text()}`);
}
