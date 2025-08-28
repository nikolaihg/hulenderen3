import {defineCliConfig} from 'sanity/cli'
import { sanityConfig } from './lib/sanity.env'

export default defineCliConfig({
  api: sanityConfig,
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})