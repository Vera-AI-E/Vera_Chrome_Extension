import socket
import numpy as np
import sys

node_word = str(sys.argv[1])
if node_word is not None:
    track_word = node_word

else:
    track_word = "kabul"

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((socket.gethostname(), 5080))
print("connected")
losses = []
full_msg = b''

while s:
    try:
        encoded_data = track_word.encode()
        s.sendall(encoded_data)
        print("track word sent")
        while True:
            data = s.recv(21)

            decoded_data = float(data.decode())
            full_msg = b''
            losses.append(decoded_data)

            array_losses = np.asarray(losses)
            mod_array = array_losses.copy()

            mod_array[mod_array >= 5] = -1
            anomalies = np.count_nonzero(mod_array == -1)
            std = np.std(array_losses)
            mean = np.mean(array_losses)
            anomaly_percentage = (anomalies/len(losses)) * 100

            print(f"std:{std}, mean: {mean},Anomalies: {(anomalies/len(losses)) * 100}% {track_word}")
            print("=" * 20)
            # sys.stdout.write(str(std))
            # sys.stdout.write(str(mean))
            if anomaly_percentage < 20:
                # f = open("green_circle.svg", "r", encoding="utf-8")
                sys.stdout.write("1")
            elif 20 <= anomaly_percentage < 40:
                #f = open("green_circle.svg", "r", encoding="utf-8")
                sys.stdout.write("2")
            else:
                #f = open("green_circle.svg", "r", encoding="utf-8")
                sys.stdout.write("3")
            sys.stdout.flush()

    except KeyboardInterrupt:
        if s:
            s.close()
            print("connection closed")
            break