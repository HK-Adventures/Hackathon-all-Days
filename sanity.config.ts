/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemaTypes'

const config = defineConfig({
  name: 'default',
  title: 'Kapra Store',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Ensure proper routing within the studio
    productionUrl: async (prev, context) => {
      const { document } = context;
      if (document._type === 'product') {
        return `/products/${document._id}`;
      }
      return prev;
    },
  },
})

export default config
