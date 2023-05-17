const boardModel = require('../db/board-model');

async function board(req, res){
    let title = req.params.channel || 'main Board';
    let page = req.params.page || 1;
    let channel_name = req.params.channel;
    let channel = await boardModel.get_board_channel();
    let video = await boardModel.get_board_video(req.params.channel, req.params.page);
    res.render('board', {
        'title' : title,
        'page': page,
        'channel_name' : channel_name,
        'channel' : channel,
        'video' : video,
    });
}

module.exports = {
    board
};