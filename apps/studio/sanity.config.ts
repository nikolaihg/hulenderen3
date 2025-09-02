import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { colorInput } from '@sanity/color-input'

export default defineConfig({
  name: 'default',
  title: 'Hulenderen 3.0',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET ?? '',
  plugins: [
    structureTool(), 
    visionTool(),
    colorInput(),
  ],
  schema: {
    types: schemaTypes,
  },
})