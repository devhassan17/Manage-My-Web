import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

  if (!fs.existsSync(leadsFilePath)) {
    fs.writeFileSync(leadsFilePath, '[]', 'utf8');
  }

  const rawData = fs.readFileSync(leadsFilePath, 'utf8');
  let leads = [];
  try {
    leads = JSON.parse(rawData || '[]');
  } catch (e) {
    leads = [];
  }

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

    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
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

    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf8');
    return res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
