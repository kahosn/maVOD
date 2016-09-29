const mongoose = require('mongoose')
const cfg = require('../../config/mavodConfig.json')

//Will be using native promises
mongoose.Promise = global.Promise

module.exports.connectPromise = (url)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(
            url, 
            { config: { autoIndex: cfg.mongoose.options.autoIndex } },
            (err)=>{
                if(err)
                    reject(err)
                resolve()    
            })
    })
}

module.exports.connectCallBack = (url, cb)=>{
    mongoose.connect(url,{ config: {autoIndex: cfg.mongoose.options.autoIndex }}, (err)=>{
        if(err)
            cb(err)
        cb()    
    })
}  

module.exports.disconnect = ()=>{
    return new Promise((resolve, reject)=>{
        mongoose.disconnect((err)=>{
                                    if(err)
                                        reject(err)
                                    resolve()    
                                })
    })    
}

let mavodDBConnection = mongoose.connection

exports.getConnection = ()=>mavodDBConnection

mavodDBConnection.on('error', console.error.bind(console, cfg.error.connection))

mavodDBConnection.once('open', ()=> {
  // we're connected!
})

/**
         mongoose.connection.once('open', function() {
            logger.info('MongoDB event open');
            logger.debug('MongoDB connected [%s]', url);

            mongoose.connection.on('connected', function() {
                logger.info('MongoDB event connected');
            });

            mongoose.connection.on('disconnected', function() {
                logger.warn('MongoDB event disconnected');
            });

            mongoose.connection.on('reconnected', function() {
                logger.info('MongoDB event reconnected');
            });

            mongoose.connection.on('error', function(err) {
                logger.error('MongoDB event error: ' + err);
            });

            // return resolve();
            return server.start();
        });
 */