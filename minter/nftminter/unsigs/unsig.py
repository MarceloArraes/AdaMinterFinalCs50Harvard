import numpy as np
from PIL import Image

#pixel dimension
dim = 4096

#replace the content inside {} with your unsig's properties
unsig = {'index': 927017,
         'num_props': 5,
         'properties': {
             'multipliers'   : [99,99,5,5,1.6],
             'colors'        : ['Green', 'Blue', 'Red', 'Red', 'Blue'],
             'distributions' : ['CDF', 'CDF', 'CDF', 'CDF', 'CDF'],
             'rotations'     : [270, 180, 270, 180, 270]}}

def norm(x , mean , std):
    p = (np.pi*std) * np.exp(-0.5*((x-mean)/std)**2)
    return p

def scale_make2d(s):
    scaled = np.interp(s, (s.min(), s.max()), (0, u_range))
    two_d = np.tile(scaled, (dim, 1))
    return two_d

def gen_nft(nft):
    idx = unsig['index']
    props = unsig['properties']
    props['multipliers']=list(map(float, props['multipliers']))
    props['rotations']=list(map(int, props['rotations']))

    n = np.zeros((dim, dim, 3)).astype(np.uint32)

    for i in range(unsig['num_props']):
        mult = props['multipliers'][i]
        col = props['colors'][i]
        dist = props['distributions'][i]
        rot = props['rotations'][i]
        c = channels[col]
        buffer =  mult * np.rot90(dists[dist], k=(rot / 90))
        n[ :, :, c ] = n[ :, :, c ] + buffer

    n = np.interp(n, (0, u_range), (0, 255)).astype(np.uint8)

    return (idx, n)

if __name__ == '__main__':
    #setup
    x = list(range(dim))
    u_range = 4294967293
    mean = np.mean(x)
    std = dim/6

    #probability and cumulative distribution
    p_1d = np.array(norm(x, mean, std)).astype(np.uint32)
    c_1d = np.cumsum(p_1d)

    #2d arrays
    p_2d = scale_make2d(p_1d)
    c_2d = scale_make2d(c_1d)

    #dicts for retrieving values
    dists = {'Normal': p_2d, 'CDF': c_2d}
    channels = {'Red': 0, 'Green': 1, 'Blue': 2}

    #make your nft
    i, nft = gen_nft(unsig)

    img = Image.fromarray(nft)
    img.save(f'{i:05d}.png')    
