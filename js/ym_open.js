import { Crypto, load, _, jinja2 } from './lib/cat.js';

let key = 'ym';
let HOST = 'https://www.inmi.app';
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
    let classes = [{"type_id":"uCCCCS-","type_name":"电影"},{"type_id":"0CCCCS--","type_name":"追剧"},{"type_id":"PCCCCS-","type_name":"综艺"},{"type_id":"HCCCCS-","type_name":"动漫"}];
    let filterObj = {
         "uCCCCS-":[{"key":"class","name":"劇情","value":[{"n":"全部","v":""},{"n":"爱情","v":"/class/爱情"},{"n":"动作","v":"/class/动作"},{"n":"喜剧","v":"/class/喜剧"},{"n":"战争","v":"/class/战争"},{"n":"科幻","v":"/class/科幻"},{"n":"剧情","v":"/class/剧情"},{"n":"武侠","v":"/class/武侠"},{"n":"冒险","v":"/class/冒险"},{"n":"枪战","v":"/class/枪战"},{"n":"恐怖","v":"/class/恐怖"},{"n":"微电影","v":"/class/微电影"},{"n":"其它","v":"/class/其它"}]},{"key":"area","name":"地區","value":[{"n":"全部","v":""},{"n":"大陸","v":"/area/大陸"},{"n":"香港","v":"/area/香港"},{"n":"台灣","v":"/area/台灣"},{"n":"美國","v":"/area/美國"},{"n":"韓國","v":"/area/韓國"},{"n":"日本","v":"/area/日本"},{"n":"泰國","v":"/area/泰國"},{"n":"新加坡","v":"/area/新加坡"},{"n":"馬來西亞","v":"/area/馬來西亞"},{"n":"印度","v":"/area/印度"},{"n":"英國","v":"/area/英國"},{"n":"法國","v":"/area/法國"},{"n":"加拿大","v":"/area/加拿大"},{"n":"西班牙","v":"/area/西班牙"},{"n":"俄羅斯","v":"/area/俄羅斯"},{"n":"其它","v":"/area/其它"}]},{"key":"lang","name":"語言","value":[{"n":"全部","v":""},{"n":"國語","v":"/lang/國語"},{"n":"英語","v":"/lang/英語"},{"n":"粵語","v":"/lang/粵語"},{"n":"閩南語","v":"/lang/閩南語"},{"n":"韓語","v":"/lang/韓語"},{"n":"日語","v":"/lang/日語"},{"n":"法語","v":"/lang/法語"},{"n":"德語","v":"/lang/德語"},{"n":"泰語","v":"/lang/泰語"},{"n":"俄語","v":"/lang/俄語"},{"n":"其它","v":"/lang/其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"},{"n":"2002","v":"2002"},{"n":"2001","v":"2001"},{"n":"2000","v":"2000"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"時間","v":"/by/time"},{"n":"人氣","v":"/by/hits"},{"n":"評分","v":"/by/score"}]}],
        "0CCCCS-":[{"key":"class","name":"劇情","value":[{"n":"全部","v":""},{"n":"爱情","v":"/class/爱情"},{"n":"动作","v":"/class/动作"},{"n":"喜剧","v":"/class/喜剧"},{"n":"战争","v":"/class/战争"},{"n":"科幻","v":"/class/科幻"},{"n":"剧情","v":"/class/剧情"},{"n":"武侠","v":"/class/武侠"},{"n":"冒险","v":"/class/冒险"},{"n":"枪战","v":"/class/枪战"},{"n":"恐怖","v":"/class/恐怖"},{"n":"微电影","v":"/class/微电影"},{"n":"其它","v":"/class/其它"}]},{"key":"area","name":"地區","value":[{"n":"全部","v":""},{"n":"大陸","v":"/area/大陸"},{"n":"香港","v":"/area/香港"},{"n":"台灣","v":"/area/台灣"},{"n":"美國","v":"/area/美國"},{"n":"韓國","v":"/area/韓國"},{"n":"日本","v":"/area/日本"},{"n":"泰國","v":"/area/泰國"},{"n":"新加坡","v":"/area/新加坡"},{"n":"馬來西亞","v":"/area/馬來西亞"},{"n":"印度","v":"/area/印度"},{"n":"英國","v":"/area/英國"},{"n":"法國","v":"/area/法國"},{"n":"加拿大","v":"/area/加拿大"},{"n":"西班牙","v":"/area/西班牙"},{"n":"俄羅斯","v":"/area/俄羅斯"},{"n":"其它","v":"/area/其它"}]},{"key":"lang","name":"語言","value":[{"n":"全部","v":""},{"n":"國語","v":"/lang/國語"},{"n":"英語","v":"/lang/英語"},{"n":"粵語","v":"/lang/粵語"},{"n":"閩南語","v":"/lang/閩南語"},{"n":"韓語","v":"/lang/韓語"},{"n":"日語","v":"/lang/日語"},{"n":"法語","v":"/lang/法語"},{"n":"德語","v":"/lang/德語"},{"n":"泰語","v":"/lang/泰語"},{"n":"俄語","v":"/lang/俄語"},{"n":"其它","v":"/lang/其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"},{"n":"2002","v":"2002"},{"n":"2001","v":"2001"},{"n":"2000","v":"2000"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"時間","v":"/by/time"},{"n":"人氣","v":"/by/hits"},{"n":"評分","v":"/by/score"}]}],
        "PCCCCS-":[{"key":"class","name":"劇情","value":[{"n":"全部","v":""},{"n":"爱情","v":"/class/爱情"},{"n":"动作","v":"/class/动作"},{"n":"喜剧","v":"/class/喜剧"},{"n":"战争","v":"/class/战争"},{"n":"科幻","v":"/class/科幻"},{"n":"剧情","v":"/class/剧情"},{"n":"武侠","v":"/class/武侠"},{"n":"冒险","v":"/class/冒险"},{"n":"枪战","v":"/class/枪战"},{"n":"恐怖","v":"/class/恐怖"},{"n":"微电影","v":"/class/微电影"},{"n":"其它","v":"/class/其它"}]},{"key":"area","name":"地區","value":[{"n":"全部","v":""},{"n":"大陸","v":"/area/大陸"},{"n":"香港","v":"/area/香港"},{"n":"台灣","v":"/area/台灣"},{"n":"美國","v":"/area/美國"},{"n":"韓國","v":"/area/韓國"},{"n":"日本","v":"/area/日本"},{"n":"泰國","v":"/area/泰國"},{"n":"新加坡","v":"/area/新加坡"},{"n":"馬來西亞","v":"/area/馬來西亞"},{"n":"印度","v":"/area/印度"},{"n":"英國","v":"/area/英國"},{"n":"法國","v":"/area/法國"},{"n":"加拿大","v":"/area/加拿大"},{"n":"西班牙","v":"/area/西班牙"},{"n":"俄羅斯","v":"/area/俄羅斯"},{"n":"其它","v":"/area/其它"}]},{"key":"lang","name":"語言","value":[{"n":"全部","v":""},{"n":"國語","v":"/lang/國語"},{"n":"英語","v":"/lang/英語"},{"n":"粵語","v":"/lang/粵語"},{"n":"閩南語","v":"/lang/閩南語"},{"n":"韓語","v":"/lang/韓語"},{"n":"日語","v":"/lang/日語"},{"n":"法語","v":"/lang/法語"},{"n":"德語","v":"/lang/德語"},{"n":"泰語","v":"/lang/泰語"},{"n":"俄語","v":"/lang/俄語"},{"n":"其它","v":"/lang/其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"},{"n":"2002","v":"2002"},{"n":"2001","v":"2001"},{"n":"2000","v":"2000"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"時間","v":"/by/time"},{"n":"人氣","v":"/by/hits"},{"n":"評分","v":"/by/score"}]}],
        "HCCCCS-":[{"key":"class","name":"劇情","value":[{"n":"全部","v":""},{"n":"爱情","v":"/class/爱情"},{"n":"动作","v":"/class/动作"},{"n":"喜剧","v":"/class/喜剧"},{"n":"战争","v":"/class/战争"},{"n":"科幻","v":"/class/科幻"},{"n":"剧情","v":"/class/剧情"},{"n":"武侠","v":"/class/武侠"},{"n":"冒险","v":"/class/冒险"},{"n":"枪战","v":"/class/枪战"},{"n":"恐怖","v":"/class/恐怖"},{"n":"微电影","v":"/class/微电影"},{"n":"其它","v":"/class/其它"}]},{"key":"area","name":"地區","value":[{"n":"全部","v":""},{"n":"大陸","v":"/area/大陸"},{"n":"香港","v":"/area/香港"},{"n":"台灣","v":"/area/台灣"},{"n":"美國","v":"/area/美國"},{"n":"韓國","v":"/area/韓國"},{"n":"日本","v":"/area/日本"},{"n":"泰國","v":"/area/泰國"},{"n":"新加坡","v":"/area/新加坡"},{"n":"馬來西亞","v":"/area/馬來西亞"},{"n":"印度","v":"/area/印度"},{"n":"英國","v":"/area/英國"},{"n":"法國","v":"/area/法國"},{"n":"加拿大","v":"/area/加拿大"},{"n":"西班牙","v":"/area/西班牙"},{"n":"俄羅斯","v":"/area/俄羅斯"},{"n":"其它","v":"/area/其它"}]},{"key":"lang","name":"語言","value":[{"n":"全部","v":""},{"n":"國語","v":"/lang/國語"},{"n":"英語","v":"/lang/英語"},{"n":"粵語","v":"/lang/粵語"},{"n":"閩南語","v":"/lang/閩南語"},{"n":"韓語","v":"/lang/韓語"},{"n":"日語","v":"/lang/日語"},{"n":"法語","v":"/lang/法語"},{"n":"德語","v":"/lang/德語"},{"n":"泰語","v":"/lang/泰語"},{"n":"俄語","v":"/lang/俄語"},{"n":"其它","v":"/lang/其它"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"},{"n":"2002","v":"2002"},{"n":"2001","v":"2001"},{"n":"2000","v":"2000"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"/letter/A"},{"n":"B","v":"/letter/B"},{"n":"C","v":"/letter/C"},{"n":"D","v":"/letter/D"},{"n":"E","v":"/letter/E"},{"n":"F","v":"/letter/F"},{"n":"G","v":"/letter/G"},{"n":"H","v":"/letter/H"},{"n":"I","v":"/letter/I"},{"n":"J","v":"/letter/J"},{"n":"K","v":"/letter/K"},{"n":"L","v":"/letter/L"},{"n":"M","v":"/letter/M"},{"n":"N","v":"/letter/N"},{"n":"O","v":"/letter/O"},{"n":"P","v":"/letter/P"},{"n":"Q","v":"/letter/Q"},{"n":"R","v":"/letter/R"},{"n":"S","v":"/letter/S"},{"n":"T","v":"/letter/T"},{"n":"U","v":"/letter/U"},{"n":"V","v":"/letter/V"},{"n":"W","v":"/letter/W"},{"n":"X","v":"/letter/X"},{"n":"Y","v":"/letter/Y"},{"n":"Z","v":"/letter/Z"},{"n":"0-9","v":"/letter/0-9"}]},{"key":"by","name":"排序","value":[{"n":"時間","v":"/by/time"},{"n":"人氣","v":"/by/hits"},{"n":"評分","v":"/by/score"}]}]
	};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
    if (pg <= 0) pg = 1;
    const link = HOST + '/show/' +  (extend.cateId || tid)  + (extend.year || '') + (extend.area || '') + '-' + (extend.by || '/by/time') + (extend.class || '') + (extend.lang || '') + (extend.letter || '')  + '/page/' + pg  + '.html';//https://www.inmi.app/show/0CCCCS-2022/area/%E7%BE%8E%E5%9C%8B/by/hits/class/%E5%89%A7%E6%83%85/lang/%E8%8B%B1%E8%AA%9E/letter/B.html
    const html = await request(link);
    const $ = load(html);
    const items = $('div.module > a.module-item');
    let videos = _.map(items, (item) => {
        const it = $(item)[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('div.module-item-note')[0]).text().trim();
        return {
            vod_id: it.attribs.href.replace(/.*?\/video\/(.*).html/g, '$1'),
            vod_name: it.attribs.title,
            vod_pic: k.attribs['data-original'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div#page > a:contains(下一頁)').length > 0;
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
    var html = await request( HOST + '/video/' + id + '.html');
    var $ = load(html);
    var vod = {
        vod_id: id,
        vod_name: $('h1:first').text().trim(),
        vod_type: $('.module-info-tag').text(),
        vod_actor: $('.module-info-main a').text().replace('立即播放收藏', ''),
        vod_pic: $('.stui-content__thumb img:first').attr('data-original'),
        vod_remarks : $('.stui-content__detail p:nth-child(5)').text() || '',
        vod_content: $('div.module-info-introduction-content p').text().trim(),
    };
    var playMap = {};
    var tabs = $('div.module-tab-items-box div.tab-item span');
    var playlists = $('div.module-play-list-content');
    _.each(tabs, (tab, i) => {
        var from = tab.children[0].data.trim();
        var list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            var title = it.attribs.title;
            var playUrl = it.attribs.href.replace(/\/inmiplay\/(.*).html/g, '$1');
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
    const link = HOST + '/inmiplay/' + id + '.html';
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
    let data = await request(HOST + '/search/' + wd + '----------' + pg + '---' + '.html');//https://www.inmi.app/search/%E6%88%91----------1---.html
    const $ = load(data);
    const items = $('div.module-items div.module-item');
    let videos = _.map(items, (item) => {
        const it = $(item).find('a:first')[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('div.module-item-note')[0]).text().trim();
        return {
            vod_id: it.attribs.href.replace(/.*?\/video\/(.*).html/g, '$1'),
            vod_name: k.attribs.alt,
            vod_pic: k.attribs['data-original'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div#page > a:contains(下一頁)').length > 0;
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