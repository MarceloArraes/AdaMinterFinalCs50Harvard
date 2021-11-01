import subprocess
import json
from copy import deepcopy  

#'/home/cnode/minter2/minter'

def ipfsPush(imagePath,metadata):
  print("entered ipfsPush!!!!!!!")
  #img_path=sys.argv[1]
  img_path=imagePath
  #metadata_path=sys.argv[2]

  #print ("img_path", img_path)

  #Windows NODE_PATH:
  #node_path = 'C:\\Program Files\\nodejs\\node.exe'
  #Linux NODE_PATH:
  node_path = '/usr/bin/node'
#/home/cnode/minter2/minter/nftminter/ipfsPinata

  #print(f'{node_path}')

  #base_metadata = json.load(metadata)

  base_metadata = metadata

  metadata_hashes = json.load(open('./metadata_hashes.json'))
  print(metadata_hashes)

  metadata_hashes[img_path] = []


  def pin_img_to_pinata(img_path):
    ipfs_hash = subprocess.check_output([f'{node_path}','./_pinImgToPinata.js', img_path])
    print("IPFS_HASH: ", ipfs_hash)
    return ipfs_hash.decode().strip()

  def pin_metadata_to_pinata(img_ipfs_hash, edition_index):
      metadata = deepcopy(base_metadata)
      metadata['image'] = "https://gateway.pinata.cloud/ipfs/" + img_ipfs_hash
      #metadata['attributes'].append({'display_type': 'number', 'trait_type': 'Edition', 'max_value': 10, 'value': edition_index + 1})
      metadata_ipfs_hash = subprocess.check_output([node_path, './_pinMetadataToPinata.js', json.dumps(metadata), str(edition_index+1)])
      return metadata_ipfs_hash.decode().strip()

  img_ipfs_hash = pin_img_to_pinata(img_path)

  #for i in range(0, base_metadata['total_editions']):
  metadata_hash = pin_metadata_to_pinata(img_ipfs_hash, 0)
  metadata_hashes[img_path].append(metadata_hash)
  print(f'Edition: {1}; Metadata Hash: {metadata_hash}')

  json.dump(metadata_hashes, open('./metadata_hashes.json', 'w'))
  print("Done")