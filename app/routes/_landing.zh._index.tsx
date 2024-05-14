import type { MetaFunction } from "@remix-run/node";

import EpubkitImportUrl from '../images/epubkit-import-url.png'
import EpubkitImportWebsite from '../images/epubkit-import-website.png'
import EpubkitImportRSS from '../images/epubkit-import-rss.png'
import EpubkitExtension from '../images/epubkit-extension.png'
import IntroImage from '../images/intro.png'
import { config } from "~/config";
import { showDownloadModal } from "./_landing";

export const meta: MetaFunction = () => {
  return [
    { title: "EpubKit - 最好的网页转电子书工具" },
    { name: "description", content: "最好的网页转电子书工具" },
  ];
};

const features = [
  {
    title: "网页转电子书",
    description: "把一个或多个 URL 合并保存，导出为 ePub 电子书",
    img: EpubkitImportUrl
  },
  {
    title: "一键保存网站内链接",
    description: "想在 Kindle 读你喜欢的博客？批量选择网站内所有链接保存为电子书",
    img: EpubkitImportWebsite,
  },
  {
    title: "RSS 转电子书",
    description: "获取你喜欢的 RSS 信息源文章，批量选择文章保存为电子书",
    img: EpubkitImportRSS
  },
  {
    title: "在浏览器中保存网页",
    description: "安装浏览器插件，保存当前浏览网页",
    img: EpubkitExtension
  }
]

const qna = [
  {
    q: "EpubKit 可以保存需要登录的内容吗？",
    a: "可以使用浏览器插件保存你在登录后看到的页面内容。或在 EpubKit 软件中的「浏览器」功能中先登录后再导入链接。"
  },
  {
    q: "我的内容会被上传到服务器吗？",
    a: "不会。所有内容的处理均在你的设备上进行，内容不经过任何服务器。"
  }
]

const pricing = [
  {
    title: "免费",
    price: "$0",
    description: "免费使用",
    features: [
      "每本电子书最多可导出 10 个页面",
      "自定义封面",
      "浏览器插件",
    ]
  },
  {
    title: "Pro",
    price: "$12",
    description: "一次性付款",
    features: [
      "无限制导出页面",
      "自定义封面",
      "浏览器插件",
      "一台设备激活",
      "一年版本更新",
    ]
  },
  {
    title: "Lifetime",
    price: "$29",
    originalPrice: "$39",
    features: [
      "无限制导出页面",
      "自定义封面",
      "浏览器插件",
      "两台设备激活",
      "终身版本更新",
    ],
    description: "一次性付款"
  }
]

export default function Index() {

  return (
    <div className="">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-black max-w-[700px] inline-block">最好的<span className="text-primary">网页转电子书</span>工具</h2>
        <h3 className="text-2xl text-base-content/80 font-black">把网页、在线书、RSS 文章保存为电子书，用你喜欢的阅读器沉浸式阅读。</h3>
      </div>

      <section className="text-center mt-12">
        <div className="flex flex-col gap-3">
          <div>
            <button className="btn btn-primary rounded-full" type="button" onClick={showDownloadModal}>立即下载</button>
          </div>
          <small>支持 macOS, Windows</small>
        </div>
      </section>


      <section>
        <div className="mt-12">
          <img src={IntroImage} alt="" />
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
        <h2 className="text-3xl text-center font-medium mb-12">价格</h2>
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
                      <button className="btn  rounded-full w-full btn-sm" type="button" onClick={showDownloadModal}>立即下载</button>
                    </>
                  ) : (
                    <a href={config.buyLink} target="_blank" className="btn btn-primary rounded-full w-full btn-sm" type="button" rel="noreferrer">购买</a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

      </section >

      <hr className="my-24" />

      <section id="faq">
        <h2 className="text-3xl text-center font-medium mb-12">常见问题</h2>
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
