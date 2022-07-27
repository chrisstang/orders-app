import { useOrderContext } from '../context/orderContext'
import { useMemo, useState } from 'react'
import { Button, Toast } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'
import styles from '../styles/Menu.module.scss'
import Link from 'next/link'
import MenuItem from '../components/Menu/MenuItem'

export default function Menu(props) {
  const { user } = useOrderContext() || { name : 'Guest'}
  const [menu, setMenu] = useState(Object.values(props))
  const [orderList, setOrderList] = useState([])
  const [showValidate, setShowValidate] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDelivered, setShowDelivered] = useState(false)
  const [showFail, setShowFail] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  const memoTotal = useMemo(() => {
    const totalAmount = orderList.reduce((acc, current) => acc + (current.price * current.quantity), 0)
    return totalAmount
  }, [orderList])

  const updateOrderList = (event, item) => {
    const { id, title, price } = item
    const value = event.target.value
    const hasItem = orderList.find( item => item.itemId == id)

    if (hasItem) {
      hasItem.quantity = value

      setOrderList(prevState => ([
        ...prevState
      ]))
    } else {
      const itemData = {
        itemId: id,
        title: title,
        quantity: value,
        price: price
      }

      setOrderList(prevState => ([
        ...prevState,
        itemData
      ]))
    }
  }

  const submitHanlder = async (event) => {
    event.preventDefault()

    const filterOrderList = orderList.filter( order => parseInt(order.quantity) !== 0)

    if (filterOrderList.length === 0)
    return setShowValidate(true)

    const orderObj = {
      order: filterOrderList,
      orderId: uuidv4(),
      createdDate: Date.now(),
      transactionAmount: memoTotal
    }

    try {
      const JSONdata = JSON.stringify(orderObj)
      const endpoint = '/api/create-order'
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
  
      const response = await fetch(endpoint, options)
      const result = await response.json()

      if (result.status === 'success') {
        setShowSuccess(true)
        setShowLoading(true)

        setTimeout(() => {
          setShowDelivered(true)
          setShowLoading(false)
        }, 3000);
      } else {
        setShowFail(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <main className='pb-5'>
        <div className="container pb-4">
          <h2>Menu</h2>

          <h3 className='fs-4 text-primary mb-4'>Hi, {user?.name ? user?.name : 'Guest'}</h3>
          <p>Please order from the list below.</p>

          <form name="menuForm" className={styles.orderForm} onSubmit={submitHanlder}>
            {menu.length && menu.map((item, index) => {
              return (
                <MenuItem key={`menu-item-${index}`} item={item} index={index} updateOrderList={updateOrderList} />
              )
            })}

            <div className={styles.summaryBar}>
              <div className='fs-4'>
                <span>Total</span>
                <span className='bg-gray rounded p-2 ms-2'><span className='fs-6'>MYR</span> {memoTotal}</span>
              </div>

              <Button variant='primary' type='submit'>Order</Button>
            </div>
          </form>

        </div>
      </main>

      {showLoading && (
        <div className="loading-overlay fs-3">Loading...</div>
      )}

      <Toast className={`bg-danger text-white`} onClose={() => setShowValidate(false)} show={showValidate} delay={2000} autohide>
        <Toast.Body>Please order at least 1 item.</Toast.Body>
      </Toast>

      <Toast className={`bg-success text-white`} onClose={() => setShowSuccess(false)} show={showSuccess} delay={2000} autohide>
        <Toast.Body>Create order successfully.</Toast.Body>
      </Toast>

      <Toast className={`bg-success text-white`} onClose={() => setShowDelivered(false)} show={showDelivered} delay={2000} autohide>
        <Toast.Body>
          Order has been delivered.<br />
          <Link href={'/my-order'}><a className='text-white'>View your order now.</a></Link>
        </Toast.Body>
      </Toast>

      <Toast className={`bg-danger text-white`} onClose={() => setShowFail(false)} show={showFail} delay={2000} autohide>
        <Toast.Body>Sorry, could not create order.</Toast.Body>
      </Toast>
    </>
  )
}

export async function getServerSideProps() {
  const result = await fetch('http:localhost:3000/api/menu')
  const menuItems = await result.json()

  return {
    props: {
      ...menuItems,
    }
  }
}