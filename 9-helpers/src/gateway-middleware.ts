import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

// Contains names of all the services which this middlware expects
// to receive a request from
const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

export function verifyGatewayRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const message = 'Invalid Request',
    comingFrom =
      'verifyGatewayRequest() method: Request not coming from API gateway';

  if (!req.headers?.gatewayToken)
    throw new NotAuthorizedError(message, comingFrom);

  const token: string = req.headers?.gatewayToken as string;

  if (!token) throw new NotAuthorizedError(message, comingFrom);

  try {
    const payload: { id: string; iat: number } = jwt.verify(token, '') as {
      id: string;
      iat: number;
    };

    if (!token.includes(payload.id))
      throw new NotAuthorizedError(
        message,
        'verifyGatewayRequest() method: Request payload is invalid'
      );
  } catch (error) {
    throw new NotAuthorizedError(message, comingFrom);
  }
}
