import sys
import pandas as pd

# Import scapy module
try:
    import scapy.all as scapy
except ImportError:
    import scapy

# Import scapy-http module (needed to parse HTTP requests)
try:
    import scapy_http.http
except ImportError:
    from scapy.layers import http

# Process pcap from file named in_filename by looking for HTTP requests 
# and extracting: 1) Source IP address 2) Destination IP address 3)
# Hostname of web site being accessed. Write these out to a CSV file
# named out_filename.
def process_pcap(in_filename, out_filename):
    out_file = open(out_filename, "w+")

    packets = scapy.rdpcap(in_filename)

    # Let's iterate through every packet
    for packet in packets:
        # Check if this packet contains HTTP request
        if packet.haslayer('HTTPRequest'):
            # Extract HTTP header fields
            http_layer = packet.getlayer('HTTPRequest').fields
            # Extract IP header fields
            #ip_layer = packet.getlayer('IP').fields
            # Get source IP address and convert to string
            #src_ip_str = '{0[src]}'.format(ip_layer)
            # Get destination IP address and convert to string
            #dst_ip_str = '{0[dst]}'.format(ip_layer)
            ## Get web site hostname from 'Host' header in HTTP request.
            hostname = http_layer['Host'].decode('utf-8').rstrip(' \n')
            # Write things out to a CSV line.
            out_file.write(hostname +'\n')

    # Close output file       
    out_file.close()

in_filename = "test.pcap"
out_filename = "result12.csv"

process_pcap(in_filename, out_filename)

df = pd.read_csv("result12.csv", header=None, index_col=None)
df.columns = ['urls']
df.to_csv("result12.csv", index=False)