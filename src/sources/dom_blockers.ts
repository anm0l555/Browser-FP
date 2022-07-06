import { isAndroid, isWebKit } from '../utils/browser'
import { selectorToElement } from '../utils/dom'
import { countTruthy } from '../utils/data'
import { wait } from '../utils/async'

/**
 * Only single element selector are supported (no operators like space, +, >, etc).
 * `embed` and `position: fixed;` will be considered as blocked anyway because it always has no offsetParent.
 * Avoid `iframe` and anything with `[src=]` because they produce excess HTTP requests.
 *
 * See docs/content_blockers.md to learn how to make the list
 */
export const filters = {
  abpIndo: [
    '#Iklan-Melayang',
    '#Kolom-Iklan-728',
    '#SidebarIklan-wrapper',
    'a[title="7naga poker" i]',
    '[title="ALIENBOLA" i]',
  ],
  abpvn: [
    '#quangcaomb',
    '.iosAdsiosAds-layout',
    '.quangcao',
    '[href^="https://r88.vn/"]',
    '[href^="https://zbet.vn/"]',
  ],
  adBlockFinland: [
    '.mainostila',
    '.sponsorit',
    '.ylamainos',
    'a[href*="/clickthrgh.asp?"]',
    'a[href^="https://app.readpeak.com/ads"]',
  ],
  adBlockPersian: [
    '#navbar_notice_50',
    'a[href^="http://g1.v.fwmrm.net/ad/"]',
    '.kadr',
    'TABLE[width="140px"]',
    '#divAgahi',
  ],
  adBlockWarningRemoval: ['#adblock-honeypot', '.adblocker-root', '.wp_adblock_detect'],
  adGuardAnnoyances: ['amp-embed[type="zen"]', '.hs-sosyal', '#cookieconsentdiv', 'div[class^="app_gdpr"]', '.as-oil'],
  adGuardBase: ['#ad-after', '#ad-p3', '.BetterJsPopOverlay', '#ad_300X250', '#bannerfloat22'],
  adGuardChinese: [
    // Disabled because not reproducible. Will be replaced during the next filter update.
    // '#piao_div_0[style*="width:140px;"]',
    'a[href*=".ttz5.cn"]',
    'a[href*=".yabovip2027.com/"]',
    '.tm3all2h4b',
    '.cc5278_banner_ad',
  ],
  adGuardFrench: [
    '.zonepub',
    '[class*="_adLeaderboard"]',
    '[id^="block-xiti_oas-"]',
    'a[href^="http://ptapjmp.com/"]',
    'a[href^="https://go.alvexo.com/"]',
  ],
  adGuardGerman: [
    '.banneritemwerbung_head_1',
    '.boxstartwerbung',
    '.werbung3',
    'a[href^="http://www.eis.de/index.phtml?refid="]',
    'a[href^="https://www.tipico.com/?affiliateId="]',
  ],
  adGuardJapanese: [
    '#kauli_yad_1',
    '#ad-giftext',
    '#adsSPRBlock',
    'a[href^="http://ad2.trafficgate.net/"]',
    'a[href^="http://www.rssad.jp/"]',
  ],
  adGuardMobile: ['amp-auto-ads', '#mgid_iframe', '.amp_ad', 'amp-embed[type="24smi"]', '#mgid_iframe1'],
  adGuardRussian: [
    'a[href^="https://ya-distrib.ru/r/"]',
    'a[href^="https://ad.letmeads.com/"]',
    '.reclama',
    'div[id^="smi2adblock"]',
    'div[id^="AdFox_banner_"]',
  ],
  adGuardSocial: [
    'a[href^="//www.stumbleupon.com/submit?url="]',
    'a[href^="//telegram.me/share/url?"]',
    '.etsy-tweet',
    '#inlineShare',
    '.popup-social',
  ],
  adGuardSpanishPortuguese: [
    '#barraPublicidade',
    '#Publicidade',
    '#publiEspecial',
    '#queTooltip',
    '[href^="http://ads.glispa.com/"]',
  ],
  adGuardTrackingProtection: [
    'amp-embed[type="taboola"]',
    '#qoo-counter',
    'a[href^="http://click.hotlog.ru/"]',
    'a[href^="http://hitcounter.ru/top/stat.php"]',
    'a[href^="http://top.mail.ru/jump"]',
  ],
  adGuardTurkish: [
    '#backkapat',
    '#reklami',
    'a[href^="http://adserv.ontek.com.tr/"]',
    'a[href^="http://izlenzi.com/campaign/"]',
    'a[href^="http://www.installads.net/"]',
  ],
  bulgarian: ['td#freenet_table_ads', '#adbody', '#ea_intext_div', '.lapni-pop-over', '#xenium_hot_offers'],
  easyList: ['#AD_banner_bottom', '#Ads_google_02', '#N-ad-article-rightRail-1', '#ad-fullbanner2', '#ad-zone-2'],
  easyListChina: [
    'a[href*=".wensixuetang.com/"]',
    'A[href*="/hth107.com/"]',
    '.appguide-wrap[onclick*="bcebos.com"]',
    '.frontpageAdvM',
    '#taotaole',
  ],
  easyListCookie: ['#adtoniq-msg-bar', '#CoockiesPage', '#CookieModal_cookiemodal', '#DO_CC_PANEL', '#ShowCookie'],
  easyListCzechSlovak: ['#onlajny-stickers', '#reklamni-box', '.reklama-megaboard', '.sklik', '[id^="sklikReklama"]'],
  easyListDutch: [
    '#advertentie',
    '#vipAdmarktBannerBlock',
    '.adstekst',
    'a[href^="https://xltube.nl/click/"]',
    '#semilo-lrectangle',
  ],
  easyListGermany: [
    'a[href^="http://www.hw-area.com/?dp="]',
    'a[href^="https://ads.sunmaker.com/tracking.php?"]',
    '.werbung-skyscraper2',
    '.bannergroup_werbung',
    '.ads_rechts',
  ],
  easyListItaly: [
    '.box_adv_annunci',
    '.sb-box-pubbliredazionale',
    'a[href^="http://affiliazioniads.snai.it/"]',
    'a[href^="https://adserver.html.it/"]',
    'a[href^="https://affiliazioniads.snai.it/"]',
  ],
  easyListLithuania: [
    '.reklamos_tarpas',
    '.reklamos_nuorodos',
    'img[alt="Reklaminis skydelis"]',
    'img[alt="Dedikuoti.lt serveriai"]',
    'img[alt="Hostingas Serveriai.lt"]',
  ],
  estonian: ['A[href*="http://pay4results24.eu"]'],
  fanboyAnnoyances: [
    '#feedback-tab',
    '#taboola-below-article',
    '.feedburnerFeedBlock',
    '.widget-feedburner-counter',
    '[title="Subscribe to our blog"]',
  ],
  fanboyAntiFacebook: ['.util-bar-module-firefly-visible'],
  fanboyEnhancedTrackers: [
    '.open.pushModal',
    '#issuem-leaky-paywall-articles-zero-remaining-nag',
    '#sovrn_container',
    'div[class$="-hide"][zoompage-fontsize][style="display: block;"]',
    '.BlockNag__Card',
  ],
  fanboySocial: [
    '.td-tags-and-social-wrapper-box',
    '.twitterContainer',
    '.youtube-social',
    'a[title^="Like us on Facebook"]',
    'img[alt^="Share on Digg"]',
  ],
  frellwitSwedish: [
    'a[href*="casinopro.se"][target="_blank"]',
    'a[href*="doktor-se.onelink.me"]',
    'article.category-samarbete',
    'div.holidAds',
    'ul.adsmodern',
  ],
  greekAdBlock: [
    'A[href*="adman.otenet.gr/click?"]',
    'A[href*="http://axiabanners.exodus.gr/"]',
    'A[href*="http://interactive.forthnet.gr/click?"]',
    'DIV.agores300',
    'TABLE.advright',
  ],
  hungarian: [
    'A[href*="ad.eval.hu"]',
    'A[href*="ad.netmedia.hu"]',
    'A[href*="daserver.ultraweb.hu"]',
    '#cemp_doboz',
    '.optimonk-iframe-container',
  ],
  iDontCareAboutCookies: [
    '.alert-info[data-block-track*="CookieNotice"]',
    '.ModuleTemplateCookieIndicator',
    '.o--cookies--container',
    '.cookie-msg-info-container',
    '#cookies-policy-sticky',
  ],
  icelandicAbp: ['A[href^="/framework/resources/forms/ads.aspx"]'],
  latvian: [
    'a[href="http://www.salidzini.lv/"][style="display: block; width: 120px; height: 40px; overflow: hidden; position: relative;"]',
    'a[href="http://www.salidzini.lv/"][style="display: block; width: 88px; height: 31px; overflow: hidden; position: relative;"]',
  ],
  listKr: [
    'a[href*="//kingtoon.slnk.kr"]',
    'a[href*="//playdsb.com/kr"]',
    'div.logly-lift-adz',
    'div[data-widget_id="ml6EJ074"]',
    'ins.daum_ddn_area',
  ],
  listeAr: [
    '.geminiLB1Ad',
    '.right-and-left-sponsers',
    'a[href*=".aflam.info"]',
    'a[href*="booraq.org"]',
    'a[href*="dubizzle.com/ar/?utm_source="]',
  ],
  listeFr: [
    'a[href^="http://promo.vador.com/"]',
    '#adcontainer_recherche',
    'a[href*="weborama.fr/fcgi-bin/"]',
    '.site-pub-interstitiel',
    'div[id^="crt-"][data-criteo-id]',
  ],
  officialPolish: [
    '#ceneo-placeholder-ceneo-12',
    '[href^="https://aff.sendhub.pl/"]',
    'a[href^="http://advmanager.techfun.pl/redirect/"]',
    'a[href^="http://www.trizer.pl/?utm_source"]',
    'div#skapiec_ad',
  ],
  ro: [
    'a[href^="//afftrk.altex.ro/Counter/Click"]',
    'a[href^="/magazin/"]',
    'a[href^="https://blackfridaysales.ro/trk/shop/"]',
    'a[href^="https://event.2performant.com/events/click"]',
    'a[href^="https://l.profitshare.ro/"]',
  ],
  ruAd: [
    'a[href*="//febrare.ru/"]',
    'a[href*="//utimg.ru/"]',
    'a[href*="://chikidiki.ru"]',
    '#pgeldiz',
    '.yandex-rtb-block',
  ],
  thaiAds: ['a[href*=macau-uta-popup]', '#ads-google-middle_rectangle-group', '.ads300s', '.bumq', '.img-kosana'],
  webAnnoyancesUltralist: [
    '#mod-social-share-2',
    '#social-tools',
    '.ctpl-fullbanner',
    '.zergnet-recommend',
    '.yt.btn-link.btn-md.btn',
  ],
}

