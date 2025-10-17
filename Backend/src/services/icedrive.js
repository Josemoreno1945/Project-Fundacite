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

// NUEVO: borrar un archivo remoto (silencioso si no existe)
export async function deleteRemotePath(remotePath) {
  const fullPath = path.posix.join("/", remotePath);
  try {
    const exists = await client.exists(fullPath);
    if (!exists) return { ok: true, removed: false };
    await client.deleteFile(fullPath);
    return { ok: true, removed: true };
  } catch (err) {
    // propagar error para que el controlador lo maneje
    throw err;
  }
}
