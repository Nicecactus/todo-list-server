const chai = require('chai')
const chaiHttp = require('chai-http')
const { v4: uuidv4 } = require('uuid')
const app = require('./app')

chai.use(chaiHttp)
chai.should()

describe('UserController', () => {
    describe('GET /:user/list', () => {
        it('should return the todo list of an existing user', async () => {
            const res = await chai.request(app)
                .get('/1234/list')

            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.should.have.length.greaterThan(0)
        })

        it('should return the todo list of an inexisting user', async () => {
            const res = await chai.request(app)
                .get('/unknown/list')

            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.should.have.length(0)
        })
    })

    describe('PATCH /:user/list', () => {
        it('should replace the todo list of an existing user', async () => {
            const list = [{ id: uuidv4(), label: 'test', resolution: false }]
            const res = await chai.request(app)
                .patch('/1234/list')
                .set('Content-Type', 'application/json')
                .send(list)

            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.should.have.length(1)
            res.body[0].id.should.equal(list[0].id)
        })

        it('should set the todo list of an unknown user', async () => {
            const list = [{ id: uuidv4(), label: 'test', resolution: false }]
            const res = await chai.request(app)
                .patch('/blabla/list')
                .set('Content-Type', 'application/json')
                .send(list)

            res.should.have.status(200)
            res.body.should.be.an('array')
            res.body.should.have.length(1)
            res.body[0].id.should.equal(list[0].id)
        })

        it('should reject a body not containing an object', async () => {
            const res = await chai.request(app)
                .patch('/blabla/list')
                .set('Content-Type', 'application/json')
                .send({})

            res.should.have.status(400)
        })

        it('should reject a body not containing a string', async () => {
            const res = await chai.request(app)
                .patch('/blabla/list')
                .send('invalid body')

            res.should.have.status(400)
        })
    })


    describe('DELETE /:user/list', () => {
        it('should delete the todo list of an existing user', async () => {
            const res = await chai.request(app)
                .delete('/1234/list')

            res.should.have.status(204)
        })

        it('should ignore an unknown user', async () => {
            const res = await chai.request(app)
                .delete('/blabla/list')

            res.should.have.status(204)
        })
    })
})
