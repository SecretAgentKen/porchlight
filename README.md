# Porchlight
Node app for controlling my porchlight

# Instructions

- Create a `private.yml` with host, lat, and lon
- Create image with `sudo podman build . -t porchlight`
- Output image as tar with `sudo podman save --output porchlight.tar localhost/porchlight`
- Transfer to cluster
- Import with `sudo k3s ctr images import porchlight.tar`
- Install with helm from the helm dir: `helm install porchlight . -f ../private.yml`