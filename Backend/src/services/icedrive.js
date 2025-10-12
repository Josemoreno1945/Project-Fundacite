import { createClient } from "webdav";
import path from "path";

const client = createClient(process.env.ICEDRIVE_WEBDAV_URL, {
  username: process.env.ICEDRIVE_USER,
  password: process.env.ICEDRIVE_PASSWORD,
});

export async function uploadBuffer(
  buffer,
  remotePath,
  { overwrite = true } = {}
) {
  const fullPath = path.posix.join("/", remotePath);
  await client.putFileContents(fullPath, buffer, { overwrite });
  return fullPath;
}

export function downloadStream(remotePath) {
  const fullPath = path.posix.join("/", remotePath);
  return client.createReadStream(fullPath);
}
