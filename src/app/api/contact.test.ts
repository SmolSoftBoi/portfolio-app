import handler from './contact';
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@sendgrid/mail');
jest.mock('axios');

describe('Contact API', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...OLD_ENV,
      SENDGRID_API_KEY: 'test-key',
      TO_EMAIL_ADDRESS: 'to@example.com',
      FROM_EMAIL_ADDRESS: 'from@example.com',
      NOTIFICATION_URL: 'http://localhost/notification',
      NOTIFICATION_ACCESS_TOKEN: 'test-token',
    };
    jest.clearAllMocks();
    // Suppress console logs during tests to keep output clean
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('measures execution time of handler', async () => {
    const DELAY = 100;

    // Mock sendEmail to take DELAY ms
    (sgMail.send as jest.Mock).mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return [{}, {}];
    });

    // Mock sendNotification (axios.post) to take DELAY ms
    (axios.post as jest.Mock).mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return { data: {} };
    });

    const req = {
      method: 'POST',
      body: {
        name: 'Test',
        email: 'test@example.com',
        subject: 'Subject',
        message: 'Message',
      },
    } as unknown as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown as NextApiResponse;

    const start = Date.now();
    await handler(req, res);
    const end = Date.now();
    const duration = end - start;

    console.info(`Execution time: ${duration}ms`);

    expect(sgMail.send).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
