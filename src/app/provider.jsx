'use client'

import {NextUIProvider} from '@nextui-org/react'
import Layout from '@/components/layout/layout'

export function Providers({children}) {
  return (
    <NextUIProvider>
      <Layout>{children}</Layout>
    </NextUIProvider>
  )
}