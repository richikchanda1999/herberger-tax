function formatAddress(address: string | undefined, chars = 4): string {
  if (!address) {
    return ''
  }
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`
}

export { formatAddress}