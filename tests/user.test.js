const request=require('supertest')
const app=require('../src/app')

test('Should sign up a new user',async ()=>{
    await  request(app).post('/users').send({
        name:'Dimitris',
        email:'diodimi@gmail.com',
        password:'Nionios1234!'
    }).expect(201)
})
