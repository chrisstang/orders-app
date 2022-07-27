import jwt from 'jsonwebtoken'
import { data } from '../../constant/order'

export default async function handler(req, res) {
  if (req.method !== 'POST')
  return res.status(405).json({ error: 'Method not allowed'})

  try {
    const result = await processPayment(req, res)

    if (result.status !== 'success')
    return res.status(500).json({ error: result.message })

    const paymentStatus = result.data.paymentStatus === 'confirmed' ? 'confirmed' : 'canceled'

    let singleOrder = {
      ...req.body,
      user: result.data.user,
      status: paymentStatus
    }

    data.push(singleOrder)

    if (paymentStatus === 'confirmed') {
      res.status(200).json({ status: 'success', message: 'Create order successfully.' })
      updateOrderStatus(singleOrder)
    } else {
      res.status(402).json({ status: 'fail', message: 'Payment declined, your transaction cannot be completed.' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Could not create order.' })
  }
}

async function processPayment(req, res) {
  try {
    const paymentEndpoint = 'http://localhost:5000'
    const mockedUser = 'Guest'
    const data = {
      ...req.body,
      user: mockedUser,
      status: 'created'
    }
  
    const token = jwt.sign(data, 'secret', { expiresIn: '5m'})
  
    const response = await fetch(paymentEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
    })
    const result = await response.json()
  
    return result
  } catch (error) {
    return { status: 'error', message: error }
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateOrderStatus(order) {
  if (order.status === 'confirmed') {
    await timeout(3000)

    const filterOrder = data.find( singleOrder => singleOrder.orderId === order.orderId)
    filterOrder.status = 'delivered'
  } 
}