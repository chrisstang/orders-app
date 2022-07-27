import Link from 'next/link'
import { useState } from 'react'
import { Alert, Toast } from 'react-bootstrap'
import { useOrderContext } from '../context/orderContext'
import OrderGroup from '../components/OrderGroup'

export default function Menu(props) {
  const { user } = useOrderContext()
  const [menu, setMenu] = useState(Object.values(props))
  const [showCancel, setShowCancel] = useState(false)  

  return (
    <>
      <main className='pb-5'>
        <div className="container pb-4">
          <h2>My Order</h2>

          <h3 className='fs-4 text-primary mb-4'>Hi, {user?.name ? user?.name : 'Guest'}</h3>

          {menu.length > 0 && (
            <>
              <p>Please find the order list below.</p>
              <OrderGroup menu={menu} setShowCancel={setShowCancel} />
            </>
          )}

          {menu.length === 0 && (
            <>
              <p>You don&rsquo;t have any order yet.</p>
              <Alert variant='primary'>
                <Link href={'/'}><a className='mb-0'>Please order from the menu here.</a></Link>
              </Alert>
            </>
          )}

          <Toast className={`bg-primary text-white`} onClose={() => setShowCancel(false)} show={showCancel} delay={3000} autohide>
            <Toast.Body>Order has been canceled.</Toast.Body>
          </Toast>

        </div>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const result = await fetch('http:localhost:3000/api/check-order')
  const menuItems = await result.json()

  return {
    props: {
      ...menuItems
    }
  }
}