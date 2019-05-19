import sys

try:
    import scapy.all as scapy
except ImportError:
    import scapy

try:
    import scapy_http.http
except ImportError:
    from scapy.layers import http

def process_pcap(in_filename, out_filename):
    print("done")

in_filename = "/home/aman/Desktop/DMS/Pcaps/testpcap.pcap"
out_filename = "/home/aman/Desktop/1.csv"

process_pcap(in_filename, out_filename)
