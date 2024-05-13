import { Outlet, json, useLoaderData } from "@remix-run/react";
import { config } from "~/config";
import { FaApple, FaChrome, FaEdge, FaFirefox, FaWindows } from 'react-icons/fa'
import type { LoaderFunctionArgs } from "@remix-run/node";
import YAML from 'yaml'
import { getDownloads } from "~/utils.server";

export function showDownloadModal() {
  const modal = document.querySelector('#download_modal') as HTMLDialogElement
  if (modal) {
    modal.showModal()
  }
}

export const loader = async (c: LoaderFunctionArgs) => {
  const downloads = await getDownloads()
  return json({ downloads })
}

export default function LandingPage() {
  const loaderData = useLoaderData<typeof loader>()
  return (
    <div className="max-w-[1280px] mx-auto">
      <dialog id="download_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Download EpubKit</h3>
          <div className="mt-3">
            <ul className="space-y-1">
              {loaderData.downloads.map(download => (
                <li key={download.platform}>
                  <a href={download.link} target="_blank" rel="noreferrer" className="flex items-center gap-2" >
                    {download.platform.startsWith("mac") && <FaApple />}
                    {download.platform.startsWith("Windows") && <FaWindows />}
                    {download.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>

      <nav className="mb-24">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <details>
                    <summary>Browser Extension</summary>
                    <ul className="p-2">
                      <li>
                        <a href={config.extension.chrome.link} target="_blank" rel="noreferrer">
                          <FaChrome />
                          Chrome
                        </a>
                      </li>
                      <li>
                        <a href={config.extension.edge.link} target="_blank" rel="noreferrer">
                          <FaEdge />
                          Edge
                        </a>
                      </li>
                      <li>
                        <a href={config.extension.firefox.link} target="_blank" rel="noreferrer">
                          <FaFirefox />
                          Firefox
                        </a>
                      </li>
                    </ul>
                  </details>
                </li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="/zh">中文</a></li>
              </ul>
            </div>
            <a className="btn btn-ghost text-xl" href="/">EpubKit</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary>Browser Extension</summary>
                  <ul className="p-2">
                    <li>
                      <a href={config.extension.chrome.link} target="_blank" rel="noreferrer">
                        <FaChrome />
                        Chrome
                      </a>
                    </li>
                    <li>
                      <a href={config.extension.edge.link} target="_blank" rel="noreferrer">
                        <FaEdge />
                        Edge
                      </a>
                    </li>
                    <li>
                      <a href={config.extension.firefox.link} target="_blank" rel="noreferrer">
                        <FaFirefox />
                        Firefox
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/zh">中文</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn" type="button" onClick={showDownloadModal}>Try it now</button>
          </div>
        </div>
      </nav>

      <div className="max-w-[960px] mx-auto px-8">
        <Outlet />
      </div>

      <footer className="max-w-[960px] mx-auto px-8 my-24 lg:my-48">
        <div className="mb-6">
          <strong>EpubKit</strong>
        </div>
        <div className="grid md:grid-cols-3">
          <div className="space-y-3">
            <div>
              <a className="" target="_blank" href="https://randynamic.org" rel="noreferrer"
              >Randynamic Studio</a
              >
            </div>
            <div>
              <a target="_blank" href="https://twitter.com/epubkitapp" rel="noreferrer">Twitter</a>
            </div>
            <div>
              <a target="_blank" href="https://tally.so/r/3jBb56" rel="noreferrer">Feedback</a>
            </div>
            <div>
              <a target="_blank" href="https://t.me/+DBzD7rAdsUI0OWQ1" rel="noreferrer"
              >Telegram Group</a
              >
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}