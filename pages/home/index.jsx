import Carousel from '@/components/ui/Carousel'
import Campaings from '@/components/ui/Campaings'
import MenuWrapper from '@/components/product/MenuWrapper'
import About from '@/components/ui/About'
import Reservation from '@/components/ui/Reservation'
import Customers from '@/components/customers/Customers'
import Footer from '@/components/layout/Footer'
const Home = () => {
  return (
    <>
      <Carousel />
      <Campaings />
      <MenuWrapper />
      <About />
      <Reservation />
      <Customers />
    </>
  )
}

export default Home