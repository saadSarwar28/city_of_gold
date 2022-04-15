/* 
  Discord Button 
*/

import React from 'react'

const DiscordButton = ({rest}) => {

  return (
    <a 
      className="discord-button" 
      href="http://discord.cityofgold.io/AmFbynx4" 
      target="_blank" 
      {...rest}
    >
      <button>JOIN OUR DISCORD</button>
    </a>
  )
}

export default DiscordButton;