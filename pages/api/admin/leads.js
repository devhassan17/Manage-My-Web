import { readJsonData, writeJsonData } from '../../../utils/dataStore';

export default function handler(req, res) {
  let leads = readJsonData('leads.json', []);
  if (!Array.isArray(leads)) leads = [];

  // GET: Fetch all leads
  if (req.method === 'GET') {
    return res.status(200).json({ leads });
  }

  // PATCH: Update lead status or notes
  if (req.method === 'PATCH') {
    const { id, status, notes } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Lead ID required' });
    }

    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    if (status !== undefined) leads[index].status = status;
    if (notes !== undefined) leads[index].notes = notes;
    leads[index].updatedAt = new Date().toISOString();

    writeJsonData('leads.json', leads);
    return res.status(200).json({ success: true, lead: leads[index] });
  }

  // DELETE: Remove lead
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Lead ID required' });
    }

    const initialLength = leads.length;
    leads = leads.filter((l) => l.id !== id);
    if (leads.length === initialLength) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    writeJsonData('leads.json', leads);
    return res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
