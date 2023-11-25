import { Crypto, load, _ } from './lib/cat.js';

let key = 'adm';
let HOST = 'https://anime.girigirilove.com';
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
    let classes = [{"type_id":2,"type_name":"日漫"},{"type_id":3,"type_name":"美漫"},{"type_id":21,"type_name":"剧场版"},{"type_id":20,"type_name":"真人番"},{"type_id":24,"type_name":"BD副音轨"},{"type_id":26,"type_name":"演唱会周边"}];
    let filterObj = {
		"2":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"恐怖","v":"恐怖"},{"n":"动作","v":"动作"},{"n":"科幻","v":"科幻"},{"n":"剧情","v":"剧情"},{"n":"战争","v":"战争"},{"n":"奇幻","v":"奇幻"},{"n":"冒险","v":"冒险"},{"n":"悬疑","v":"悬疑"},{"n":"校园","v":"校园"},{"n":"后宫","v":"后宫"},{"n":"热血","v":"热血"},{"n":"运动","v":"运动"},{"n":"百合","v":"百合"},{"n":"乙女","v":"乙女"},{"n":"机甲","v":"机甲"},{"n":"日常","v":"日常"},{"n":"魔法少女","v":"魔法少女"},{"n":"异世界","v":"异世界"},{"n":"爱抖露","v":"爱抖露"},{"n":"音乐","v":"音乐"},{"n":"萌","v":"萌"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"一月","v":"一月"},{"n":"四月","v":"四月"},{"n":"七月","v":"七月"},{"n":"十月","v":"十月"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"},{"n":"2002","v":"2002"},{"n":"2001","v":"2001"},{"n":"2000","v":"2000"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"日语","v":"日语"},{"n":"国语","v":"国语"}]},{"key":"by","name":"排序","value":[{"n":"最新","v":"time"},{"n":"最热","v":"hits"},{"n":"评分","v":"score"}]}],
        "3":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"搞笑","v":"搞笑"},{"n":"爱情","v":"爱情"},{"n":"恐怖","v":"恐怖"},{"n":"动作","v":"动作"},{"n":"科幻","v":"科幻"},{"n":"剧情","v":"剧情"},{"n":"战争","v":"战争"},{"n":"奇幻","v":"奇幻"},{"n":"冒险","v":"冒险"},{"n":"悬疑","v":"悬疑"},{"n":"校园","v":"校园"},{"n":"后宫","v":"后宫"},{"n":"热血","v":"热血"},{"n":"运动","v":"运动"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"内地"},{"n":"港台","v":"港台"},{"n":"日韩","v":"日韩"},{"n":"欧美","v":"欧美"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"}]},{"key":"by","name":"排序","value":[{"n":"最新","v":"time"},{"n":"最热","v":"hits"},{"n":"评分","v":"score"}]}],
        "21":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"恐怖","v":"恐怖"},{"n":"动作","v":"动作"},{"n":"科幻","v":"科幻"},{"n":"剧情","v":"剧情"},{"n":"战争","v":"战争"},{"n":"奇幻","v":"奇幻"},{"n":"冒险","v":"冒险"},{"n":"悬疑","v":"悬疑"},{"n":"校园","v":"校园"},{"n":"后宫","v":"后宫"},{"n":"热血","v":"热血"},{"n":"运动","v":"运动"},{"n":"百合","v":"百合"},{"n":"耽美","v":"耽美"},{"n":"机甲","v":"机甲"},{"n":"日常","v":"日常"},{"n":"魔法少女","v":"魔法少女"},{"n":"异世界","v":"异世界"},{"n":"爱抖露","v":"爱抖露"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"},{"n":"2003","v":"2003"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"日语","v":"日语"},{"n":"中文","v":"中文"},{"n":"英语","v":"英语"}]},{"key":"by","name":"排序","value":[{"n":"最新","v":"time"},{"n":"最热","v":"hits"},{"n":"评分","v":"score"}]}],
        "20":[{"key":"class","name":"类型","value":[{"n":"全部","v":""},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"经典","v":"经典"},{"n":"冒险","v":"冒险"},{"n":"剧情","v":"剧情"},{"n":"动作","v":"动作"},{"n":"同性","v":"同性"},{"n":"喜剧","v":"喜剧"},{"n":"奇幻","v":"奇幻"},{"n":"恐怖","v":"恐怖"},{"n":"悬疑.惊悚","v":"悬疑.惊悚"},{"n":"战争","v":"战争"},{"n":"欧美","v":"欧美"},{"n":"歌舞","v":"歌舞"},{"n":"灾难","v":"灾难"},{"n":"记录.泰剧","v":"记录.泰剧"},{"n":"体育","v":"体育"},{"n":"烧脑","v":"烧脑"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"日本","v":"日本"},{"n":"欧美","v":"欧美"},{"n":"泰国","v":"泰国"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2007","v":"2007"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004.2003","v":"2004.2003"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"日语","v":"日语"},{"n":"英语","v":"英语"},{"n":"泰语","v":"泰语"}]},{"key":"by","name":"排序","value":[{"n":"最新","v":"time"},{"n":"最热","v":"hits"},{"n":"评分","v":"score"}]}],
        "24":[{"key":"by","name":"排序","value":[{"n":"最新","v":"time"},{"n":"最热","v":"hits"},{"n":"评分","v":"score"}]}],
        "26":[{"key":"by","name":"排序","value":[{"n":"最新","v":"time"},{"n":"最热","v":"hits"},{"n":"评分","v":"score"}]}]
	};

    return JSON.stringify({
        class: classes,
        filters: filterObj,
    });
}

