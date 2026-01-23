import { NextApiRequest, NextApiResponse } from 'next';

describe('Contact API', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clear module cache
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

    // Define mock functions
    const mockSend = jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return [{}, {}];
    });

    const mockPost = jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return { data: {} };
    });

    // Apply mocks
    jest.doMock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: mockSend,
    }));
    jest.doMock('axios', () => ({
      post: mockPost,
    }));

    // Import handler AFTER mocks
    const handler = require('./contact').default;

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

    const start = performance.now();
    await handler(req, res);
    const end = performance.now();
    const duration = end - start;

    console.info(`Execution time: ${duration}ms`);

    expect(mockSend).toHaveBeenCalled();
    expect(mockPost).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('returns 200 on successful submission', async () => {
    const mockSend = jest.fn().mockResolvedValue([{}, {}]);
    const mockPost = jest.fn().mockResolvedValue({ data: {} });

    jest.doMock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: mockSend,
    }));
    jest.doMock('axios', () => ({
      post: mockPost,
    }));

    const handler = require('./contact').default;

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
    const mockSend = jest.fn();
    const mockPost = jest.fn();

    jest.doMock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: mockSend,
    }));
    jest.doMock('axios', () => ({
      post: mockPost,
    }));

    const handler = require('./contact').default;

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
    expect(mockSend).not.toHaveBeenCalled();
    expect(mockPost).not.toHaveBeenCalled();
  });

  it('returns 500 when sending email fails', async () => {
    const mockSend = jest.fn().mockRejectedValue(new Error('Email error'));
    const mockPost = jest.fn().mockResolvedValue({ data: {} });

    jest.doMock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: mockSend,
    }));
    jest.doMock('axios', () => ({
      post: mockPost,
    }));

    const handler = require('./contact').default;

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
    const mockSend = jest.fn().mockResolvedValue([{}, {}]);
    const mockPost = jest.fn().mockRejectedValue(new Error('Notification error'));

    jest.doMock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: mockSend,
    }));
    jest.doMock('axios', () => ({
      post: mockPost,
    }));

    const handler = require('./contact').default;

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
    jest.doMock('@sendgrid/mail', () => ({ setApiKey: jest.fn() }));
    jest.doMock('axios', () => ({}));

    const handler = require('./contact').default;

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
