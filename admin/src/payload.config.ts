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

const fullFilePath = path.resolve(__dirname, 'hooks/sendConfirmation.ts')
const mockModulePath = path.resolve(__dirname, 'mocks/modules.ts')

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            [fullFilePath]: mockModulePath,
          },
        },
      }
    },
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
    WritingTips
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
