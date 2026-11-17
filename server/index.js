import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env')
const envResult = dotenv.config({ path: envPath })
console.log('Looking for .env at:', envPath)
console.log(envResult.error ? '.env NOT FOUND' : '.env loaded, MONGODB_URI is ' + (process.env.MONGODB_URI ? 'set' : 'MISSING'))

const TYPES = ['Retail furniture', 'Custom home furnishing', 'Bulk / mass production', 'Other']

const Enquiry = mongoose.model(
  'Enquiry',
  new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true, maxlength: 100 },
      phone: { type: String, trim: true, maxlength: 30 },
      email: { type: String, trim: true, lowercase: true, maxlength: 120 },
      type: { type: String, enum: TYPES, required: true },
      location: { type: String, trim: true, maxlength: 120 },
      message: { type: String, trim: true, maxlength: 2000 },
      referenceLink: { type: String, trim: true, maxlength: 300 },
    },
    { timestamps: true }
  ),
  'Inquiry'
)

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

// Emails each saved enquiry via Resend's HTTP API (SMTP ports are blocked on Render's free plan).
// Needs RESEND_API_KEY and NOTIFY_EMAIL; silently skipped when they are not set.
async function notifyByEmail(e) {
  const { RESEND_API_KEY: key, NOTIFY_EMAIL: to } = process.env
  if (!key || !to) return
  const rows = [
    ['Name', e.name], ['Phone', e.phone], ['Email', e.email], ['Enquiry type', e.type],
    ['Location', e.location], ['Message', e.message], ['Reference link', e.referenceLink],
  ].filter(([, v]) => v)
  const html = `<h2>New enquiry from the website</h2><table cellpadding="6" style="border-collapse:collapse">${
    rows.map(([k, v]) => `<tr><th align="left" valign="top">${k}</th><td style="white-space:pre-wrap">${esc(v)}</td></tr>`).join('')
  }</table>`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || 'Gurukrupa Website <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject: `New enquiry: ${e.name} (${e.type})`,
        html,
        text,
        ...(e.email ? { reply_to: e.email } : {}),
      }),
    })
    if (!r.ok) console.error('Email notification failed:', r.status, await r.text())
    else console.log('Email notification sent for', e._id.toString())
  } catch (err) {
    console.error('Email notification failed:', err.message)
  }
}

const app = express()
// Requests arrive via Vercel's /api rewrite and Render's proxy. Trust X-Forwarded-For so
// req.ip is the visitor's IP; otherwise the rate limiter would lump all visitors together.
app.set('trust proxy', true)
app.use(express.json({ limit: '20kb' }))
const clientOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:5173']
app.use(cors({ origin: clientOrigins }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post(
  '/api/enquiries',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false, validate: { trustProxy: false } }),
  async (req, res) => {
    const b = req.body || {}
    if (b.hpField) {
      console.log('Blocked as spam (hidden field was filled in). Nothing saved.')
      return res.status(201).json({ ok: true }) // honeypot: bots fill this
    }
    const errors = {}
    if (!b.name?.trim()) errors.name = 'Enter your name.'
    if (!b.phone?.trim() && !b.email?.trim()) errors.contact = 'Enter a phone number or an email.'
    if (b.email && !/^\S+@\S+\.\S+$/.test(b.email)) errors.email = 'Enter a valid email address.'
    if (!TYPES.includes(b.type)) errors.type = 'Choose an enquiry type.'
    if (b.referenceLink && !/^https?:\/\//i.test(b.referenceLink)) errors.referenceLink = 'Link must start with http:// or https://'
    if (Object.keys(errors).length) {
      console.log('Rejected, validation errors:', errors)
      return res.status(400).json({ ok: false, errors })
    }
    try {
      const { name, phone, email, type, location, message, referenceLink } = b
      const doc = await Enquiry.create({ name, phone, email, type, location, message, referenceLink })
      console.log('Saved enquiry', doc._id.toString(), 'in database', mongoose.connection.name)
      res.status(201).json({ ok: true })
      notifyByEmail(doc) // after responding, so the visitor never waits on (or sees) email problems
    } catch (e) {
      console.error('Save failed:', e.message)
      res.status(500).json({ ok: false, error: 'Could not save your enquiry.' })
    }
  }
)

const mongoUri = process.env.MONGODB_URI || (
  process.env.NODE_ENV === 'production' ? '' : 'mongodb://127.0.0.1:27017/furniture'
)
if (!mongoUri) throw new Error('MONGODB_URI must be set in production.')
await mongoose.connect(mongoUri)
console.log('Connected to:', mongoose.connection.host, '| database:', mongoose.connection.name)
console.log('Email notifications:', process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL
  ? 'ON' : 'OFF (set RESEND_API_KEY and NOTIFY_EMAIL to enable)')
app.listen(process.env.PORT || 5000, () => console.log('API ready'))