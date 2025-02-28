import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const THUMBNAIL_WIDTH = 300
const THUMBNAIL_QUALITY = 80

export async function generateThumbnail(srcPath: string, destPath: string) {
  const dir = path.dirname(destPath)

  // 如果目录不存在则创建
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  await sharp(srcPath)
    .resize(THUMBNAIL_WIDTH)
    .jpeg({ quality: THUMBNAIL_QUALITY })
    .toFile(destPath)
}

export function getThumbnailPath(originalPath: string) {
  const ext = path.extname(originalPath)
  const base = path.basename(originalPath, ext)
  const dir = path.dirname(originalPath)

  return path.join(dir, 'thumb', `${base}_thumb${ext}`)
}
