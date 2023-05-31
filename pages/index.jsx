import Header from "@/components/layout/Header"
import Head from "next/head"
import Home from "./home"

export default function Index() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
          </Head>
      <Home />
        </div>
        )
}
