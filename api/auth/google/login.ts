const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;
const SCOPE = encodeURIComponent('profile email');
const RESPONSE_TYPE = 'code';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const GET = async () => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&access_type=offline&prompt=consent`;
  return Response.redirect(url);
};
