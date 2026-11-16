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

const app = express()
app.use(express.json({ limit: '20kb' }))
const clientOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:5173']
app.use(cors({ origin: clientOrigins }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post(
  '/api/enquiries',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false }),
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
app.listen(process.env.PORT || 5000, () => console.log('API ready'))