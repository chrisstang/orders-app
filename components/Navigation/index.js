import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className='nav d-flex'>
        <Link href={'/'}>
            <a className='ms-3'>Menu</a>
        </Link>
        <Link href={'/my-order'}>
            <a className='ms-3'>My Order</a>
        </Link>
    </nav>
  )
}
