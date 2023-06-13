'use strict';
const { app } = require('../src/server');
const { db , authorModel} = require('../src/models/index');
const supertest = require('supertest');
const mockServerMethods = supertest(app);
beforeAll(async () => {
    await db.sync();
});
describe('testing my server', () => {
    it('404 on a bad route', async () => {
        const response = await mockServerMethods.get('/No');
        expect(response.status).toBe(404);
    });
    it('404 on a bad method', async () => {
        const response = await mockServerMethods.post('/author/1');
        expect(response.status).toBe(404);
    });
    it('Create a author record using POST', async () => {
        const response = await mockServerMethods.post('/author').send({
            AuthorName: 'Zainab',
        });
        expect(response.status).toBe(201);
    });
    it('Read a authors list of records using GET', async () => {
        const response = await mockServerMethods.get('/author');
        expect(response.status).toBe(200);
    });
    it('Read a author record using GET', async () => {
        const response = await mockServerMethods.get('/author/1');
        expect(response.status).toBe(200);
    });
    it('Update a author record using PUT', async () => {
        const response = await mockServerMethods.put('/author/1');
        expect(response.status).toBe(201);
    });
    it('Destroy a author record using DELETE', async () => {
        const response = await mockServerMethods.delete('/author/1');
        expect(response.status).toBe(204);
    });
    /*------------------------------------------------------------------------------------*/
    it('Create a book record using POST', async () => {
        // Create an author record
        const author = await authorModel.add({
          AuthorName: "Leo Tolstoy"
        });
      console.log(author);
        // Create a book record associated with the author
        const response = await mockServerMethods.post('/book').send({
          title: "Anna Karenina",
          AuthorId: author.id // Use the author's id as the foreign key
        });
        console.log(response.body); // Check the response body for debugging
        expect(response.status).toBe(201);
      });
    it('Read a books list of records using GET', async () => {
        const response = await mockServerMethods.get('/book');
        expect(response.status).toBe(200);
    });
    it('Read a book record using GET', async () => {
        const response = await mockServerMethods.get('/book/1');
        expect(response.status).toBe(200);
    });
    it('Update a book record using PUT', async () => {
        const response = await mockServerMethods.put('/book/1');
        expect(response.status).toBe(201);
    });
    it('Destroy a book record using DELETE', async () => {
        const response = await mockServerMethods.delete('/book/1');
        expect(response.status).toBe(204);
    });
});
afterAll(async () => {
    await db.drop();
});