/* eslint-disable no-unused-vars */
const axios = require('axios').default;
const { Consolidator } = require('rmrk-tools');
const rmrk1 = "https://singular.rmrk.app/api/rmrk1/account/";
const rmrk2 = "https://gql-rmrk2-prod.graphcdn.app/"


  export async function nftByAddress(data){
    let { address,rmrk,page } = data;
    if(typeof page === "undefined"){
        page = 1;
    }
    if(rmrk === 1){
        return await axios.get(rmrk1 + address);
    }else if(rmrk === 2){
        let param = {};
        param.query = "query PaginatedNftQuery(\n    $where: nfts_bool_exp!\n    $orderBy: [nfts_order_by!]\n    $limit: Int!\n    $offset: Int!\n  ) {\n    nfts(where: $where, order_by: $orderBy, limit: $limit, offset: $offset) {\n      ...NFT\n    }\n    nfts_aggregate(where: $where) {\n      aggregate {\n        count\n      }\n    }\n  }\n  \n  fragment NFT on nfts {\n    id\n    block\n    burned\n    forsale\n    collectionId\n    symbol\n    metadata\n    metadata_image\n    metadata_name\n    owner\n    rootowner\n    sn\n    transferable\n    priority\n    updated_at\n    equipped_id\n    pending\n    properties\n    resources {\n      metadata_content_type\n    }\n    dutchie {\n      initial_price\n      min_price\n      interval\n      reduction\n      start_time\n      active\n    }\n    singular_curated {\n      created_at\n    }\n    singular_nsfw {\n      created_at\n      reason\n    }\n    children_aggregate {\n      aggregate {\n        count\n      }\n    }\n    resources_aggregate(where: { pending: { _eq: false } }) {\n      aggregate {\n        count\n      }\n    }\n    pending_resources_aggregate: resources_aggregate(where: { pending: { _eq: true } }) {\n      aggregate {\n        count\n      }\n    }\n    collection {\n      issuer\n      max\n      metadata_name\n      metadata\n      singular_nsfw_collections {\n        created_at\n        reason\n      }\n      singular_verified_collections {\n        collection_id\n      }\n      singular_curated {\n        collection_id\n      }\n      firstIssuerChange: changes_collection(\n        where: { field: { _eq: \"issuer\" } }\n        order_by: { block: asc }\n        limit: 1\n      ) {\n        old\n      }\n    }\n  }\n\n"
        param.variables = {};
        param.variables.where = {};
        param.variables.where.rootowner = {}
        param.variables.where.rootowner._in = [address];
        param.variables.limit = 10;
        param.variables.offset = 10 * page;
        let r =  await axios.post(rmrk2,
            param, 
            {
            headers:{
                'Content-Type':'application/json',
                'authority': 'gql-rmrk2-prod.graphcdn.app'
            }
        })
        return r;

    }
}

  /**
   * Send an NFT to an arbitrary recipient.
   * _version :1.0.0  /  2.0.0
   * You can only SEND an existing NFT (one that has not been CONSUMEd yet).
   * https://github.com/rmrk-team/rmrk-spec/blob/master/standards/rmrk1.0.0/interactions/send.md
   * const [_prefix, _op_type, _version, id, recipient] = remark.split("::");
   */
  export async function sendNft(data){
    let { id,recipient,version } = data;
    if(typeof version === 'undefined'){
      version  = '1.0.0';
    }
    const consolidator = new Consolidator();
    const remark = 'rmrk::SEND::'+version+'::'+id+'::' + recipient;
    return consolidator.send(remark);
  }


  export function sendInteraction(
    remark,
    sendEntity,
    nft
  ){
    if (!nft) {
      throw new Error(
        `[SEND] Attempting to send non-existant NFT ${sendEntity.id}`
      );
    }
  
    if (Boolean(nft.burned)) {
      throw new Error(
        `[SEND] Attempting to send burned NFT ${sendEntity.id}`
      );
    }
  
    // Check if allowed to issue send - if owner == caller
    if (nft.owner != remark.caller) {
      throw new Error(
        `[SEND}] Attempting to send non-owned NFT ${sendEntity.id}, real owner: ${nft.owner}`
      );
    }
  
    if (nft.transferable === 0 || nft.transferable >= remark.block) {
      throw new Error(
        `[SEND] Attempting to send non-transferable NFT ${sendEntity.id}.`
      );
    }
  
    nft.updatedAtBlock = remark.block;
    nft.addChange({
      field: "owner",
      old: nft.owner,
      new: sendEntity.recipient,
      caller: remark.caller,
      block: remark.block,
      opType: "SEND",
    });
  
    nft.owner = sendEntity.recipient;
  };

// module.exports = {
//     nftByAddress
// }