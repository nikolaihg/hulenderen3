import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { sanityConfig } from './lib/sanity.env'

export default defineConfig({
  name: 'default',
  title: 'Hulenderen 3.0',
  projectId: "ymr0rdxh",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})