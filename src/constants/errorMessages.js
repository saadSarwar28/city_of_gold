const errorsMessage = {
  INSTALL_METAMASK: "Please install metamask",
  NOT_ENOUGH_ETH: "Not enough ETH in your wallet",
  CONNECT_METAMASK_FIRST: "Please connect Metamask first",
  SWITCH_TO_RINKEBY_TESTNET: "Please switch to Rinkeby testnet in metamask.",
  ALREADY_MAX_NFT_MINTABLE: (maxMint, nftBalance) => `Max ${maxMint} nft mintable and you already have ${nftBalance.toString()}`,
  ALREADY_APPROVED: "Already approved!",
  SELECT_AT_LEAST_NOT_MORE_THAN_THREE_LAND_TOKENS: "Please select at least and not more than 3 LAND tokens.",
  ESTATE_CAN_MINTED_BY_THREE_CONSECUTIVE_LANDS: "ESTATE can only be minted by three consecutive lands.",
  LAND_APPROVED: "Land approved",
  CONVERSION_REQUIRE_APPROVAL_FIRST: "Conversion requires approval first!",

}

export default errorsMessage;