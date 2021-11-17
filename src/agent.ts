import { 
  TransactionEvent, 
  Finding, 
  HandleTransaction, 
  FindingSeverity, 
  FindingType,
  getJsonRpcUrl

} from 'forta-agent'
import Web3 from 'web3';
import {EVENT,NFT_CONTRACT} from "./consts"

const web3 = new Web3(getJsonRpcUrl())
const handleTransaction: HandleTransaction = async (txEvent: TransactionEvent) => {
  const findings: Finding[] = [];
  const events = txEvent.filterLog(EVENT,NFT_CONTRACT.toLowerCase())
  for (const ev of events){
    findings.push(
      Finding.fromObject({
        name: "NFT_PAUSED",
        description: `NFT Paused by owner`,
        alertId: "FORTA-4000",
        severity: FindingSeverity.Info,
        type: FindingType.Info,
        metadata:{
          tx:txEvent.hash,
        }
        

      })
     )
  }

  return findings;
}

export default {
  handleTransaction
}