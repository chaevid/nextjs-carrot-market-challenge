import { GetServerSidePropsContext, NextApiHandler } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { session as ironSession } from 'iron-session';

export const withSession = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: 'mini-twitter-session',
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
  });
};

export const getSession = async (
  ctx: GetServerSidePropsContext
): Promise<ironSession.Session> => {
  const session = await ctx.req.session.get('user');
  return session;
};