interface Options {
  debug?: boolean
}

/**
 * The order of the returned array means nothing (it's always sorted alphabetically).
 *
 * Notice that the source is slightly unstable.
 * Safari provides a 2-taps way to disable all content blockers on a page temporarily.
 * Also content blockers can be disabled permanently for a domain, but it requires 4 taps.
 * So empty array shouldn't be treated as "no blockers", it should be treated as "no signal".
 * If you are a website owner, don't make your visitors want to disable content blockers.
 */
export default async function getDomBlockers({ debug }: Options = {}): Promise<string[] | undefined> {
  if (!isApplicable()) {
    return undefined
  }

  const filterNames = Object.keys(filters) as Array<keyof typeof filters>
  const allSelectors = ([] as string[]).concat(...filterNames.map((filterName) => filters[filterName]))
  const blockedSelectors = await getBlockedSelectors(allSelectors)

  if (debug) {
    printDebug(blockedSelectors)
  }

  const activeBlockers = filterNames.filter((filterName) => {
    const selectors = filters[filterName]
    const blockedCount = countTruthy(selectors.map((selector) => blockedSelectors[selector]))
    return blockedCount > selectors.length * 0.6
  })
  activeBlockers.sort()

  return activeBlockers
}

export function isApplicable(): boolean {
  // Safari (desktop and mobile) and all Android browsers keep content blockers in both regular and private mode
  return isWebKit() || isAndroid()
}

