const { init } = require("@airstack/node");
const { fetchQuery, fetchQueryWithPagination } = require("@airstack/node");
require("dotenv").config();

init(process.env.AIRSTACK_API_KEY);

const getPoapCount = async (username) => {
  const query = `query POAPsOwnedByFarcasterUser {
        Poaps(
            input: {
                filter: { owner: { _in: ["fc_fname:${username}"] } }
                blockchain: ALL
            }
            ) {
                Poap {
                    eventId
                    poapEvent {
                        eventName
                        eventURL
                        startDate
                        endDate
                        country
                        city
                        contentValue {
                            image {
                                extraSmall
                                large
                                medium
                                original
                                small
                            }
                        }
                    }
                }
                pageInfo {
                    nextCursor
                    prevCursor
                }
            }
        }`;
  const { data, error } = await fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }
  let poapCount = data.Poaps.Poap.length;
  if (data.Poaps.Poap.length === 50) {
    poapCount = "50+";
  }
  return poapCount.toString();
};

const getNFTCount = async (username) => {
  const query = `query NFTsOwnedByFarcasterUser {
    Ethereum: TokenBalances(
      input: {
        filter: {
          owner: { _in: ["fc_fname:${username}"] }
          tokenType: { _in: [ERC1155, ERC721] }
        }
        blockchain: ethereum
        limit: 200
      }
    ) {
      TokenBalance {
        owner {
          socials(input: { filter: { dappName: { _eq: farcaster } } }) {
            profileName
            userId
            userAssociatedAddresses
          }
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
    Polygon: TokenBalances(
      input: {
        filter: {
          owner: { _in: ["fc_fname:${username}"] }
          tokenType: { _in: [ERC1155, ERC721] }
        }
        blockchain: polygon
        limit: 200
      }
    ) {
      TokenBalance {
        owner {
          socials(input: { filter: { dappName: { _eq: farcaster } } }) {
            profileName
            userId
            userAssociatedAddresses
          }
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
    Base: TokenBalances(
      input: {
        filter: {
          owner: { _in: ["fc_fname:${username}"] }
          tokenType: { _in: [ERC1155, ERC721] }
        }
        blockchain: base
        limit: 200
      }
    ) {
      TokenBalance {
        owner {
          socials(input: { filter: { dappName: { _eq: farcaster } } }) {
            profileName
            userId
            userAssociatedAddresses
          }
        }
        amount
        tokenAddress
        tokenId
        tokenType
        tokenNfts {
          contentValue {
            image {
              extraSmall
              small
              medium
              large
            }
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }`;

  const { data, error } = await fetchQuery(query);
  if (error) {
    throw new Error(error.message);
  }

  let EthereumNFTCount = data.Ethereum.TokenBalance.length;
  let PolygonNFTCount = data.Polygon.TokenBalance.length;
  let BaseNFTCount = data.Base.TokenBalance.length;

  //   console.log(EthereumNFTCount, PolygonNFTCount, BaseNFTCount);

  if (data.Ethereum.TokenBalance.length === 200) {
    EthereumNFTCount = "200+";
  }
  if (data.Polygon.TokenBalance.length === 200) {
    PolygonNFTCount = "200+";
  }
  if (data.Base.TokenBalance.length === 200) {
    BaseNFTCount = "200+";
  }
  return {
    EthereumNFTCount: EthereumNFTCount.toString(),
    PolygonNFTCount: PolygonNFTCount.toString(),
    BaseNFTCount: BaseNFTCount.toString(),
  };
};

module.exports = { getPoapCount, getNFTCount };
