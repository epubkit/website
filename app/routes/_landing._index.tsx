import type { MetaFunction } from "@remix-run/node";

import EpubkitImportUrl from '../images/epubkit-import-url.png'
import EpubkitImportWebsite from '../images/epubkit-import-website.png'
import EpubkitImportRSS from '../images/epubkit-import-rss.png'
import EpubkitExtension from '../images/epubkit-extension.png'
import { config } from "~/config";
import { showDownloadModal } from "./_landing";

export const meta: MetaFunction = () => {
  return [
    { title: "EpubKit - The best tool to convert web page to ebook" },
    { name: "description", content: "The best tool to convert web page to ebook" },
  ];
};

const features = [
  {
    title: "Webpage to eBook",
    description: "Merge and save one or more URLs, export as ePub eBook",
    img: EpubkitImportUrl
  },
  {
    title: "Save All Links from a Website with One Click",
    description: "Want to read your favorite blogs on Kindle? Select all links within the site in bulk and save as eBook",
    img: EpubkitImportWebsite
  },
  {
    title: "RSS to eBook",
    description: "Get articles from your favorite RSS feeds and select in bulk to save as eBook",
    img: EpubkitImportRSS
  },
  {
    title: "Save Web Pages in Browser",
    description: "Install browser plugin to save the current browsing webpage",
    img: EpubkitExtension
  }
]


const qna = [
  {
    q: "Can EpubKit save content that requires login?",
    a: "You can use the browser plugin to save the page content you see after logging in. Or log in first using the 'Browser' feature in the EpubKit software and then import the link."
  },
  {
    q: "Will my content be uploaded to the server?",
    a: "No. All content processing is done on your device, and the content does not pass through any server."
  }
]


const pricing = [
  {
    title: "Free",
    price: "$0",
    description: "Free to use",
    features: [
      "Export up to 10 pages per eBook",
      "Custom cover",
      "Browser plugin"
    ]
  },
  {
    title: "Pro",
    price: "$12",
    description: "One-time payment",
    features: [
      "Unlimited page export",
      "Custom cover",
      "Browser plugin",
      "Activate on one device",
      "One year of version updates"
    ]
  },
  {
    title: "Lifetime",
    price: "$29",
    originalPrice: "$39",
    features: [
      "Unlimited page export",
      "Custom cover",
      "Browser plugin",
      "Activate on two devices",
      "Lifetime version updates"
    ],
    description: "One-time payment"
  }
]


export default function Index() {

  return (
    <div className="">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-black max-w-[700px] inline-block">The best tool to <span className="text-primary">convert web to ebook</span></h2>
        <h3 className="text-2xl text-base-content/80 font-black">Save web pages, Online books, and RSS articles as e-books</h3>
      </div>

      <section className="text-center mt-12">
        <div className="flex flex-col gap-3">
          <div>
            <button className="btn btn-primary rounded-full" type="button" onClick={showDownloadModal}>Download</button>
          </div>
          <small>Support macOS, Windows</small>
        </div>
      </section>

      <hr className="my-24" />

      <div className="space-y-24">
        {features.map((feature, index) => (
          <section key={feature.title}>
            <div className="space-y-6">
              <h2 className="text-center text-4xl font-black">{feature.title}</h2>
              <h3 className="text-center text-base-content/80 text-lg font-medium">{feature.description}</h3>
            </div>

            <div className="mt-6">
              <img src={feature.img} alt="" />
            </div>
          </section>
        ))}
      </div>

      <hr className="my-24" />

      <section id="pricing">
        <h2 className="text-3xl text-center font-medium mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map(item => {
            return (
              <div key={item.title} className="border rounded-xl p-6 space-y-3">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <div className="text-4xl font-bold text-base-content/60">
                  {item.originalPrice && <span className="line-through mr-3">{item.originalPrice}</span>}
                  {item.price}
                </div>
                <div className="text-base-content/80">
                  <i>
                    {item.description}
                  </i>
                </div>
                <div>
                  <ul className="list-disc px-6 mt-6 text-base-content/80 space-y-1">
                    {item.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  {item.price === "$0" ? (
                    <>
                      <button className="btn  rounded-full w-full btn-sm" type="button" onClick={showDownloadModal}>Try now</button>
                    </>
                  ) : (
                    <a href={config.buyLink} target="_blank" className="btn btn-primary rounded-full w-full btn-sm" type="button" rel="noreferrer">Buy</a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </section >

      <hr className="my-24" />

      <section id="faq">
        <h2 className="text-3xl text-center font-medium mb-12">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {qna.map(item => {
            return (
              <div key={item.q} className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="qna" />
                <div className="collapse-title text-xl font-medium">
                  {item.q}
                </div>
                <div className="collapse-content">
                  {item.a}
                </div>
              </div>
            )
          })}
        </div>

      </section>

    </div >
  );
}
