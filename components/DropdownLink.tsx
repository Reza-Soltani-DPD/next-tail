import Link from 'next/link'
import React from 'react'


type DropdownLinkType={
	href:string,
	children:React.ReactNode,
	tw_class:string
}
export default function DropdownLink(props:DropdownLinkType) {
	const {href,children,tw_class}=props
  return (
<Link href={href} legacyBehavior passHref>
	<a className={tw_class}  >{children}</a>
</Link>  )
}
