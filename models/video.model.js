let videosEntries = {}
let totalCount = 0

exports.setCount = (value)=> totalCount = value
exports.setVideosEntries = (entries)=> videosEntries = entries
exports.getCount = ()=> totalCount
exports.getVideosEntries = ()=> videosEntries