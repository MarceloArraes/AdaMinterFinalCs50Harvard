from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import numpy as np
from PIL import Image
from .models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random
import js2py

def index(request):
    return render(request, "nftminter/index.html")

def node(request):
    return HttpResponseRedirect("http://localhost:3000/")

def upload(request):
    return render(request, "nftminter/upload.html")

def fees(request):
    js_1 = 'console.log("Running JavaScript in Python")'
    res1 = js2py.eval_js(js_1)
    # Print the result
    res1

    return JsonResponse({"message": "Like retrieved successfully."}, status=201)
    #return render(request, "nftminter/upload.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "nftminter/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "nftminter/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "nftminter/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "nftminter/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "nftminter/register.html")





@csrf_exempt
def createUnsig(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    multipliersIn = data.get("unsigmultipliers")
    colorsIn = data.get("unsigcolors")
    distributionsIn = data.get("unsigdistributions")
    rotationsIn= data.get("unsigrotations")

    #res =  multipliers.split(",")
    multiFloats = [float(i) for i in multipliersIn.split(",") ]
    rotationNumbers = [int(i) for i in rotationsIn.split(",") if i.isdigit()]

    rnd = random.randrange(1000000)

    print(multipliersIn, colorsIn, distributionsIn, rotationsIn)
    #pixel dimension
    dim = 4096

    #replace the content inside {} with your unsig's properties
    unsig = {'index': rnd,
            'num_props': 5,
            'properties': {
                'multipliers'   : multiFloats,
                'colors'        : colorsIn,
                'distributions' : distributionsIn,
                'rotations'     : rotationNumbers}}
    
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

    if __name__ == 'nftminter.views':
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
        img_index = f'{i:05d}.png'
        img.save(fr"C:\Users\MarceloSSD\Documents\Harvard COURSE\minter\project4\nftminter\static\img\{img_index}")

        return JsonResponse({"message": "Unsig created successfully","img_index":img_index, "unsig_data":unsig}, status=201)
    return JsonResponse({"message": "Dont know if it worked or not."}, status=400)