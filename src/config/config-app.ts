import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })

export const PORT = process.env.PORT || 8000