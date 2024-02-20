import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Posts from './collections/Posts'
import Competitions from './collections/Competitions'
import Media from './collections/Media'

import PrivacyCompetition from './globals/PrivacyCompetition'
import WritingTips from './globals/WritingTips'
import InstructionSteps from './globals/InstructionSteps'
import PrivacyWebsite from './globals/PrivacyWebsite'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  cors: '*',
  collections: [
    Users,
    Posts,
    Competitions,
    Media
  ],
  globals: [
    PrivacyCompetition,
    PrivacyWebsite,
    WritingTips,
    InstructionSteps
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
