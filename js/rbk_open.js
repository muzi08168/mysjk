import { Crypto, load, _, jinja2 } from './lib/cat.js';

let key = 'rbk';
let HOST = 'https://www.reboku.cc';
let siteKey = '';
let siteType = 0;

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36';

async function request(reqUrl, agentSp) {
    let res = await req(reqUrl, {
        method: 'get',
        headers: {
            'User-Agent': agentSp || UA,
            'Referer': HOST
        },
    });
    return res.content;
}

// cfg = {skey: siteKey, ext: extend}
async function init(cfg) {
    siteKey = cfg.skey;
    siteType = cfg.stype;
}

async function home(filter) {
    let classes = [{"type_id":"dy","type_name":"电影"},{"type_id":"tv","type_name":"追剧"},{"type_id":"zongyi","type_name":"综艺"},{"type_id":"dm","type_name":"动漫"}];
    let filterObj = {
         "dy":[{"key":"cateId","name":"类型","value":[{"n":"全部","v":"dy"},{"n":"动作","v":"dzp"},{"n":"喜剧","v":"xjp"},{"n":"爱情","v":"aqp"},{"n":"科幻","v":"khp"},{"n":"恐怖","v":"kbp"},{"n":"剧情","v":"jqp"},{"n":"战争","v":"zzp"},{"n":"灾难","v":"zlp"},{"n":"冒险","v":"mxp"},{"n":"奇幻","v":"qhp"},{"n":"悬疑","v":"xyp"},{"n":"惊悚","v":"jsp"},{"n":"犯罪","v":"fzp"},{"n":"动画","v":"dhp"},{"n":"其他","v":"qita"}]},{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"动作","v":"动作"},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"恐怖","v":"恐怖"},{"n":"剧情","v":"剧情"},{"n":"战争","v":"战争"},{"n":"灾难","v":"灾难"},{"n":"冒险","v":"冒险"},{"n":"奇幻","v":"奇幻"},{"n":"悬疑","v":"悬疑"},{"n":"惊悚","v":"惊悚"},{"n":"犯罪","v":"犯罪"},{"n":"动画","v":"动画"},{"n":"其他","v":"其他"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"美国","v":"美国"},{"n":"法国","v":"法国"},{"n":"英国","v":"英国"},{"n":"日本","v":"日本"},{"n":"韩国","v":"韩国"},{"n":"德国","v":"德国"},{"n":"泰国","v":"泰国"},{"n":"印度","v":"印度"},{"n":"意大利","v":"意大利"},{"n":"西班牙","v":"西班牙"},{"n":"加拿大","v":"加拿大"},{"n":"其他","v":"其他"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":" 日语","v":"日语"},{"n":"法语","v":"法语"},{"n":"德语","v":"德语"},{"n":"其它","v":"其它"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],
        "tv":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"tv"},{"n":"国产剧","v":"gcj"},{"n":"港剧","v":"xgj"},{"n":"台剧","v":"gtj"},{"n":"韩剧","v":"rhj"},{"n":"日剧","v":"rbj"},{"n":"美剧","v":"omj"},{"n":"其他剧","v":"qitaju"}]},{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"动作","v":"动作"},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"古装","v":"古装"},{"n":"恐怖","v":"恐怖"},{"n":"剧情","v":"剧情"},{"n":"战争","v":"战争"},{"n":"悬疑","v":"悬疑"},{"n":"冒险","v":"冒险"},{"n":"奇幻","v":"奇幻"},{"n":"都市","v":"都市"},{"n":"家庭","v":"家庭"},{"n":"武侠","v":"武侠"},{"n":"科幻","v":"科幻"},{"n":"历史","v":"历史"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"日本","v":"日本"},{"n":"韩国","v":"韩国"},{"n":"美国","v":"美国"},{"n":"其他","v":"其他"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"其它","v":"其它"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],
        "dm":[{"key":"cateId","name":"分类","value":[{"n":"全部","v":"dm"},{"n":"国漫","v":"gm"},{"n":"日漫","v":"rm"},{"n":"其他","v":"qtdm"}]},{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"冒险","v":"冒险"},{"n":"战斗","v":"战斗"},{"n":"搞笑","v":"搞笑"},{"n":"科幻","v":"科幻"},{"n":"恐怖","v":"恐怖"},{"n":"经典","v":"经典"},{"n":"武侠","v":"武侠"},{"n":"校园","v":"校园"},{"n":"悬疑","v":"悬疑"},{"n":"历史","v":"历史"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"国产","v":"大陆"},{"n":"日本","v":"日本"},{"n":"欧美","v":"欧美"},{"n":"其他","v":"其他"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"其它","v":"其它"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],
        "zongyi":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"脱口秀","v":"脱口秀"},{"n":"喜剧","v":"喜剧"},{"n":"真人秀","v":"真人秀"},{"n":"音乐","v":"音乐"},{"n":"职场","v":"职场"},{"n":"歌舞","v":"歌舞"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"大陆","v":"大陆"},{"n":"香港","v":"香港"},{"n":"台湾","v":"台湾"},{"n":"韩国","v":"韩国"},{"n":"日本","v":"日本"},{"n":"欧美","v":"欧美"},{"n":"其他","v":"其他"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"其它","v":"其它"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}]
	};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
    if (pg <= 0) pg = 1;
    const link = HOST + '/s/' +  (extend.cateId || tid)  + '-' + (extend.area || '') + '-' + (extend.by || 'time') + '-' + (extend.class || '') + '-' + (extend.lang || '') + '----' + pg + '---' + (extend.year || '') + '.html';//https://www.reboku.cc/s/dy-%E7%BE%8E%E5%9B%BD-hits-%E5%96%9C%E5%89%A7-%E8%8B%B1%E8%AF%AD-------2022.html
    const html = await request(link);
    const $ = load(html);
    const items = $('ul.content-list > li');
    let videos = _.map(items, (item) => {
        const it = $(item).find('a:first')[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('span.bottom2')[0]).text().trim();
        return {
            vod_id: it.attribs.href.replace(/\/v\/(.*).html/g, '$1'),
            vod_name: it.attribs.title,
            vod_pic: k.attribs['src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div.pages > a:contains(下一页)').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 24,
        total: 24 * pgCount,
        list: videos,
    });
}

