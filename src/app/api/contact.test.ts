import handler from './contact';
import sgMail from '@sendgrid/mail';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@sendgrid/mail');
jest.mock('axios');

const mockedSgMail = sgMail as jest.Mocked<typeof sgMail>;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Contact API', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
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

    // Default mock implementations
    mockedSgMail.setApiKey.mockImplementation(() => {});
    mockedSgMail.send.mockResolvedValue([{}, {}] as any);
    mockedAxios.post.mockResolvedValue({ data: {} });
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const createRequest = (method = 'POST', body: any = {
    name: 'Test',
    email: 'test@example.com',
    subject: 'Subject',
    message: 'Message',
  }) => ({
    method,
    body,
  } as unknown as NextApiRequest);

  const createResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res as NextApiResponse;
  };

  it('measures execution time of handler (benchmark)', async () => {
    const DELAY = 100;

    // Override mocks with delays
    mockedSgMail.send.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return [{}, {}] as any;
    });
    mockedAxios.post.mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return { data: {} };
    });

    const req = createRequest();
    const res = createResponse();

    const start = performance.now();
    await handler(req, res);
    const end = performance.now();
    const duration = end - start;

    console.info(`Execution time: ${duration}ms`);

    // Verify parallel execution: total time should be close to DELAY (100ms)
    // rather than 2x DELAY (200ms) for sequential execution.
    // Using 1.5x buffer (150ms) to account for overhead while ensuring parallelism.
    expect(duration).toBeLessThan(150);

    expect(mockedSgMail.send).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('returns 200 on successful submission', async () => {
    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Form submitted successfully.' });
  });

  it('returns 400 when required fields are missing', async () => {
    const req = createRequest('POST', {
      // Missing name
      email: 'test@example.com',
      subject: 'Subject',
      message: 'Message',
    });
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'All fields are required.' });
    expect(mockedSgMail.send).not.toHaveBeenCalled();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('returns 500 when sending email fails', async () => {
    mockedSgMail.send.mockRejectedValue(new Error('Email error'));

    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });

  it('returns 500 when sending notification fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Notification error'));

    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });

  it('returns 405 for non-POST requests', async () => {
    const req = createRequest('GET');
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
