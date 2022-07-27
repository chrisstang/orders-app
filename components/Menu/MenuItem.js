import styles from '../../styles/Menu.module.scss'

export default function MenuItem({ item, index, updateOrderList }) {
  return (
    <div className={styles.menuItem} key={`menu-item__${index}`}>
        <div>
            <div className="fs-4">{item?.title}</div>
            <div><small>MYR</small> <span className='fs-6 text-success'>{item?.price}</span></div>
        </div>
        <div className={`${styles.itemQuantity} d-flex align-items-center`}>
            <label htmlFor="quantity" className='form-label me-2'>Quantity</label>
            <input type="number" name="quantity" min={0} className="form-control" onChange={(e) => updateOrderList(e, item)} />
        </div>
    </div>
  )
}
