// Get { data } from server variable
// better solution: with mongoose
import { data } from '../../constant/order'

/**
 * Database schema
 * [
 *  {
 *    orderId: String,
 *    order: [{
 *      itemId: String,
 *      title: String,
 *      price: Number
 *    }],
 *    status: String,
 *    createdDate: Date,
 *    canceledDate?: Date,
 *    transactionAmount: Number,
 *    user: String
 *  }
 * ]
 */

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(data)
  } else {
    res.status(405).json({ error: 'Method not allowed'})
  }
}