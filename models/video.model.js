/**
 * @author Khaled Aboul Hosn
 * @copyright ©Khaled Aboul Hosn, 2016. All Rights Reserved.

 * @desc Node server script that holds the Videos and their count
*/
"use strict"
let videosEntries = {}
let totalCount = 0

exports.setCount = (value)=> totalCount = value
exports.setVideosEntries = (entries)=> videosEntries = entries
exports.getCount = ()=> totalCount
exports.getVideosEntries = ()=> videosEntries