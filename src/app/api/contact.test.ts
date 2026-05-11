import axios from 'axios';
import type sgMailType from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('@sendgrid/mail');
jest.mock('axios');

const sgMail = require('@sendgrid/mail') as unknown as sgMailType;
const mockedSgMail = sgMail as jest.Mocked<typeof sgMail>;
const mockedAxios = axios as jest.Mocked<typeof axios>;

let handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

describe('Contact API', () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    // Import the handler after mocks are in place to ensure SendGrid is mocked during module initialization.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    handler = require('./contact').default;
  });
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
    // console.info is left unmocked to allow benchmark results to be visible
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Default mock implementations
    mockedSgMail.setApiKey.mockImplementation(() => {});
    mockedSgMail.send.mockResolvedValue([{}, {}] as any);
    mockedAxios.post.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const createRequest = (
    method = 'POST',
    body: any = {
      name: 'Test',
      email: 'test@example.com',
      subject: 'Subject',
      message: 'Message',
    }
  ) =>
    ({
      method,
      body,
    }) as unknown as NextApiRequest;

  const createResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res as NextApiResponse;
  };

  it('executes tasks in parallel (deterministic verification)', async () => {
    // Create controllable ("deferred") promises for each async task
    let resolveEmail!: () => void;
    const emailPromise = new Promise<any>((resolve) => {
      resolveEmail = () => resolve([{}, {}] as any);
    });

    let resolveWebhook!: () => void;
    const webhookPromise = new Promise<any>((resolve) => {
      resolveWebhook = () => resolve({ data: {} });
    });

    // Override mocks to return the deferred promises (no timers involved)
    mockedSgMail.send.mockImplementation(() => emailPromise as any);
    mockedAxios.post.mockImplementation(() => webhookPromise as any);

    const req = createRequest();
    const res = createResponse();

    const handlerPromise = handler(req, res);

    // Allow the handler to start and call the mocks
    await Promise.resolve();

    // Both async tasks should have been started without waiting for each other
    expect(mockedSgMail.send).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalled();

    // Track when the handler completes
    let handlerResolved = false;
    handlerPromise.then(() => {
      handlerResolved = true;
    });

    // Resolve only one task; handler should NOT finish yet if it waits for both
    resolveEmail();
    await Promise.resolve();
    expect(handlerResolved).toBe(false);

    // Now resolve the second task; handler should be able to complete
    resolveWebhook();
    await handlerPromise;

    expect(handlerResolved).toBe(true);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('returns 200 on successful submission', async () => {
    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Form submitted successfully.',
    });
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
    expect(res.json).toHaveBeenCalledWith({
      error: 'All fields are required.',
    });
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
