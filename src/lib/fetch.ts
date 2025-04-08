import 'server-only'
import { cache } from "react"

import { isDevelopment } from '@/lib/utils'

const fetchGraphQL = cache(async (query: string, preview = isDevelopment) => {
    try {
        const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
            cache: 'force-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
                    }`
            },
            body: JSON.stringify({ query })
        })

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.info(error)
        return null
    }
})
export const getPageSeo = cache(async (slug: string, preview = isDevelopment) => {
    try {
        const entry = await fetchGraphQL(
            `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            seo {
              title
              description
              ogImageTitle
              ogImageSubtitle
              keywords
            }
          }
        }
      }`,
            preview
        )

        return entry?.data?.pageCollection?.items?.[0] ?? null
    } catch (error) {
        console.info(error)
        return null
    }
})