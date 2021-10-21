import subprocess
import sys
import json
from copy import deepcopy  

img_path=sys.argv[1]
metadata_path=sys.argv[2]
print ("img_path", img_path)

print(sys.argv)



node_path = 'C:\\Program Files\\nodejs\\node.exe'
print(f'{node_path}')

base_metadata = json.load(open(metadata_path))

metadata_hashes = json.load(open('./metadata_hashes.json'))
metadata_hashes[img_path] = []


def pin_img_to_pinata(img_path):
  ipfs_hash = subprocess.check_output([f'{node_path}','./_pinImgToPinata.js', img_path])
  print("IPFS_HASH: ", ipfs_hash)
  return ipfs_hash.decode().strip()

def pin_metadata_to_pinata(img_ipfs_hash, edition_index):
    metadata = deepcopy(base_metadata)
    metadata['image'] = base_metadata['image'] + img_ipfs_hash
    metadata['attributes'].append({'display_type': 'number', 'trait_type': 'Edition', 'max_value': 10, 'value': edition_index + 1})
    metadata_ipfs_hash = subprocess.check_output([node_path, './_pinMetadataToPinata.js', json.dumps(metadata), str(edition_index+1)])
    return metadata_ipfs_hash.decode().strip()

img_ipfs_hash = pin_img_to_pinata(img_path)

for i in range(0, base_metadata['total_editions']):
    metadata_hash = pin_metadata_to_pinata(img_ipfs_hash, i)
    metadata_hashes[img_path].append(metadata_hash)
    print(f'Edition: {i+1}; Metadata Hash: {metadata_hash}')

json.dump(metadata_hashes, open('./metadata_hashes.json', 'w'))
print("Done")