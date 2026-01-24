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

  // Helper to setup mocks and load handler
  const setupTest = (
    sendImpl = jest.fn().mockResolvedValue([{}, {}]),
    postImpl = jest.fn().mockResolvedValue({ data: {} })
  ) => {
    jest.doMock('@sendgrid/mail', () => ({
      setApiKey: jest.fn(),
      send: sendImpl,
    }));
    jest.doMock('axios', () => ({
      post: postImpl,
    }));

    const handler = require('./contact').default;
    return { handler, mockSend: sendImpl, mockPost: postImpl };
  };

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

    const mockSend = jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return [{}, {}];
    });
    const mockPost = jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, DELAY));
      return { data: {} };
    });

    const { handler } = setupTest(mockSend, mockPost);
    const req = createRequest();
    const res = createResponse();

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
    const { handler } = setupTest();
    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Form submitted successfully.' });
  });

  it('returns 400 when required fields are missing', async () => {
    const mockSend = jest.fn();
    const mockPost = jest.fn();
    const { handler } = setupTest(mockSend, mockPost);

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
    expect(mockSend).not.toHaveBeenCalled();
    expect(mockPost).not.toHaveBeenCalled();
  });

  it('returns 500 when sending email fails', async () => {
    const mockSend = jest.fn().mockRejectedValue(new Error('Email error'));
    const { handler } = setupTest(mockSend);

    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });

  it('returns 500 when sending notification fails', async () => {
    const mockPost = jest.fn().mockRejectedValue(new Error('Notification error'));
    const { handler } = setupTest(undefined, mockPost);

    const req = createRequest();
    const res = createResponse();

    await handler(req, res);

    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error.' });
  });

  it('returns 405 for non-POST requests', async () => {
    const { handler } = setupTest();
    const req = createRequest('GET');
    const res = createResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
