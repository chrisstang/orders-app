import { useState } from "react"
import { Accordion, Button } from "react-bootstrap"
import styles from '../../styles/OrderGroup.module.scss'

export default function OrderGroup({ menu, setShowCancel }) {
  const [orderStatus, setOrderStatus] = useState({})

  const cancelOrder = async (e, orderId) => {
    e.preventDefault()

    try {
      const JSONdata = JSON.stringify({ orderId: orderId })
      const endpoint = '/api/cancel-order'
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }
  
      const response = await fetch(endpoint, options)
      const result = await response.json()

      if (!result.error && result.status == 'success') {
        setShowCancel(true)
        setOrderStatus({
          orderId: result.orderId,
          status: result.orderStatus
        })
      }

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Accordion defaultActiveKey="0">
      {menu.map( (group, index) => {
        if (group.orderId == orderStatus.orderId) {
          group.status = orderStatus.status
        }
        const statusColor = group.status == 'delivered' ? 'text-success' : group.status == 'confirmed' ? 'text-info' : 'text-danger'
        
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Button as={'div'}>
              <div>
                Order ID: {group.orderId}
                <div className="fs-sm mt-2">Order Status: <span className={`fw-bold text-capitalize ${statusColor}`}>{group.status}</span></div>
                <div className="fs-xs mt-2">Created Date: {new Date(group.createdDate).toLocaleString()}</div>
                <div className="d-flex align-items-center">
                  <div className="fs-sm d-inline-flex align-items-center bg-gray rounded py-1 px-2 mt-2">
                    <span><b>Total</b></span>
                    <span className="ms-3">MYR {group.transactionAmount}</span>
                  </div>
                  {group.status !== 'canceled' && (
                    <form onSubmit={(e) => cancelOrder(e, group.orderId)}>
                      <Button type="submit" variant="danger" className="fs-sm d-inline-flex align-items-center py-1 mt-2 ms-2" style={{ lineHeight: 1.2 }}>Cancel Order</Button>
                    </form>
                  )}
                </div>
              </div>
            </Accordion.Button>
            <Accordion.Body>
              {group.order?.length && group.order.map( (orderItem, orderIndex) => {
                return (
                  <div className={styles.menuItem} key={`menu-item-${orderIndex}`}>
                    <div className="d-flex">
                      <span>{orderItem.title}</span>
                      <span className="mx-4">x</span>
                      <span>{orderItem.quantity}</span>
                    </div>
                    <div className="text-end">
                      <div><small>MYR</small> <span className='fs-5 text-success ms-2'>{orderItem.price}</span></div>
                    </div>
                  </div>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}
