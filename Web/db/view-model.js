const mysql_odbc = require('../db/db_conn');

async function get_view_info(video_name){
    let sql = 'select * from liveon LEFT JOIN channels ON liveon.channel_name = channels.channel_name WHERE liveon.video_name ="'+video_name+'"';
    // console.log(sql);

    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return row[0][0];
    } catch(e){
        console.error(e);
        return null;
    }
}

async function get_view_viewcount(videoid){
    let sql = 'SELECT videoid, time, viewers FROM viewerscount WHERE videoid="'+videoid+'" ORDER BY time';
    // console.log(sql);

    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return row[0];
    } catch(e){
        console.error(e);
        return null;
    }
}

async function get_view_bestTimeLine(videoid){
    let sql = 'SELECT videoid, time, viewers FROM viewerscount WHERE videoid="'+videoid+'" ORDER BY viewers desc limit 1';
    // console.log(sql);

    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return row[0][0];
    } catch(e){
        console.error(e);
        return null;
    }
}

async function get_view_bestSec(videoid, best_timeline){
    sql = 'SELECT TIMESTAMPDIFF(SECOND,MIN(TIME),"' + best_timeline +'") AS besttime FROM viewerscount WHERE videoid = "' + videoid + '"';
    // console.log(sql);
    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return {'best_sec' : row[0][0].besttime};
    } catch(e){
        console.error(e);
        return null;
    }
}


module.exports = {
    get_view_info, get_view_viewcount, get_view_bestTimeLine, get_view_bestSec
};