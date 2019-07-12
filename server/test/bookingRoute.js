import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import data from './testData';


chai.use(chaiHttp);

describe('Create Booking', () => {
  let request;
  let userToken;
  before(async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send(data.specialSignIn);
    userToken = res.body.data.token;
  });

  beforeEach(async () => {
    request = await chai.request(app);
  });

  it('should throw an error for missing trip id', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', userToken)
      .send(data.missingTripId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for missing seat number', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', userToken)
      .send(data.missingSeatNumber);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty trip id', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', userToken)
      .send(data.emptyTripId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty seat number', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', userToken)
      .send(data.emptySeatNumber);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid trip id', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', userToken)
      .send(data.invalidTipId);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for invalid seat number', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', userToken)
      .send(data.invalidSeatNumber);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('should throw an error for empty token', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .send(data.booking);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });

  it('Should return an error for invalid token', async () => {
    const res = await request
      .post('/api/v1/bookings')
      .set('Authorization', 'jhdkdjkhyfifkhjdjhkdhkdh')
      .send(data.createTrip);
    assert.equal((res.body.status), 'error');
    assert.property((res.body), 'error');
  });
});