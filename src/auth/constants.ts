export const jwtConstants = {
  secret: `${process.env.JWT_SECRET}`,
  accessExpiration: '15m',
  refreshExpiration: '7d',
};
