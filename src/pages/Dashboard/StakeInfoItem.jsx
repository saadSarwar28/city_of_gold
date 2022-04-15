/*
  This component use in Staking page
*/

import React from 'react'

const StakeInfoItem = ({
  amount,
  title,
}) => {
  return (
    <div className="stakeinfo__item">
      <div className="stakeinfo__item__content">
        <h2 className='stakeinfo__item__content__amount'>{amount}</h2>
        <p className='stakeinfo__item__content__title'>{title}</p>
      </div>
    </div>
  )
}

export default StakeInfoItem