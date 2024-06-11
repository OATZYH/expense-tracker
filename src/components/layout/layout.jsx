'use client'
import Sidebar from '../sidebar/Sidebar'
import Header from './header'

export default function Layout({children}) {
  return (
    <section className="flex">
        <Sidebar />
        <Header>{children}</Header>
      </section>
  )
}
