const request= require("request-promise")
const cheerio= require("cheerio");
const pool = require('./database');
const sendemails = require('./email');

const scrabedata = () => { 
    
    console.log('hi');


    request('https://www.infoworld.com/category/machine-learning/',(error, response, html) => {
        if(!error && response.statusCode==200) {
    const $= cheerio.load(html);
        
    $('div[class="river-well article"]').each(async(i,data)=>
    {   
        let tit = $ (data).find('div[class="post-cont"] > h3').text().trim()
        let link = 'https://www.infoworld.com'+$ (data).find('div[class="post-cont"] > h3 > a').attr('href');
        let src = $(data).find(' figure[class = "well-img"] > a > img ').attr('data-original');
        let descrip =  $ (data).find('div[class="post-cont"] > h4').text().trim();
        try{
        const check = await pool.query("SELECT * FROM feeds WHERE TITLE = $1",[tit])
        
        if(!check.rows.length){
            
            const newfeed = await pool.query("INSERT INTO feeds (Category,TITLE,DESCRIPTION,link,src) VALUES($1,$2,$3,$4,$5)",['ml',tit,descrip,link,src]);
            console.log('data added');
            sendemails(tit,src,descrip,link);
        }else{
            console.log("same data");
        }
        }catch(err)
        {
            console.log(err);
        }
        
        
    
        
            })
            
    }});

            
        

        
    request('https://www.infoworld.com/category/cloud-computing/', (error, response, html) => {
        if(!error && response.statusCode==200) {
    const $= cheerio.load(html);
        
    $('div[class="river-well article"]').each(async(i,data)=>
    {   
        let tit = $ (data).find('div[class="post-cont"] > h3').text().trim()
        let link = 'https://www.infoworld.com'+$ (data).find('div[class="post-cont"] > h3 > a').attr('href');
        let src = $(data).find(' figure[class = "well-img"] > a > img ').attr('data-original');
        let descrip =  $ (data).find('div[class="post-cont"] > h4').text().trim();
        
        try{  const check = await pool.query("SELECT * FROM feeds WHERE TITLE = $1",[tit])
        
        if(!check.rows.length){
            
            const newfeed = await pool.query("INSERT INTO feeds (Category,TITLE,DESCRIPTION,link,src) VALUES($1,$2,$3,$4,$5)",['cc',tit,descrip,link,src]);
            console.log('data added');
            sendemails(tit,src,descrip,link);
        }else{
            console.log("same data");
        } }catch(err)
        {
                console.log(err);
        }
            
        
        
        
            })
            
    }});



    request("https://artificialintelligence-news.com/", (error, response, html) => {
        if(!error && response.statusCode==200) {
            const $= cheerio.load(html);
        
            $('section[class="entry-content"]').each(async(i,data)=>
            {   
                let tit = $ (data).find('header[class="article-header"] > h3').text().trim()
                let link = $ (data).find('header[class="article-header"] > h3 > a').attr('href');
                let src = $(data).find(' div[class="grid-x grid-margin-x"]> div[class="cell small-3 medium-6 large-6"]>div[class="image"] > a > img ').attr('srcset');
                let des =  $ (data).find('div[class="cell small-12  medium-8 large-6"] ');
                let descrip = $(des).find('p').text().trim();
                let desp = descrip.split('.')[0]
                try {
                const check = await pool.query("SELECT * FROM feeds WHERE TITLE = $1",[tit])
        
                if(!check.rows.length){
                
                const newfeed = await pool.query("INSERT INTO feeds (Category,TITLE,DESCRIPTION,link,src) VALUES($1,$2,$3,$4,$5)",['ai',tit,desp,link,src]);
                console.log(newfeed.rows);
                sendemails(tit,src,desp,link);
                }else{
                    console.log("same data");
                }
            }catch(err)
            {
                console.log(err);
            }
            
            
            
                
            
            })
        
        
            }
            


    });

    request('https://www.the-scientist.com/tag/deep-learning', (error, response, html) => {
        if(!error && response.statusCode==200) {
    const $= cheerio.load(html);
    $('div[class="ArticleSummary"]').each(async(i,data)=>{
    
        
        let tit = $ (data).find('header').text().trim()
        let link ="https://www.the-scientist.com"+ $ (data).find('header > a').attr('href');
        let src = $(data).find(' figure > a > picture > img ').attr('src');
        let descrip =  $ (data).find('main > div').text().trim();
        try {
        const check = await pool.query("SELECT * FROM feeds WHERE TITLE = $1",[tit])
        
        if(!check.rows.length){
        
        const newfeed = await pool.query("INSERT INTO feeds (Category,TITLE,DESCRIPTION,link,src) VALUES($1,$2,$3,$4,$5)",['dl',tit,descrip,link,src]);
        console.log(newfeed.rows);
        sendemails(tit,src,descrip,link);
        }else{
            console.log("same data");
        }
    }catch(err)
    {
        console.log(err);
    }
    

    
        })
        
        
            }
            
        });
        
        


    request("https://www.iotevolutionworld.com/iot/", (error, response, html) => {
        if(!error && response.statusCode==200) {
            const $= cheerio.load(html);
        
            $('div[class="item image-left"]').each(async(i,data)=>
            {   
                
                let tit = $ (data).find('div[class="item-content"] > h3').text().trim()
                let link = $ (data).find('div[class="item-content"] > h3 > a').attr('href');
                let src = $(data).find(' div[class="item-header"]> a > figure > img ').attr('src');
                
                let descrip = $(data).find('div[class="item-content"] > p').text().trim();
                try{
            
                const check = await pool.query("SELECT * FROM feeds WHERE TITLE = $1",[tit])
        
                if(!check.rows.length){
                
                const newfeed = await pool.query("INSERT INTO feeds (Category,TITLE,DESCRIPTION,link,src) VALUES($1,$2,$3,$4,$5)",['iot',tit,descrip,link,src]);
                console.log("data added");
                sendemails(tit,src,descrip,link);
                }else{
                    console.log("same data");
                }
            }catch(err)
            {
                console.log(err);
            }
            
            
            
                
            
            })
        
            
            
        

        
            
        
            }
            


    });
}

module.exports = scrabedata;
