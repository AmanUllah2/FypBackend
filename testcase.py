import pandas as pd
import numpy as np
from sklearn import metrics
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

names=['URL','Category']
df=pd.read_csv('/home/aman/Desktop/Axios/FypBackend/URL Classification2.csv',names=names, na_filter=False)
df1 = df[1:200]
df2 = df[201:300]
df3 = df[300:400]
df4 =df[400:450]
df5 = df[450:500]
df6= df[500:550]
df7=  df[550:580]
df8=  df[580:630]
df9=  df[630:680]
df10=  df[680:750]
df11=  df[750:800]
df12=  df[800:850]
df13=  df[850:880]
df14=  df[880:900]
df15=  df[900:911]
dt=pd.concat([df1,df2,df3,df4,df5,df6,df7,df8,df9,df10,df11,df12,df13,df14,df15], axis=0)
df.drop(df.index[1:200],inplace= True)
df.drop(df.index[201:300],inplace= True)
df.drop(df.index[300:400],inplace= True)
df.drop(df.index[400:450],inplace= True)
df.drop(df.index[450:500],inplace= True)
df.drop(df.index[500:550],inplace= True)
df.drop(df.index[550:580],inplace= True)
df.drop(df.index[580:630],inplace= True)
df.drop(df.index[630:680],inplace= True)
df.drop(df.index[680:750],inplace= True)
df.drop(df.index[750:800],inplace= True)
df.drop(df.index[800:850],inplace= True)
df.drop(df.index[850:880],inplace= True)
df.drop(df.index[880:900],inplace= True)
df.drop(df.index[900:911],inplace= True)

df.Category.value_counts().plot(figsize=(12,5),kind='bar',color='green')
x = np.linspace(0, 20, 100)  # Create a list of evenly-spaced numbers over the range
plt.xlabel('Category')
plt.ylabel('Total Number Of Individual Category for Training')
plt.show()
