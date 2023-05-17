const viewModel = require('../db/view-model');
const boardModel = require('../db/board-model');
const moment = require('moment');

async function view(req, res){
    let channel = await boardModel.get_board_channel();
    let view_info = await viewModel.get_view_info(req.params.video_name);
    let video_name = view_info.video_name;
    let videoid = view_info.videoid;
    let best_timeline_info = await viewModel.get_view_bestTimeLine(videoid);
    let best_timeline = moment(best_timeline_info.time).format();
    let best_sec_info = await viewModel.get_view_bestSec(videoid, best_timeline);
    let best_sec = best_sec_info.best_sec;
    let best_count = best_timeline_info.viewers;
    let livecount = await viewModel.get_view_viewcount(videoid);

    res.render('view', {
        'channel' : channel,
        'video_name' : video_name,
        'videoid' : videoid,
        'best_timeline' : best_timeline,
        'best_sec' : best_sec,
        'best_count' : best_count,
        'livecount' : livecount,
    });
}

module.exports = {
    view
};