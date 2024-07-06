/* eslint-disable */

import * as pactum from 'pactum';

module.exports = async function () {
  // Configure pactum
  const host = process.env.HOST ?? 'localhost';
  const port = process.env.PORT ?? '3000';
  pactum.request.setBaseUrl(`http://${host}:${port}`);
};