async function detail(id) {
    var html = await request( HOST + '/v/' + id + '.html');
    var $ = load(html);
    var vod = {
        vod_id: id,
        vod_name: $('h1:first').text().trim(),
        vod_type: $('.otherbox').text().replace('当前为', '').replace('最后更新于', ''),
        vod_actor: $('.main-ui-meta a').text(),
        vod_pic: $('.img img:first').attr('src'),
        vod_remarks : $('.stui-content__detail p:nth-child(5)').text() || '',
        vod_content: $('.movie-introduce p:nth-child(2)').text().trim(),
    };
    var playMap = {};
    var tabs = $('ul.py-tabs > li');
    var playlists = $('ul.player');
    _.each(tabs, (tab, i) => {
        var from = tab.children[0].data.trim();
        var list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            var title = it.children[0].data;
            var playUrl = it.attribs.href.replace(/\/p\/(.*).html/g, '$1');
            if (title.length == 0) title = it.children[0].data.trim();
            if (!playMap.hasOwnProperty(from)) {
                playMap[from] = [];
            }
            playMap[from].push( title + '$' + playUrl);
        });
    });
    vod.vod_play_from = _.keys(playMap).join('$$$');
    var urls = _.values(playMap);
    var vod_play_url = _.map(urls, (urlist) => {
        return urlist.join('#');
    });
    vod.vod_play_url = vod_play_url.join('$$$');
    return JSON.stringify({
        list: [vod],
    });
}
async function play(flag, id, flags) {
    const link = HOST + '/p/' + id + '.html';
    const html = await request(link);
    const $ = load(html);
    const js = JSON.parse($('script:contains(player_)').html().replace('var player_aaaa=',''));
    const playUrl = js.url;
    return JSON.stringify({
        parse: 0,
        url: playUrl,
    });
}

async function search(wd, quick, pg) {
    if (pg <= 0) pg = 1;
    let data = await request(HOST + '/so/' + wd + '----------' + pg + '---' + '.html');//https://www.reboku.cc/so/%E6%88%91----------2---.html
    const $ = load(data);
   const items = $('div.sr_lists > dl');
    let videos = _.map(items, (item) => {
        const it = $(item).find('a')[0];
        const k = $(item).find('img:first')[0];
        const g = $(item).find('a')[1];
        const remarks = $($(item).find('span.ss1')[0]).text().trim();
        return {
            vod_id: it.attribs.href.replace(/\/v\/(.*).html/g, '$1'),
            vod_name: g.children[0].data,
            vod_pic: k.attribs['src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div.pages > a:contains(下一页)').length > 0;
    const pgCount = hasMore ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: pgCount,
        limit: 24,
        total: 24 * pgCount,
        list: videos,
    });
}

export function __jsEvalReturn() {
    return {
        init: init,
        home: home,
        homeVod: homeVod,
        category: category,
        detail: detail,
        play: play,
        search: search,
    };
}