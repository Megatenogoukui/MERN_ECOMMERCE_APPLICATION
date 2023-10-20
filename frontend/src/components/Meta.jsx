import React from 'react'
import { Helmet } from 'react-helmet-async'
function Meta({title = 'Welcome to ProShop' ,description ,keyword}) {
  return (
   <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keyword} />
   </Helmet>
  )
}

export default Meta