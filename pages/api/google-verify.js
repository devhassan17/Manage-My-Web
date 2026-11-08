import { readJsonData } from '../../utils/dataStore';

export default function handler(req, res) {
  const { token } = req.query;
  const cleanToken = String(token || '').replace(/[^a-zA-Z0-9_-]/g, '');

  if (!cleanToken) {
    return res.status(404).send('Not found');
  }

  const requestedFileName = `google${cleanToken}.html`;
  const settings = readJsonData('site-settings.json', {});
  const savedFileName = settings?.seo?.googleVerificationFileName;
  const savedFileContent = settings?.seo?.googleVerificationFileContent;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (savedFileName === requestedFileName && savedFileContent) {
    return res.status(200).send(savedFileContent);
  }

  // Standard Google Search Console HTML verification file format
  return res.status(200).send(`google-site-verification: ${requestedFileName}`);
}

