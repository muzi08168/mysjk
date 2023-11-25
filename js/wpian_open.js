import { Crypto, load, _ } from './lib/cat.js';

let key = 'wpian';
let HOST = 'https://waipian20.com';//歪片星球.com
let siteKey = '';
let siteType = 0;

const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E230 Safari/601.1';

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
    let classes = [{"type_id":"show-dianying","type_name":"电影"},{"type_id":"show-juji","type_name":"追剧"},{"type_id":"show-zongyi","type_name":"综艺"},{"type_id":"show-dongman","type_name":"动漫"},{"type_id":"show-jilupian","type_name":"纪录片"}];
    let filterObj = {
        "show-dianying":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"剧情","v":"剧情"},{"n":"喜剧","v":"喜剧"},{"n":"动作","v":"动作"},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"动画","v":"动画"},{"n":"悬疑","v":"悬疑"},{"n":"惊悚","v":"惊悚"},{"n":"恐怖","v":"恐怖"},{"n":"犯罪","v":"犯罪"},{"n":"同性","v":"同性"},{"n":"战争","v":"战争"},{"n":"奇幻","v":"奇幻"},{"n":"冒险","v":"冒险"},{"n":"灾难","v":"灾难"},{"n":"武侠","v":"武侠"},{"n":"古装","v":"古装"},{"n":"短片","v":"短片"},{"n":"Netflix","v":"Netflix"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"美国","v":"美国"},{"n":"韩国","v":"韩国"},{"n":"日本","v":"日本"},{"n":"泰国","v":"泰国"},{"n":"新加坡","v":"新加坡"},{"n":"马来西亚","v":"马来西亚"},{"n":"印度","v":"印度"},{"n":"英国","v":"英国"},{"n":"法国","v":"法国"},{"n":"加拿大","v":"加拿大"},{"n":"俄罗斯","v":"俄罗斯"},{"n":"澳大利亚","v":"澳大利亚"}]},{"key":"by","name":"排序","value":[{"n":"更新时间","v":"time"},{"n":"最多播放","v":"hits"},{"n":"实时热门","v":"hits_day"},{"n":"近期热播","v":"hits_week"},{"n":"新片上线","v":"year"}]}],
        "show-juji":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"剧情","v":"剧情"},{"n":"喜剧","v":"喜剧"},{"n":"动作","v":"动作"},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"悬疑","v":"悬疑"},{"n":"惊悚","v":"惊悚"},{"n":"恐怖","v":"恐怖"},{"n":"犯罪","v":"犯罪"},{"n":"同性","v":"同性"},{"n":"历史","v":"历史"},{"n":"战争","v":"战争"},{"n":"奇幻","v":"奇幻"},{"n":"冒险","v":"冒险"},{"n":"灾难","v":"灾难"},{"n":"武侠","v":"武侠"},{"n":"古装","v":"古装"},{"n":"都市","v":"都市"},{"n":"情景","v":"情景"},{"n":"家庭","v":"家庭"},{"n":"短剧","v":"短剧"},{"n":"Netflix","v":"Netflix"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"韩国","v":"韩国"},{"n":"日本","v":"日本"},{"n":"美国","v":"美国"},{"n":"英国","v":"英国"},{"n":"澳大利亚","v":"澳大利亚"},{"n":"西班牙","v":"西班牙"},{"n":"泰国","v":"泰国"},{"n":"印度","v":"印度"},{"n":"新加坡","v":"新加坡"},{"n":"马来西亚","v":"马来西亚"}]},{"key":"by","name":"排序","value":[{"n":"更新时间","v":"time"},{"n":"最多播放","v":"hits"},{"n":"实时热门","v":"hits_day"},{"n":"近期热播","v":"hits_week"},{"n":"新片上线","v":"year"}]}],
        "show-zongyi":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"音乐","v":"音乐"},{"n":"歌舞","v":"歌舞"},{"n":"运动","v":"运动"},{"n":"真人秀","v":"真人秀"},{"n":"旅游","v":"旅游"},{"n":"美食","v":"美食"},{"n":"Netflix","v":"Netflix"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"日本","v":"日本"},{"n":"美国","v":"美国"},{"n":"韩国","v":"韩国"}]},{"key":"by","name":"排序","value":[{"n":"更新时间","v":"time"},{"n":"最多播放","v":"hits"},{"n":"实时热门","v":"hits_day"},{"n":"近期热播","v":"hits_week"},{"n":"新片上线","v":"year"}]}],
        "show-dongman":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"剧情","v":"剧情"},{"n":"喜剧","v":"喜剧"},{"n":"动作","v":"动作"},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"动画","v":"动画"},{"n":"悬疑","v":"悬疑"},{"n":"惊悚","v":"惊悚"},{"n":"恐怖","v":"恐怖"},{"n":"犯罪","v":"犯罪"},{"n":"同性","v":"同性"},{"n":"战争","v":"战争"},{"n":"冒险","v":"冒险"},{"n":"灾难","v":"灾难"},{"n":"Netflix","v":"Netflix"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"日本","v":"日本"},{"n":"美国","v":"美国"},{"n":"韩国","v":"韩国"}]},{"key":"by","name":"排序","value":[{"n":"更新时间","v":"time"},{"n":"最多播放","v":"hits"},{"n":"实时热门","v":"hits_day"},{"n":"近期热播","v":"hits_week"},{"n":"新片上线","v":"year"}]}],
        "show-jilupian":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"传记","v":"传记"},{"n":"历史","v":"历史"},{"n":"纪录","v":"纪录"},{"n":"Netflix","v":"Netflix"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"中国大陆","v":"中国大陆"},{"n":"中国香港","v":"中国香港"},{"n":"中国台湾","v":"中国台湾"},{"n":"日本","v":"日本"},{"n":"美国","v":"美国"}]},{"key":"by","name":"排序","value":[{"n":"更新时间","v":"time"},{"n":"最多播放","v":"hits"},{"n":"实时热门","v":"hits_day"},{"n":"近期热播","v":"hits_week"},{"n":"新片上线","v":"year"}]}]
	};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
    if (pg <= 0) pg = 1;
    const link = HOST + '/' + tid + '-' + (extend.area || '') + '-' + (extend.by || 'time') + '-' + (extend.class || '') + '-----' + pg + '---' + (extend.year || '') + '/';//https://waipian20.com/show-juji-%E7%BE%8E%E5%9B%BD-time-%E5%8A%A8%E4%BD%9C--------2022/
    const html = await request(link);
    const $ = load(html);
    const items = $('div.module-items > a');
    let videos = _.map(items, (item) => {
        const it = $(item)[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('div.module-item-note')[0]).text().trim();
        return {
            vod_id: it.attribs.href,
            vod_name: it.attribs.title,
            vod_pic: k.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div#page > a:contains(下一页)').length > 0;
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
    const html = await request( HOST + id);
    const $ = load(html);
    const vod = {
        vod_id: id,
        vod_name: $('h1:first').text().trim(),
        vod_type: $('.module-info-tag a').text(),
        vod_actor: $('.module-info-item-content a').text(),
        vod_pic: $('.module-info img:first').attr('data-src'),
        vod_remarks : $('.stui-content__detail p:nth-child(5)').text() || '',
        vod_content: $('.module-info-introduction-content').text().trim(),
    };
    let playMap = {};
    const tabs = $('div.module-tab-items-box > div.tab-item > span');
    const playlists = $('div.module-play-list-content');
    _.each(tabs, (tab, i) => {
        const from = tab.children[0].data;
        let list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            const title = it.attribs.title;
            const playUrl = it.attribs.href;
            if (title.length == 0) title = it.children[0].data.trim();
            if (!playMap.hasOwnProperty(from)) {
                playMap[from] = [];
            }
            playMap[from].push( title + '$' + playUrl);
        });
    });
    vod.vod_play_from = _.keys(playMap).join('$$$');
    const urls = _.values(playMap);
    let vod_play_url = _.map(urls, (urlist) => {
        return urlist.join('#');
    });
    vod.vod_play_url = vod_play_url.join('$$$');
    return JSON.stringify({
        list: [vod],
    });
}
async function play(flag, id, flags) {
    const link = HOST + id;
    const html = await request(link);
    const $ = load(html);
    const js = JSON.parse($('script:contains(player_)').html().replace('var player_aaaa=',''));
    const playurl = unescape(js.url);
    const playUrl = playurl.replace(/(.*?)&w.*&.*/g, '$1');
    return JSON.stringify({
        parse: 0,
        url: playUrl,
    });
}

function base64Encode(text) {
    return Crypto.enc.Base64.stringify(Crypto.enc.Utf8.parse(text));
}

function base64Decode(text) {
    return Crypto.enc.Utf8.stringify(Crypto.enc.Base64.parse(text));
}
async function search(wd, quick, pg) {
    if (pg <= 0) pg = 1;
    let data = await request(HOST + '/search-' + wd + '----------' + pg + '---' + '/');//https://waipian20.com/search-%E6%88%91----------2---/
    const $ = load(data);
    const items = $('div.module-items > div.module-item');
    let videos = _.map(items, (item) => {
        const it = $(item).find('a:first')[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('div.module-item-note')[0]).text().trim();
        return {
            vod_id: it.attribs.href,
            vod_name: k.attribs.alt,
            vod_pic: k.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div#page > a:contains(下一页)').length > 0;
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