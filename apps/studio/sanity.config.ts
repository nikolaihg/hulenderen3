import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { sanityConfig } from './lib/sanity.env'

export default defineConfig({
  name: 'default',
  title: 'Hulenderen 3.0',
  ...sanityConfig,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})