export async function getBlockedSelectors<T extends string>(selectors: readonly T[]): Promise<{ [K in T]?: true }> {
  const d = document
  const root = d.createElement('div')
  const elements = new Array<HTMLElement>(selectors.length)
  const blockedSelectors: { [K in T]?: true } = {} // Set() isn't used just in case somebody need older browser support

  forceShow(root)

  // First create all elements that can be blocked. If the DOM steps below are done in a single cycle,
  // browser will alternate tree modification and layout reading, that is very slow.
  for (let i = 0; i < selectors.length; ++i) {
    const element = selectorToElement(selectors[i])
    const holder = d.createElement('div') // Protects from unwanted effects of `+` and `~` selectors of filters
    forceShow(holder)
    holder.appendChild(element)
    root.appendChild(holder)
    elements[i] = element
  }

  // document.body can be null while the page is loading
  while (!d.body) {
    await wait(50)
  }
  d.body.appendChild(root)

  try {
    // Then check which of the elements are blocked
    for (let i = 0; i < selectors.length; ++i) {
      if (!elements[i].offsetParent) {
        blockedSelectors[selectors[i]] = true
      }
    }
  } finally {
    // Then remove the elements
    root.parentNode?.removeChild(root)
  }

  return blockedSelectors
}

function forceShow(element: HTMLElement) {
  element.style.setProperty('display', 'block', 'important')
}

function printDebug(blockedSelectors: { [K in string]?: true }) {
  let message = 'DOM blockers debug:\n```'
  for (const filterName of Object.keys(filters) as Array<keyof typeof filters>) {
    message += `\n${filterName}:`
    for (const selector of filters[filterName]) {
      message += `\n  ${selector} ${blockedSelectors[selector] ? '🚫' : '➡️'}`
    }
  }
  // console.log is ok here because it's under a debug clause
  // eslint-disable-next-line no-console
  console.log(`${message}\n\`\`\``)
}
