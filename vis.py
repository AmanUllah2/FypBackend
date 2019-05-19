import matplotlib.pyplot as plt
import pandas as pd

headers = ['Country', 'Visitors']

df = pd.read_csv("/home/aman/Desktop/DMS/CSV/3.csv", delimiter=",", names=headers)
x = df['Country']
y = df['Visitors']

plt.bar(x, y)
plt.xlabel('Destination IP')
plt.ylabel('Visited Websites')
plt.title('Visitors')
plt.show()