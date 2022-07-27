// Get { data } from server variable
// better solution: with mongoose
import { data } from '../../constant/order'

export default async function handler(req, res) {
  if (req.method !== 'POST')
  return res.status(405).json({ error: 'Method not allowed'})

  if (!req.body.orderId) 
  return res.status(402).json({ error: 'Order ID not found'})

  const filterOrder = data.find( singleOrder => singleOrder.orderId === req.body.orderId)

  if (filterOrder) {
    filterOrder.status = 'canceled'

    const canceledDate = Date.now()
    filterOrder.canceledDate = canceledDate

    res.status(200).json({
      status: 'success',
      orderId: filterOrder.orderId,
      orderStatus: filterOrder.status,
      canceledDate: canceledDate,
      message: 'Your order has been canceled.'
    })
  } else {
    res.status(500).json({ status: 'error', message: 'Could not find the order.'})
  }
}