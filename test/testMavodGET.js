const chai = require('chai')
const chaiHttp = require('chai-http')
const mavod = require('../mavod')
const should = chai.should()

chai.use(chaiHttp)

describe('/GET videos', () => {
    it('it should GET all the videos', (done) => {
    chai.request(mavod)
        .get('/videos')
        .end((err, res) => {
            if(err)
                done(err)   
            res.should.have.status(200)
            res.body.should.be.a('array')
            done()
        })
    })
})