const mysql_odbc = require('../db/db_conn');

async function get_board_channel(){
    let sql = 'select channel_name, channel_img from channels';
    // console.log(sql);

    try{
        let conn = await mysql_odbc.getConnection();
        let row = await conn.query(sql);
        await conn.release();
        return row[0];
    }catch(e){
        console.error(e);
        return null;
    }
}

async function get_board_video(channel_name, page){
    let sql = 'select * '
       + 'from liveon LEFT JOIN channels ON liveon.channel_name = channels.channel_name '
       + (channel_name ? 'where liveon.liveon = 1 AND liveon.videoid != "mainEngine" AND liveon.channel_name="'+channel_name+'" ORDER BY time DESC ' : 'where liveon.liveon = 1 AND liveon.videoid != "mainEngine" ORDER BY time DESC ')
       + (page ? 'LIMIT '+(page-1)*12+', 12;' : 'LIMIT 0, 12;');
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

module.exports = {
    get_board_channel, get_board_video
};