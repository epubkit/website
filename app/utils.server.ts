// @ts-expect-error
import cache from 'memory-cache'
import YAML from 'yaml'
import i18next from 'i18next'
import en from './locales/en.json'
import zh from './locales/zh.json'

export const i18 = i18next.init({
  resources: {
    en,
    zh
  }
})

export async function getDownloads() {
  const fallbackVersion = "1.2.4"

  const fallbackDownloads = {
    mac: {
      arm64:
        `https://release.randynamic.org/djyde/epubkit-release/releases/download/v${fallbackVersion}/epubkit-${fallbackVersion}-arm64.dmg`,
      x64: `https://release.randynamic.org/djyde/epubkit-release/releases/download/v${fallbackVersion}/epubkit-${fallbackVersion}-x64.dmg`,
    },
    windows:
      `https://release.randynamic.org/djyde/epubkit-release/releases/download/v${fallbackVersion}/epubkit-${fallbackVersion}-setup.exe`,
  };

  try {
    if (cache.get("downloads")) {
      return cache.get("downloads")
    }

    console.log(cache.get("downloads"))

    const response = await fetch('https://api.github.com/repos/djyde/epubkit-release/releases/latest', {
      headers: {
        Authorization: `Bearer ${process.env.GH_TOKEN}`
      }
    })
    const data = await response.json() as {
      tag_name: string,
      assets: {
        browser_download_url: string,
        name: string
      }[]
    }
    const latestYML = data.assets.find(asset => asset.name === 'latest.yml')?.browser_download_url
    const latestYMLMac = data.assets.find(asset => asset.name === 'latest-mac.yml')?.browser_download_url

    if (latestYML && latestYMLMac) {
      const latestYMLContent = await (await fetch(latestYML)).text()
      const latestYMLMacContent = await (await fetch(latestYMLMac)).text()


      const win = YAML.parse(latestYMLContent)
      const mac = YAML.parse(latestYMLMacContent)

      const downloadLink = (version: string, fileName: string) => `https://release.randynamic.org/djyde/epubkit-release/releases/download/v${version}/${fileName}`

      const macVersion = mac.version
      const intel = mac.path
      const arm = mac.files.find(file => file.url.endsWith('-arm64-mac.zip')).url

      const winVersion = win.version
      const win64 = win.path

      const downloads = [
        {
          platform: 'Windows',
          link: downloadLink(winVersion, win64)
        },
        {
          platform: 'macOS (Intel)',
          link: downloadLink(macVersion, intel)
        },
        {
          platform: 'macOS (ARM)',
          link: downloadLink(macVersion, arm)
        }
      ]

      cache.put("downloads", downloads, 1000 * 60 * 5)

      return downloads
    }
    throw new Error("No latest.yml found")
  } catch (e) {
    // fallback
    return [
      {
        platform: 'Windows',
        link: fallbackDownloads.windows
      },
      {
        platform: 'macOS (Intel)',
        link: fallbackDownloads.mac.x64
      },
      {
        platform: 'macOS (ARM)',
        link: fallbackDownloads.mac.arm64
      }
    ]
  }
}