async function homeVod() {}

async function category(tid, pg, filter, extend) {
    if (pg <= 0) pg = 1;
    const link = HOST + '/show/' + (extend.cateId || tid) + '-' + (extend.area || '') + '-' + (extend.by || 'time') + '-' + (extend.class || '') + '-' + (extend.lang || '') + '----' + pg + '---' + (extend.year || '') + '/';//https://anime.girigirilove.com/show/2-%E4%B8%80%E6%9C%88-hits-%E7%88%B1%E6%83%85-%E6%97%A5%E8%AF%AD-------2023/
    const html = await request(link);
    const $ = load(html);
    const items = $('div.border-box div.public-list-div');
    let videos = _.map(items, (item) => {
        const it = $(item).find('a:first')[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('span')).text().trim();
        return {
            vod_id: it.attribs.href.split('/').join(''),
            vod_name: it.attribs.title,
            vod_pic: HOST + k.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div.page-info > a:contains(下一页)').length > 0;
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
    var html = await request( HOST + '/' + id + '/' );
    var $ = load(html);
    var vod = {
        vod_id: id,
        vod_name: $('h3:first').text().trim(),
        vod_type: $('.deployment span').text(),
        vod_actor: $('.detail-info a').text(),
        vod_pic: $('.video-cover img:first').attr('src'),
        vod_remarks : $('.stui-content__detail p:nth-child(5)').text() || '',
        vod_content: $('#height_limit').text().trim(),
    };
    var playMap = {};
    var tabs = $('div.anthology-tab a');
    var playlists = $('ul.anthology-list-play');
    _.each(tabs, (tab, i) => {
        var from = $(tab).text();
        var list = playlists[i];
        list = $(list).find('a');
        _.each(list, (it) => {
            var title = it.children[0].data;
            var playUrl = it.attribs.href.split('/').join('');
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
    const html = await request( HOST + '/' + id + '/' );
    const $ = load(html);
    const js = JSON.parse($('script:contains(player_a)').html().replace('var player_aaaa=',''));
    
    const playUrl = unescape(base64Decode(js.url));
    
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
    let data = await request(HOST + '/search/' + wd + '----------' + pg + '---/');//https://anime.girigirilove.com/search/%E6%88%91----------2---/
    const $ = load(data);
   const items = $('div.row-right div.public-list-box');
    let videos = _.map(items, (item) => {
        const it = $(item).find('a:first')[0];
        const k = $(item).find('img:first')[0];
        const remarks = $($(item).find('span.public-list-prb')[0]).text().trim();
        return {
            vod_id: it.attribs.href.split('/').join(''),
            vod_name: k.attribs.alt,
            vod_pic: HOST + k.attribs['data-src'],
            vod_remarks: remarks || '',
        };
    });
    const hasMore = $('div.page-info > a:contains(下一页)').length > 0;
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