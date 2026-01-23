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

  it('measures execution time of handler (benchmark)', async () => {
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

    console.log(`Execution time: ${duration}ms`);

    // Verify parallel execution: total time should be close to DELAY (100ms)
    // rather than 2x DELAY (200ms) for sequential execution.
    expect(duration).toBeLessThan(150);

    expect(sgMail.send).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('returns 200 on successful submission', async () => {
    (sgMail.send as jest.Mock).mockResolvedValue([{}, {}]);
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

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
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Form submitted successfully.' });
  });

  it('returns 400 when required fields are missing', async () => {
    const req = {
      method: 'POST',
      body: {
        // Missing name
        email: 'test@example.com',
        subject: 'Subject',
        message: 'Message',
      },
    } as unknown as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required.' });
    expect(sgMail.send).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it('returns 500 when sending email fails', async () => {
    (sgMail.send as jest.Mock).mockRejectedValue(new Error('Email error'));
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

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
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });

  it('returns 500 when sending notification fails', async () => {
    (sgMail.send as jest.Mock).mockResolvedValue([{}, {}]);
    (axios.post as jest.Mock).mockRejectedValue(new Error('Notification error'));

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
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });

  it('returns 405 for non-POST requests', async () => {
    const req = {
      method: 'GET',
    } as unknown as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
