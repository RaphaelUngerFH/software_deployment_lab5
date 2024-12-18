const request = require('supertest');
const app = require('../index');

const errorMsg = "Please use a valid string."

// Test if the GET request returns "Hello World!"
describe('GET /', () => {
  it('should return Hello World!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

// Test for the POST-Route /checksum
describe('POST /checksum', () => {
  it('should return the correct checksum for a valid input', async () => {
    const input = 'HelloWorld';
    const expectedChecksum = '1a2fa200'; 
    
    const response = await request(app)
      .post('/checksum')
      .send({ input }) 
      .set('Content-Type', 'application/json'); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('checksum', expectedChecksum);
  });

  it('should return an error for missing input', async () => {
    const response = await request(app)
      .post('/checksum')
      .send({}) 
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', errorMsg);
  });

  it('should return an error for non-string input', async () => {
    const response = await request(app)
      .post('/checksum')
      .send({ input: 12345 }) 
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', errorMsg);
  });
});