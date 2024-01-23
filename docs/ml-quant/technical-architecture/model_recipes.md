# 1. Loading Data and Managing Data Types

In this recipe, we show how to load a dataset into Python. 
In order to show the entire pipeline including working with messy data.
We apply some transformation to the original dataset.
For more information on applied changes, please refer to the accompanying GitHub repositoty
### How to do it
Execute the following steps to load a dataset into Python

1. Import the libraries:


```python
import pandas as pd
```

2. Preview a CSV file:


```python
! head -n 5 '/Users/minhdang/Documents/Minh_U/Portfolio/US_consumer_loan/cookbook.csv'
```

    acc_open_past_24mths,apr,contractual_payment_amount,current_rating,dti,dti_incl_mortgage,fico_range_high,inquires_6mo,interest_rate_adj,interest_rate_exp,mo_sin_old_rev_tl_op,mo_sin_rcnt_rev_tl_op,months_since_credit_inquiry,months_since_recent_bankcard_acc_open,num_accounts_open_12m,num_bankcards,num_bankcards_good_standing,num_delinq_2years,num_mortgage_accounts,num_open_accounts,num_public_records,original_contractual_due_day,original_principal_balance,outstanding_principal_balance,pct_trades_never_delinquent,percent_bc_gt_75,primary_income,purchase_interest,purchase_price,recovery_amount,recovery_collection_fee,region_or_state,remaining_term,revolving_utilization,term,tot_accounts,tot_cred_bal_ex_mort,tot_cred_rev_bal,total_public_records_bankruptcy,accrued_interest,Month_on_book,dff,cpi,unrate,target
    5.0,0.2465,349.63,NEAR_PRIME,0.083653846154,0.466451928778,634,1.0,0.1929,0.1929,46.0,10.0,3.0,10.0,2.0,7.0,5.0,0.0,0.0,7.0,0.0,21.0,9500.0,9500.0,1.0,0.6,33280.0,15.06,9515.06,,,NV,35,64.8,36,9.0,8493.0,8493.0,0.0,50.21,0,1.21,7.924919184464071,3.6,0
    5.0,0.2465,349.63,NEAR_PRIME,0.083653846154,0.466451928778,634,1.0,0.1929,0.1929,46.0,10.0,3.0,10.0,2.0,7.0,5.0,0.0,0.0,7.0,0.0,21.0,9500.0,9300.99,1.0,0.6,33280.0,15.06,9515.06,,,NV,34,64.8,36,9.0,8493.0,8493.0,0.0,54.07,1,1.68,6.423611018812459,3.5,0
    5.0,0.2465,349.63,NEAR_PRIME,0.083653846154,0.466451928778,634,1.0,0.1929,0.1929,46.0,10.0,3.0,10.0,2.0,7.0,5.0,0.0,0.0,7.0,0.0,21.0,9500.0,9103.74,1.0,0.6,33280.0,15.06,9515.06,,,NV,33,64.8,36,9.0,8493.0,8493.0,0.0,52.93,2,2.33,8.46391746602624,3.7,0
    5.0,0.2465,349.63,NEAR_PRIME,0.083653846154,0.466451928778,634,1.0,0.1929,0.1929,46.0,10.0,3.0,10.0,2.0,7.0,5.0,0.0,0.0,7.0,0.0,21.0,9500.0,8903.26,1.0,0.6,33280.0,15.06,9515.06,,,NV,32,64.8,36,9.0,8493.0,8493.0,0.0,47.05,3,2.56,8.38296430227019,3.5,0


3. Load the data from the CSV file:


```python
df = pd.read_csv('/Users/minhdang/Documents/Minh_U/Portfolio/US_consumer_loan/cookbook.csv', low_memory=False)
```

The DataFrame has 705695 rows and 45 columns

4. Separate the features from the target


```python
X = df.copy()
y = X.pop('target')
```

After running this block of code, x no longer contains the target columns

### How it works...
- In Step 1, we imported the pandas library.
- In Step 2, we used the bash command head (with an additional argument -n 5) to preview the first five rows of the CSV file. This can come in handy when we want to determine what kind of data we are dealing with, without opening a potentially large text file.
Inspecting a few rows of the dataset raised the following questions:
    - What is the separator?
    - Are there any special characters that need to be escaped?
    - Are there any missing values and, if so, what scheme (NA, empty string, nan and so on) is used for them?
    - What variables types (floats, integers, strings) are in the file? Based on that information, we can try to optimize memory usage while loading the file.
- In Step 3, we loaded the CSV file by using the pd.read_csv function. When doing so, we indicated that the first column (zero-indexed) contained the index, and empty strings should be interpreted as missing values. 
- In the last step, we separated the features from the target by using the pop method. It assigned the given column to the new variable, while removing it from the source DataFrame
- In the following, we provide a simplified description of the variables:

- The target variable indicates whether the customer defaulted on the payment in the following month.


### There's more...
- In general, pandas tries to load and store data efficiently. It automatically assigns data types (which we can inspect by calling the dtypes method of a pandas DataFrame). However, there are some tricks that can lead to much better memory allocation, which definitely make working with larger tables (in hundreds of MBs, or even GBs) easier.

1. We start by inspecting the data types in our DataFrame:


```python
df.dtypes
```




    acc_open_past_24mths                     float64
    apr                                      float64
    contractual_payment_amount               float64
    current_rating                            object
    dti                                      float64
    dti_incl_mortgage                        float64
    fico_range_high                            int64
    inquires_6mo                             float64
    interest_rate_adj                        float64
    interest_rate_exp                        float64
    mo_sin_old_rev_tl_op                     float64
    mo_sin_rcnt_rev_tl_op                    float64
    months_since_credit_inquiry              float64
    months_since_recent_bankcard_acc_open    float64
    num_accounts_open_12m                    float64
    num_bankcards                            float64
    num_bankcards_good_standing              float64
    num_delinq_2years                        float64
    num_mortgage_accounts                    float64
    num_open_accounts                        float64
    num_public_records                       float64
    original_contractual_due_day             float64
    original_principal_balance               float64
    outstanding_principal_balance            float64
    pct_trades_never_delinquent              float64
    percent_bc_gt_75                         float64
    primary_income                           float64
    purchase_interest                        float64
    purchase_price                           float64
    recovery_amount                          float64
    recovery_collection_fee                  float64
    region_or_state                           object
    remaining_term                             int64
    revolving_utilization                    float64
    term                                       int64
    tot_accounts                             float64
    tot_cred_bal_ex_mort                     float64
    tot_cred_rev_bal                         float64
    total_public_records_bankruptcy          float64
    accrued_interest                         float64
    Month_on_book                              int64
    dff                                      float64
    cpi                                      float64
    unrate                                   float64
    target                                     int64
    dtype: object



- In the preceding image, we see a few distinct data types: floats (floating-point numbers, such as 3.42), integers, and objects. The last ones are the pandas representation of string variables. The number next to float and int indicates how many bits this type uses to represent a particular value. The default types use 64 bits of memory.
- We also leverage a special type called category. The underlying idea is that string variables are encoded as integers, and pandas uses a special mapping dictionary to decode them back into their original form. This is especially useful when dealing with a limited number of distinct string values (for example, current_rating, region_or_state, and so on).

2. We define a function, which we use to inspect how much memory (in MBs) a DataFrame actually uses:


```python
def get_df_memory_usage (df, top_columns=5):
    print('Memory usage ----')
    memory_per_column = df.memory_usage(deep=True) / 1024 ** 2
    print(f'Top {top_columns} columns by memory (MB):')
    print(memory_per_column.sort_values(ascending=False) \
                                   .head(top_columns))
    print(f'Total size: {memory_per_column.sum():.4f} MB')
```

3. Inspect the size of the initial DataFrame (just as we loaded it from the source CSV file):


```python
get_df_memory_usage(df)
```

    Memory usage ----
    Top 5 columns by memory (MB):
    current_rating                40.158072
    region_or_state               39.706802
    original_principal_balance     5.384026
    term                           5.384026
    percent_bc_gt_75               5.384026
    dtype: float64
    Total size: 311.3781 MB


- In total, the DataFrame uses ~311 MB of memory, with ~25% of that used by columns with the object data type. This is still very small in terms of the current machines' capabilities, however, the memory-saving principles we show here apply just as well to DataFrames measured in gigabytes.
- We create a copy of the original DataFrame and change the types of the object columns to category. We first select the names of the columns with variables of the object type (using the select_dtypes method), and then convert them to a categorical type using the astype method.

4. Convert object columns to categorical:


```python
df_cat = df.copy()
object_columns = df_cat.select_dtypes(include='object').columns
df_cat[object_columns] = df_cat[object_columns].astype('category')
```

5. Inspect the size of the DataFrame:


```python
get_df_memory_usage(df_cat)
```

    Memory usage ----
    Top 5 columns by memory (MB):
    original_principal_balance     5.384026
    acc_open_past_24mths           5.384026
    pct_trades_never_delinquent    5.384026
    percent_bc_gt_75               5.384026
    primary_income                 5.384026
    dtype: float64
    Total size: 232.8672 MB


- With this simple transformation, we managed to reduce the size (memory-wise) of the DataFrame by ~80%. We could also downcast the integer columns (currently using the int64 type) to something much smaller memory-wise, but for that, we would need to inspect the min and max values for each column and determine which type would be the best fit. We do not do this here; however, the process of using astype is the same.

# 2. Explore Data Analysis

- The second step, after loading the data, is to carry out Exploratory Data Analysis (EDA). By doing this, we get to know the data we are supposed to work with. Some insights we try to gather are:
    - What kind of data do we actually have, and how should we treat different types?
    - What is the distribution of the variables?
        - Are there outliers in the data, and how can we treat them?
        - Are any transformations required? For example, some models work better with (or require) normally distributed variables, so we might want to use techniques such as log transformation.
        - Does the distribution vary per group (for example, gender or education level)?
    - Do we have cases of missing data? How frequent are these, and in which variables?
    - Is there a linear relationship between some variables (correlation)? Can we create new features using the existing set of variables? An example might be deriving hour/minute from a timestamp, day of the week from a date, and so on.
    - Are there any variables that we can remove as they are not relevant for the analysis? An example might be a randomly generated customer identifier.
- EDA is extremely important in all data science projects, as it enables analysts to develop an understanding of the data, facilitates asking better questions, and makes it easier to pick modeling approaches suitable for the type of data being dealt with.
- In real-life cases, it makes sense to carry out univariate analysis (one feature at a time) for all relevant features to get a good understanding of them, and then proceed to multivariate analysis (comparing distributions per group, correlations, and so on). For brevity, we only show some popular approaches on selected features, but a deeper analysis is highly encouraged.

### How to do it...
Execute the following steps to carry out EDA

1. Import the libraries:


```python
import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
```

2. Get summary statistics for numeric variables


```python
df.describe().transpose().round(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>count</th>
      <th>mean</th>
      <th>std</th>
      <th>min</th>
      <th>25%</th>
      <th>50%</th>
      <th>75%</th>
      <th>max</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>acc_open_past_24mths</th>
      <td>373365.0</td>
      <td>5.65</td>
      <td>3.60</td>
      <td>0.00</td>
      <td>3.00</td>
      <td>5.00</td>
      <td>8.00</td>
      <td>39.00</td>
    </tr>
    <tr>
      <th>apr</th>
      <td>705695.0</td>
      <td>0.24</td>
      <td>0.07</td>
      <td>0.06</td>
      <td>0.19</td>
      <td>0.25</td>
      <td>0.29</td>
      <td>0.36</td>
    </tr>
    <tr>
      <th>contractual_payment_amount</th>
      <td>705695.0</td>
      <td>340.41</td>
      <td>264.86</td>
      <td>0.00</td>
      <td>142.58</td>
      <td>272.05</td>
      <td>469.02</td>
      <td>2018.47</td>
    </tr>
    <tr>
      <th>dti</th>
      <td>687589.0</td>
      <td>0.26</td>
      <td>2.30</td>
      <td>0.00</td>
      <td>0.11</td>
      <td>0.18</td>
      <td>0.27</td>
      <td>99.99</td>
    </tr>
    <tr>
      <th>dti_incl_mortgage</th>
      <td>420870.0</td>
      <td>0.89</td>
      <td>22.49</td>
      <td>0.00</td>
      <td>0.26</td>
      <td>0.36</td>
      <td>0.47</td>
      <td>999.99</td>
    </tr>
    <tr>
      <th>fico_range_high</th>
      <td>705695.0</td>
      <td>671.08</td>
      <td>43.74</td>
      <td>511.00</td>
      <td>640.00</td>
      <td>670.00</td>
      <td>699.00</td>
      <td>850.00</td>
    </tr>
    <tr>
      <th>inquires_6mo</th>
      <td>445528.0</td>
      <td>0.93</td>
      <td>1.29</td>
      <td>-4.00</td>
      <td>0.00</td>
      <td>1.00</td>
      <td>2.00</td>
      <td>33.00</td>
    </tr>
    <tr>
      <th>interest_rate_adj</th>
      <td>444319.0</td>
      <td>0.21</td>
      <td>0.06</td>
      <td>0.00</td>
      <td>0.16</td>
      <td>0.21</td>
      <td>0.25</td>
      <td>0.35</td>
    </tr>
    <tr>
      <th>interest_rate_exp</th>
      <td>705695.0</td>
      <td>0.20</td>
      <td>0.07</td>
      <td>0.00</td>
      <td>0.15</td>
      <td>0.20</td>
      <td>0.25</td>
      <td>0.35</td>
    </tr>
    <tr>
      <th>mo_sin_old_rev_tl_op</th>
      <td>374120.0</td>
      <td>140.58</td>
      <td>87.70</td>
      <td>2.00</td>
      <td>79.00</td>
      <td>119.00</td>
      <td>183.00</td>
      <td>822.00</td>
    </tr>
    <tr>
      <th>mo_sin_rcnt_rev_tl_op</th>
      <td>374120.0</td>
      <td>15.36</td>
      <td>177.48</td>
      <td>0.00</td>
      <td>3.00</td>
      <td>6.00</td>
      <td>14.00</td>
      <td>9998.00</td>
    </tr>
    <tr>
      <th>months_since_credit_inquiry</th>
      <td>357603.0</td>
      <td>8.33</td>
      <td>180.80</td>
      <td>0.00</td>
      <td>2.00</td>
      <td>4.00</td>
      <td>7.00</td>
      <td>9999.00</td>
    </tr>
    <tr>
      <th>months_since_recent_bankcard_acc_open</th>
      <td>368561.0</td>
      <td>18.98</td>
      <td>26.33</td>
      <td>0.00</td>
      <td>4.00</td>
      <td>10.00</td>
      <td>24.00</td>
      <td>499.00</td>
    </tr>
    <tr>
      <th>num_accounts_open_12m</th>
      <td>373464.0</td>
      <td>3.16</td>
      <td>2.29</td>
      <td>0.00</td>
      <td>2.00</td>
      <td>3.00</td>
      <td>4.00</td>
      <td>33.00</td>
    </tr>
    <tr>
      <th>num_bankcards</th>
      <td>373365.0</td>
      <td>7.40</td>
      <td>4.70</td>
      <td>0.00</td>
      <td>4.00</td>
      <td>6.00</td>
      <td>10.00</td>
      <td>69.00</td>
    </tr>
    <tr>
      <th>num_bankcards_good_standing</th>
      <td>373464.0</td>
      <td>5.38</td>
      <td>3.46</td>
      <td>0.00</td>
      <td>3.00</td>
      <td>5.00</td>
      <td>7.00</td>
      <td>41.00</td>
    </tr>
    <tr>
      <th>num_delinq_2years</th>
      <td>445528.0</td>
      <td>0.30</td>
      <td>0.86</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>19.00</td>
    </tr>
    <tr>
      <th>num_mortgage_accounts</th>
      <td>374233.0</td>
      <td>0.95</td>
      <td>1.53</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>2.00</td>
      <td>14.00</td>
    </tr>
    <tr>
      <th>num_open_accounts</th>
      <td>374233.0</td>
      <td>12.35</td>
      <td>6.52</td>
      <td>1.00</td>
      <td>8.00</td>
      <td>11.00</td>
      <td>16.00</td>
      <td>77.00</td>
    </tr>
    <tr>
      <th>num_public_records</th>
      <td>445528.0</td>
      <td>0.11</td>
      <td>0.34</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>4.00</td>
    </tr>
    <tr>
      <th>original_contractual_due_day</th>
      <td>445763.0</td>
      <td>16.77</td>
      <td>7.98</td>
      <td>1.00</td>
      <td>10.00</td>
      <td>18.00</td>
      <td>23.00</td>
      <td>31.00</td>
    </tr>
    <tr>
      <th>original_principal_balance</th>
      <td>705695.0</td>
      <td>11462.50</td>
      <td>9277.29</td>
      <td>1000.00</td>
      <td>4700.00</td>
      <td>9000.00</td>
      <td>15900.00</td>
      <td>50000.00</td>
    </tr>
    <tr>
      <th>outstanding_principal_balance</th>
      <td>705695.0</td>
      <td>9334.78</td>
      <td>8658.74</td>
      <td>0.00</td>
      <td>2919.93</td>
      <td>6935.29</td>
      <td>13409.54</td>
      <td>50000.00</td>
    </tr>
    <tr>
      <th>pct_trades_never_delinquent</th>
      <td>374233.0</td>
      <td>65.56</td>
      <td>43.28</td>
      <td>0.00</td>
      <td>1.00</td>
      <td>92.00</td>
      <td>100.00</td>
      <td>100.00</td>
    </tr>
    <tr>
      <th>percent_bc_gt_75</th>
      <td>369053.0</td>
      <td>0.40</td>
      <td>0.35</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.33</td>
      <td>0.67</td>
      <td>1.00</td>
    </tr>
    <tr>
      <th>primary_income</th>
      <td>705695.0</td>
      <td>78091.67</td>
      <td>112651.93</td>
      <td>0.00</td>
      <td>45000.00</td>
      <td>64480.00</td>
      <td>90288.00</td>
      <td>9537500.00</td>
    </tr>
    <tr>
      <th>purchase_interest</th>
      <td>445528.0</td>
      <td>24.25</td>
      <td>56.31</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>5.08</td>
      <td>22.99</td>
      <td>1925.26</td>
    </tr>
    <tr>
      <th>purchase_price</th>
      <td>705695.0</td>
      <td>9818.90</td>
      <td>9367.35</td>
      <td>0.00</td>
      <td>2815.82</td>
      <td>7070.00</td>
      <td>14524.98</td>
      <td>50637.09</td>
    </tr>
    <tr>
      <th>recovery_amount</th>
      <td>593907.0</td>
      <td>2.40</td>
      <td>98.37</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>12770.00</td>
    </tr>
    <tr>
      <th>recovery_collection_fee</th>
      <td>597071.0</td>
      <td>0.87</td>
      <td>19.61</td>
      <td>-349.89</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>2298.60</td>
    </tr>
    <tr>
      <th>remaining_term</th>
      <td>705695.0</td>
      <td>39.99</td>
      <td>16.83</td>
      <td>0.00</td>
      <td>30.00</td>
      <td>45.00</td>
      <td>54.00</td>
      <td>90.00</td>
    </tr>
    <tr>
      <th>revolving_utilization</th>
      <td>443925.0</td>
      <td>49.12</td>
      <td>25.87</td>
      <td>-3.00</td>
      <td>28.90</td>
      <td>48.40</td>
      <td>69.00</td>
      <td>137.50</td>
    </tr>
    <tr>
      <th>term</th>
      <td>705695.0</td>
      <td>50.30</td>
      <td>11.94</td>
      <td>24.00</td>
      <td>36.00</td>
      <td>60.00</td>
      <td>60.00</td>
      <td>84.00</td>
    </tr>
    <tr>
      <th>tot_accounts</th>
      <td>444759.0</td>
      <td>23.97</td>
      <td>13.44</td>
      <td>2.00</td>
      <td>14.00</td>
      <td>21.00</td>
      <td>31.00</td>
      <td>144.00</td>
    </tr>
    <tr>
      <th>tot_cred_bal_ex_mort</th>
      <td>373365.0</td>
      <td>57870.16</td>
      <td>57852.14</td>
      <td>0.00</td>
      <td>21910.00</td>
      <td>41320.00</td>
      <td>73967.00</td>
      <td>878997.00</td>
    </tr>
    <tr>
      <th>tot_cred_rev_bal</th>
      <td>445528.0</td>
      <td>13975.45</td>
      <td>19143.80</td>
      <td>-3.00</td>
      <td>4303.00</td>
      <td>9041.00</td>
      <td>16970.00</td>
      <td>599058.00</td>
    </tr>
    <tr>
      <th>total_public_records_bankruptcy</th>
      <td>445528.0</td>
      <td>0.26</td>
      <td>8.16</td>
      <td>-4.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>119.00</td>
    </tr>
    <tr>
      <th>accrued_interest</th>
      <td>705695.0</td>
      <td>93.85</td>
      <td>194.26</td>
      <td>0.00</td>
      <td>14.69</td>
      <td>43.47</td>
      <td>104.37</td>
      <td>13735.23</td>
    </tr>
    <tr>
      <th>Month_on_book</th>
      <td>705695.0</td>
      <td>6.87</td>
      <td>4.72</td>
      <td>0.00</td>
      <td>3.00</td>
      <td>6.00</td>
      <td>10.00</td>
      <td>20.00</td>
    </tr>
    <tr>
      <th>dff</th>
      <td>705695.0</td>
      <td>3.51</td>
      <td>1.59</td>
      <td>0.08</td>
      <td>2.33</td>
      <td>4.10</td>
      <td>4.83</td>
      <td>5.12</td>
    </tr>
    <tr>
      <th>cpi</th>
      <td>705695.0</td>
      <td>6.19</td>
      <td>1.73</td>
      <td>2.28</td>
      <td>4.91</td>
      <td>6.42</td>
      <td>7.88</td>
      <td>8.46</td>
    </tr>
    <tr>
      <th>unrate</th>
      <td>705695.0</td>
      <td>3.57</td>
      <td>0.11</td>
      <td>3.40</td>
      <td>3.50</td>
      <td>3.60</td>
      <td>3.60</td>
      <td>4.20</td>
    </tr>
    <tr>
      <th>target</th>
      <td>705695.0</td>
      <td>0.02</td>
      <td>0.14</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>1.00</td>
    </tr>
  </tbody>
</table>
</div>



3. Get summary statistics for categorical variables:


```python
df.describe(include='object').transpose()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>count</th>
      <th>unique</th>
      <th>top</th>
      <th>freq</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>current_rating</th>
      <td>705695</td>
      <td>37</td>
      <td>P3</td>
      <td>126507</td>
    </tr>
    <tr>
      <th>region_or_state</th>
      <td>705680</td>
      <td>51</td>
      <td>CA</td>
      <td>91310</td>
    </tr>
  </tbody>
</table>
</div>



4. Define and run a function for plotting the correlation heatmap:


```python
def plot_correlation_matrix(corr_mat):
    sns.set(style='white')

    mask = np.zeros_like(corr_mat, dtype=np.bool_)
    mask[np.triu_indices_from(mask)] = True

    fig, ax = plt.subplots()
    cmap = sns.diverging_palette(240, 10, n=9, as_cmap=True)
    sns.heatmap(corr_mat, mask=mask, cmap=cmap, vmax=0.3, center=0,
                square=True, linewidths=.5, cbar_kws={'shrink': .5}, ax=ax)
    ax.set_title('Correlation Matrix', fontsize = 16)
    sns.set(style='darkgrid')
corr_mat = df.select_dtypes(include='number').corr()
plot_correlation_matrix(corr_mat)

```


    
![png](model_recipes_files/model_recipes_37_0.png)
    


- In the plot, we can see that age seems to be uncorrelated to any of the other features.

5. Investigate the distribution of the target variable per current_rating and
region_or_state  


```python
ax = df.groupby('current_rating')['target'].value_counts(normalize=True).unstack().plot(kind='barh', stacked='True')
ax.set_title('Percentage of default per current rating', fontsize=16)
ax.legend(title='Default', bbox_to_anchor=(1,1))
```




    <matplotlib.legend.Legend at 0x3f468e010>




    
![png](model_recipes_files/model_recipes_40_1.png)
    



```python
ax = df.groupby('region_or_state')['target'].value_counts(normalize=True).unstack().plot(kind='barh', stacked='True')
ax.set_title('Percentage of default per current rating', fontsize=16)
ax.legend(title='Default', bbox_to_anchor=(1,1))
```




    <matplotlib.legend.Legend at 0x141085c90>




    
![png](model_recipes_files/model_recipes_41_1.png)
    


### How it works...
- We started the analysis by using a very simple, yet powerful method of
a pandas DataFrame —describe. It printed summary statistics, such as count, mean, min/max, and quartiles of all the numeric variables in the DataFrame. By inspecting these metrics, we could infer the value range of a certain feature, or whether the distribution was skewed (by looking at the difference between mean and median). Also, we could easily spot values outside the plausible range—for example, a negative or very small age.
- The count metric represents the number of non-null observations, so it is also a way to determine which numeric features contain missing values. Another way of investigating the presence of missing values is by running df.isnull().sum(). For more information on missing values, please see the Dealing with missing values recipe.
- In the third step, we added the include='object' argument to the
describe method, to inspect the categorical features separately. The output was different from the numeric features: we could see the count, the number of unique categories, which one was the most frequent, and how many times it appeared in the dataset.
- In Step 4, we defined a function for plotting a heatmap representing the correlation matrix. In the function, we used a couple of operations to mask the upper triangular matrix, together with the diagonal (all correlations equal to 1 on the diagonal). This way, the output was easier to interpret.
- To calculate the correlations, we used the corr method of a DataFrame, which by default calculated Pearson's correlation coefficient. We did this only for numeric features. There are also methods for calculating the correlation of categorical features, but this is beyond the scope of this chapter. Inspecting correlations is crucial, especially when using machine learning algorithms that assume linear independence of the features (such as linear regression).
- In the last step, we investigated the distribution of the target variable (default) per current_rating and state_or_region.

# 3. Splitting data into training and test sets

- Having completed the EDA, the next step is to split the dataset into training and test sets. The idea is to have two separate datasets:
    - Training set — On this part of the data, we train a machine learning model
    - Test set — This part of the data was not seen by the model during training, and is used to evaluate the performance
- What we want to achieve by splitting the data is preventing overfitting. Overfitting is a phenomenon whereby a model finds too many patterns in data used for training and performs well only on that particular data. In other words, it fails to generalize to unseen data.
- This is a very important step in the analysis, as doing it incorrectly can introduce bias, for example, in the form of data leakage. Data leakage can occur when, during the training phase, a model observes information to which it should not have access. We follow up with an example. A common scenario is that of imputing missing values with the feature's average. If we had done this before splitting the data, we would have also used data from the test set to calculate the average, introducing data leakage. That is why the proper order would be to split the data into training and test sets first and then carry out the imputation, using the data observed in the training set.
- Additionally, this approach ensures consistency, as unseen data in the future (new customers that will be scored by the model) will be treated in the same way as the ones data in the test set.

### How to do it
Execute the following steps to split the dataset into training and test sets.

1. Import the function from sklearn:


```python
from sklearn.model_selection import train_test_split
```

2. Split the data into training and test sets:


```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
```

3. Verify that the ratio of the target is preserved:


```python
print(y_train.value_counts(normalize=True))
print(y_test.value_counts(normalize=True))
```

    0    0.980213
    1    0.019787
    Name: target, dtype: float64
    0    0.980211
    1    0.019789
    Name: target, dtype: float64


### How it works...
- We first imported the train_test_split function from the
model_selection module of scikit-learn. 
- In the second step, we showed how to do the most basic split. We passed X and y objects to the train_test_split function. Additionally, we specified the size of the test set, as a fraction of all observations. For reproducibility, we also specified the random state. We also had to assign the output of the function to four new objects.
- In the last step, we also specified the stratification argument by passing the target variable (stratify=y). Splitting the data with stratification means that both the training and test sets will have a possibly identical distribution of the specified variable. This parameter is very important when dealing with imbalanced data

### There's more...
- It is also common to split data into three sets: training, validation, and test. The validation set is used for frequent evaluation and tuning of the model's hyperparameters. Suppose we want to train a XG Boosting classifier and find the optimal value of the max_depth hyperparameter, which decides the maximum depth of the tree. To do so, we can train the model multiple times using the training set, and each time with a different value of the hyperparameter. Then, we can evaluate the performance of all these models, using the validation set. We pick the best model of those, and then, finally, evaluate its performance on the test set.
- In the following code block, we illustrate a possible way of creating a train- validation-test split, using the same train_test_split function:


```python
# define the size of the validation and test sets
VALID_SIZE = 0.1
TEST_SIZE = 0.2
# create the initial split - training and temp
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=(VALID_SIZE + TEST_SIZE), stratify=y, random_state=42)
# calculate the new test size
NEW_TEST_SIZE = np.around(TEST_SIZE / (VALID_SIZE + TEST_SIZE), 2)
# create the valid and test sets
X_valid, X_test, y_valid, y_test = train_test_split(X_temp, y_temp,
test_size=NEW_TEST_SIZE, stratify=y_temp, random_state=42)
```

- We basically ran train_test_split; however, we had to adjust the sizes of the test_size input in such a way that the initially defined proportions (70-10- 20) were preserved.
- Sometimes, we do not have enough data to split it into three sets, either because we do not have that many observations in general or because the data can be highly imbalanced, and we would remove valuable training samples from the training set.

# 4. Dealing with missing values

- In most real-life cases, we do not work with clean, complete data. One of the potential problems we are bound to encounter is that of missing values. We can categorize missing values by the reason they occur:
    - Missing completely at random (MCAR)—The reason for the missing data is unrelated to the rest of the data. An example could be a respondent accidentally missing a question in a survey.
    - Missing at random (MAR)—The missingness of the data can be inferred from data in another column(-s). For example, the missingness to a response to a certain survey question can be to some extent determined conditionally by other factors such as gender, age, lifestyle, and so on.
    - Missing not at random (MNAR)—When there is some underlying reason for the missing values. For example, people with very high incomes tend to be hesitant about revealing it.
    - Structurally missing data—Often a subset of MNAR, the data is missing because of a logical reason. For example, when a variable representing the age of a spouse is missing, we can infer that a given person has no spouse.
- While some machine learning algorithms can account for missing data (for example, XG Boosting can treat missing values as a separate and unique value), many algorithms cannot, or their popular implementations (such as the ones in scikit-learn) do not incorporate this functionality.
- Some popular solutions include:
    - Drop observations with one, or more, missing values—While this is the easiest approach, it is not always a good one, especially in the case of small datasets. Even if there is only a small fraction of missing values per feature, they do not necessarily occur for the same observations (rows), so the actual number of rows to remove can be much higher. Additionally, in the case of data missing not at random, removing such observations from the analysis can introduce bias into the results.
    - Replace the missing values with a value far outside the possible range, so that algorithms such as decision trees can treat it as a special value, indicating missing data.
    - In the case of dealing with time series, we can use forward-filling (take the last-known observation before the missing one), backward-filling (take the first-known observation after the missing one), or interpolation (linear or more advanced).
    - Replace the missing values with an aggregate metric—for continuous data, we can use the mean (when there are no clear outliers in the data) or median (when there are outliers). In the case of categorical variables, we can use mode (the most common value in the set). A potential disadvantage of mean/median imputation is the reduction of variance in the dataset.
    - Replace the missing values with aggregate metrics calculated per group—for example, when dealing with body-related metrics, we can calculate the mean or median per gender, to more accurately replace the missing data.
    - ML-based approaches—We can treat the considered feature as a target, and use complete cases to train a model and predict values for the missing observations.

### How to do it...
Execute the following steps to investigate and deal with missing values in the dataset.

1. Import the libraries


```python
import pandas as pd
import missingno
from sklearn.impute import SimpleImputer
```

2. Inspect the information about the DataFrame:


```python
X.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 705695 entries, 0 to 705694
    Data columns (total 44 columns):
     #   Column                                 Non-Null Count   Dtype  
    ---  ------                                 --------------   -----  
     0   acc_open_past_24mths                   373365 non-null  float64
     1   apr                                    705695 non-null  float64
     2   contractual_payment_amount             705695 non-null  float64
     3   current_rating                         705695 non-null  object 
     4   dti                                    687589 non-null  float64
     5   dti_incl_mortgage                      420870 non-null  float64
     6   fico_range_high                        705695 non-null  int64  
     7   inquires_6mo                           445528 non-null  float64
     8   interest_rate_adj                      444319 non-null  float64
     9   interest_rate_exp                      705695 non-null  float64
     10  mo_sin_old_rev_tl_op                   374120 non-null  float64
     11  mo_sin_rcnt_rev_tl_op                  374120 non-null  float64
     12  months_since_credit_inquiry            357603 non-null  float64
     13  months_since_recent_bankcard_acc_open  368561 non-null  float64
     14  num_accounts_open_12m                  373464 non-null  float64
     15  num_bankcards                          373365 non-null  float64
     16  num_bankcards_good_standing            373464 non-null  float64
     17  num_delinq_2years                      445528 non-null  float64
     18  num_mortgage_accounts                  374233 non-null  float64
     19  num_open_accounts                      374233 non-null  float64
     20  num_public_records                     445528 non-null  float64
     21  original_contractual_due_day           445763 non-null  float64
     22  original_principal_balance             705695 non-null  float64
     23  outstanding_principal_balance          705695 non-null  float64
     24  pct_trades_never_delinquent            374233 non-null  float64
     25  percent_bc_gt_75                       369053 non-null  float64
     26  primary_income                         705695 non-null  float64
     27  purchase_interest                      445528 non-null  float64
     28  purchase_price                         705695 non-null  float64
     29  recovery_amount                        593907 non-null  float64
     30  recovery_collection_fee                597071 non-null  float64
     31  region_or_state                        705680 non-null  object 
     32  remaining_term                         705695 non-null  int64  
     33  revolving_utilization                  443925 non-null  float64
     34  term                                   705695 non-null  int64  
     35  tot_accounts                           444759 non-null  float64
     36  tot_cred_bal_ex_mort                   373365 non-null  float64
     37  tot_cred_rev_bal                       445528 non-null  float64
     38  total_public_records_bankruptcy        445528 non-null  float64
     39  accrued_interest                       705695 non-null  float64
     40  Month_on_book                          705695 non-null  int64  
     41  dff                                    705695 non-null  float64
     42  cpi                                    705695 non-null  float64
     43  unrate                                 705695 non-null  float64
    dtypes: float64(38), int64(4), object(2)
    memory usage: 236.9+ MB


3. Visualize the nullity of the DataFrame:


```python
missingno.matrix(X)
```




    <Axes: >




    
![png](model_recipes_files/model_recipes_64_1.png)
    


- The white bars visible in the columns represent missing values. The line on the right side of the plot describes the shape of data completeness. The two numbers indicate the maximum and minimum nullity in the dataset (there are 44 columns in total, and the row with the most missing values contains 2—hence the 20).

4. Define columns with missing values per data type:


```python
NUM_FEATURES = df.select_dtypes(include=[np.number]).columns[df.select_dtypes(include=[np.number]).isnull().any()].tolist()
CAT_FEATURES = df.select_dtypes(include='object').columns[df.select_dtypes(include='object').isnull().any()].tolist()
```

5. Impute numerical features:


```python
for col in NUM_FEATURES:
        num_imputer = SimpleImputer(strategy='median')
        num_imputer.fit(X_train[[col]])
        X_train.loc[:, col] = num_imputer.transform(X_train[[col]])
        X_test.loc[:, col] = num_imputer.transform(X_test[[col]])
```

6. Impute categorical features:


```python
for col in CAT_FEATURES:
    cat_imputer = SimpleImputer(strategy='most_frequent')
    cat_imputer.fit(X_train[[col]])
    X_train.loc[:, col] = cat_imputer.transform(X_train[[col]])
    X_test.loc[:, col] = cat_imputer.transform(X_test[[col]])
```

7. Verify that there are no missing values:


```python
X_train.info()
```

    <class 'pandas.core.frame.DataFrame'>
    Int64Index: 493986 entries, 247582 to 264402
    Data columns (total 44 columns):
     #   Column                                 Non-Null Count   Dtype  
    ---  ------                                 --------------   -----  
     0   acc_open_past_24mths                   493986 non-null  float64
     1   apr                                    493986 non-null  float64
     2   contractual_payment_amount             493986 non-null  float64
     3   current_rating                         493986 non-null  object 
     4   dti                                    493986 non-null  float64
     5   dti_incl_mortgage                      493986 non-null  float64
     6   fico_range_high                        493986 non-null  int64  
     7   inquires_6mo                           493986 non-null  float64
     8   interest_rate_adj                      493986 non-null  float64
     9   interest_rate_exp                      493986 non-null  float64
     10  mo_sin_old_rev_tl_op                   493986 non-null  float64
     11  mo_sin_rcnt_rev_tl_op                  493986 non-null  float64
     12  months_since_credit_inquiry            493986 non-null  float64
     13  months_since_recent_bankcard_acc_open  493986 non-null  float64
     14  num_accounts_open_12m                  493986 non-null  float64
     15  num_bankcards                          493986 non-null  float64
     16  num_bankcards_good_standing            493986 non-null  float64
     17  num_delinq_2years                      493986 non-null  float64
     18  num_mortgage_accounts                  493986 non-null  float64
     19  num_open_accounts                      493986 non-null  float64
     20  num_public_records                     493986 non-null  float64
     21  original_contractual_due_day           493986 non-null  float64
     22  original_principal_balance             493986 non-null  float64
     23  outstanding_principal_balance          493986 non-null  float64
     24  pct_trades_never_delinquent            493986 non-null  float64
     25  percent_bc_gt_75                       493986 non-null  float64
     26  primary_income                         493986 non-null  float64
     27  purchase_interest                      493986 non-null  float64
     28  purchase_price                         493986 non-null  float64
     29  recovery_amount                        493986 non-null  float64
     30  recovery_collection_fee                493986 non-null  float64
     31  region_or_state                        493986 non-null  object 
     32  remaining_term                         493986 non-null  int64  
     33  revolving_utilization                  493986 non-null  float64
     34  term                                   493986 non-null  int64  
     35  tot_accounts                           493986 non-null  float64
     36  tot_cred_bal_ex_mort                   493986 non-null  float64
     37  tot_cred_rev_bal                       493986 non-null  float64
     38  total_public_records_bankruptcy        493986 non-null  float64
     39  accrued_interest                       493986 non-null  float64
     40  Month_on_book                          493986 non-null  int64  
     41  dff                                    493986 non-null  float64
     42  cpi                                    493986 non-null  float64
     43  unrate                                 493986 non-null  float64
    dtypes: float64(38), int64(4), object(2)
    memory usage: 169.6+ MB


- We can inspect the output, to confirm that there are no missing values in x

### How it works...
- In Step 1, we imported the required libraries. 
- Then, we used the info method of a pandas DataFrame to view information about the columns, such as their type and the number of non-null observations. Another possible way of inspecting the number of missing values per column is to run X.isnull().sum().
- In Step 3, we visualized the nullity of the DataFrame, with the help of the missingno library.
- In Step 4, we defined lists containing features we wanted to impute, one list per data type. The reason for this is the fact that numeric features are imputed using different strategies than the categorical features. For basic imputation, we used the SimpleImputer class from scikit-learn.
- In Step 5, we iterated over the numerical features (in this case, only the
age feature), and used the median to replace the missing values. Inside the loop, we defined the imputer object with the correct strategy (median), fitted it to the given column of the training data, and transformed both the training and test data. This way, the median was estimated by only using the training data, preventing potential data leakage.
- Step 6 is analogical to Step 5, where we used the same approach to iterate over categorical columns. The difference lies in the selected strategy—we used the most frequent value (most_frequent) in the given column. This strategy can be used for both categorical and numerical features; in the latter case, this is the mode.

### There's more...
- In this recipe, we mentioned how to impute missing values. Approaches such as replacing the missing value with one large value or the mean/median/mode are called single imputation approaches, as they replace missing values with one specific value. However, there are also multiple imputation approaches, and one of those is Multiple Imputation by Chained Equations (MICE). In short, the algorithm runs multiple regression models, and each missing value is determined conditionally on the basis of the non-missing data points. A potential benefit of using an ML-based approach to imputation is the reduction of bias introduced by single imputation.
- The MICE algorithm is available in scikit-learn, under the name of IterativeImputer, in the impute module

# 5. Remove Outliers

- Transforming/removing outliers: During the EDA, we often see some feature values that are extreme and can be caused by some kind of error (for example, adding an extra digit to the age) or are simply incompatible with the rest (for example, a multimillionaire among a sample of middle-class citizens). Such outliers can skew the results of the model, and it is good practice to somehow deal with them. One solution would be to remove them at all, but this can have an impact on the model's ability to generalize. We can also bring them closer to regular values.

### How to do it...
Execute the following steps to handle outliers

1. Import the base estimator and transformer from sklearn:


```python
from sklearn.base import BaseEstimator, TransformerMixin
```

2. Define the OutlierRemover class:


```python
class OutlierRemover(BaseEstimator, TransformerMixin):
               def __init__(self, n_std=3):
                   self.n_std = n_std
               def fit(self, X, y = None):
                   if np.isnan(X).any(axis=None):
                       raise ValueError('''There are missing values in the
                                           array! Please remove them.''')
                   mean_vec = np.mean(X, axis=0)
                   std_vec = np.std(X, axis=0)
                   self.upper_band_ = mean_vec + self.n_std * std_vec
                   self.lower_band_ = mean_vec - self.n_std * std_vec
                   self.n_features_ = len(self.upper_band_)
                   return self
               def transform(self, X, y = None):
                   X_copy = pd.DataFrame(X.copy())
                   upper_band = np.repeat(
                       self.upper_band_.reshape(self.n_features_, -1),
                       len(X_copy),
                       axis=1).transpose()
                   lower_band = np.repeat(
                       self.lower_band_.reshape(self.n_features_, -1),
                       len(X_copy),
                       axis=1).transpose()
                   X_copy[X_copy >= upper_band] = upper_band
                   X_copy[X_copy <= lower_band] = lower_band
                   return X_copy.values
```

# 6. Encoding categorical variables

- In the previous recipes, we have seen that some features are categorical variables (originally represented as either object or category data types). However, most machine learning algorithms work exclusively with numeric data. That is why we need to encode categorical features into a representation compatible with the models.
- In this recipe, we use popular encoding approache: one-hot encoding 
- In this approach, for each category of a feature, we create a new column (sometimes called a dummy variable) with binary encoding to denote whether a particular row belongs to this category.

### How to do it...
Execute the following steps to encode categorical variables.

1. Import the libraries:


```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
```

2. Use One Hot Encoder to encode a selected column:


```python
one_hot_encoder = OneHotEncoder(sparse=False,
                                handle_unknown='error',
                                drop='first')
one_hot_transformer = ColumnTransformer([('one_hot', one_hot_encoder, CAT_FEATURES)])
one_hot_transformer.fit(X_train)
```

    /Users/minhdang/anaconda3/envs/Python_3_11_4/lib/python3.11/site-packages/sklearn/preprocessing/_encoders.py:972: FutureWarning: `sparse` was renamed to `sparse_output` in version 1.2 and will be removed in 1.4. `sparse_output` is ignored unless you leave `sparse` to its default value.
      warnings.warn(





<style>#sk-container-id-12 {color: black;}#sk-container-id-12 pre{padding: 0;}#sk-container-id-12 div.sk-toggleable {background-color: white;}#sk-container-id-12 label.sk-toggleable__label {cursor: pointer;display: block;width: 100%;margin-bottom: 0;padding: 0.3em;box-sizing: border-box;text-align: center;}#sk-container-id-12 label.sk-toggleable__label-arrow:before {content: "▸";float: left;margin-right: 0.25em;color: #696969;}#sk-container-id-12 label.sk-toggleable__label-arrow:hover:before {color: black;}#sk-container-id-12 div.sk-estimator:hover label.sk-toggleable__label-arrow:before {color: black;}#sk-container-id-12 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;background-color: #f0f8ff;}#sk-container-id-12 div.sk-toggleable__content pre {margin: 0.2em;color: black;border-radius: 0.25em;background-color: #f0f8ff;}#sk-container-id-12 input.sk-toggleable__control:checked~div.sk-toggleable__content {max-height: 200px;max-width: 100%;overflow: auto;}#sk-container-id-12 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";}#sk-container-id-12 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-12 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-12 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;}#sk-container-id-12 div.sk-estimator {font-family: monospace;background-color: #f0f8ff;border: 1px dotted black;border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;}#sk-container-id-12 div.sk-estimator:hover {background-color: #d4ebff;}#sk-container-id-12 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 1px solid gray;flex-grow: 1;}#sk-container-id-12 div.sk-label:hover label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-12 div.sk-serial::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: 0;}#sk-container-id-12 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: white;padding-right: 0.2em;padding-left: 0.2em;position: relative;}#sk-container-id-12 div.sk-item {position: relative;z-index: 1;}#sk-container-id-12 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: white;position: relative;}#sk-container-id-12 div.sk-item::before, #sk-container-id-12 div.sk-parallel-item::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: -1;}#sk-container-id-12 div.sk-parallel-item {display: flex;flex-direction: column;z-index: 1;position: relative;background-color: white;}#sk-container-id-12 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;}#sk-container-id-12 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;}#sk-container-id-12 div.sk-parallel-item:only-child::after {width: 0;}#sk-container-id-12 div.sk-dashed-wrapped {border: 1px dashed gray;margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: white;}#sk-container-id-12 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;}#sk-container-id-12 div.sk-label-container {text-align: center;}#sk-container-id-12 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }` but bootstrap.min.css set `[hidden] { display: none !important; }` so we also need the `!important` here to be able to override the default hidden behavior on the sphinx rendered scikit-learn.org. See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;}#sk-container-id-12 div.sk-text-repr-fallback {display: none;}</style><div id="sk-container-id-12" class="sk-top-container"><div class="sk-text-repr-fallback"><pre>ColumnTransformer(transformers=[(&#x27;one_hot&#x27;,
                                 OneHotEncoder(drop=&#x27;first&#x27;, sparse=False),
                                 [&#x27;current_rating&#x27;, &#x27;region_or_state&#x27;])])</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-40" type="checkbox" ><label for="sk-estimator-id-40" class="sk-toggleable__label sk-toggleable__label-arrow">ColumnTransformer</label><div class="sk-toggleable__content"><pre>ColumnTransformer(transformers=[(&#x27;one_hot&#x27;,
                                 OneHotEncoder(drop=&#x27;first&#x27;, sparse=False),
                                 [&#x27;current_rating&#x27;, &#x27;region_or_state&#x27;])])</pre></div></div></div><div class="sk-parallel"><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-41" type="checkbox" ><label for="sk-estimator-id-41" class="sk-toggleable__label sk-toggleable__label-arrow">one_hot</label><div class="sk-toggleable__content"><pre>[&#x27;current_rating&#x27;, &#x27;region_or_state&#x27;]</pre></div></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-42" type="checkbox" ><label for="sk-estimator-id-42" class="sk-toggleable__label sk-toggleable__label-arrow">OneHotEncoder</label><div class="sk-toggleable__content"><pre>OneHotEncoder(drop=&#x27;first&#x27;, sparse=False)</pre></div></div></div></div></div></div></div></div></div></div>



### How it works...
- First, we imported the necessary libraries. 
- In the second step, we selected the column we wanted to encode using one hot encoder, instantiated the one hot encoder, fitted it to the training data, and transformed both the training and the test data.

### There's more...
- Summing up, we should avoid label encoding when it introduces false order to the data, which can, in turn, lead to incorrect conclusions. Tree-based methods (decision trees, Random Forest, and so on) can work with categorical data and label encoding. However, for algorithms such as linear regression, models calculating distance metrics between features (k-means clustering, k-Nearest Neighbors, and so on) or Artificial Neural Networks (ANN), the natural representation is one-hot encoding.

# 7. Handling imbalanced data

- A very common issue when working with classification tasks is that of class imbalance: when one class is highly outnumbered in comparison to the second one (this can also be extended to multi-class). In general, we are talking about imbalance when the ratio of the two classes is not 1:1. In some cases, a delicate imbalance is not that big of a problem, but there are industries/problems in which we can encounter ratios of 100:1, 1000:1, or even worse.


```python
y_train.value_counts(normalize=True)
```




    0    0.980212
    1    0.019788
    Name: target, dtype: float64



- In this recipe, our dataset the default class is only 1.98% of the entire sample. In such cases, gathering more data (especially of the default class) might simply not be feasible, and we need to resort to some techniques that can help us in understanding and avoiding the accuracy paradox.
Accuracy paradox refers to a case in which inspecting accuracy as the evaluation metric creates the impression of having a very good classifier (a score of 90%, or even 99.9%), while in reality, it simply reflects the distribution of the classes. That is why, in cases of class imbalance, it is highly advisable to use evaluation metrics that account for that, such as precision/recall, F1 Score, or Cohen's kappa.

### How to do it...
Execute the following steps to handling class imbalance

1. Import the libraries:


```python
from imblearn.over_sampling import RandomOverSampler
```

2. Oversample the data


```python
ros = RandomOverSampler(random_state=42)
X_train_ros, y_train_ros = ros.fit_resample(X_train, y_train)
y_train_ros.value_counts(normalize=True)
```




    0    0.5
    1    0.5
    Name: target, dtype: float64



- After oversample the data, default class account for 50

### How it works...
- In Step 1, we loaded the required libraries.
- In Step 2, we used the RandomOverSampler class from the imblearn library to randomly oversample the minority class in order to match the size of the majority class

# 8. Fitting a XG Boosting classifier

- Extreme Gradient Boosting (XGBoost): XGBoost is an implementation of Gradient Boosted Trees that incorporates a series of improvements resulting in superior performance (both in terms of evaluation metrics and time). Since being published, the algorithm was successfully used to win many data science competitions. In this recipe, we only present a high-level overview of the distinguishable features. For a more detailed overview, please refer to the original paper or documentation. The key concepts of XGBoost are:
    - XGBoost combines a pre-sorted algorithm with a histogram-based algorithm to calculate the best splits. This tackles a significant inefficiency of Gradient Boosted Trees, that is, for creating a new branch, they consider the potential loss for all possible splits (especially important when considering hundreds, or thousands, of features).
    - The algorithm uses the Newton-Raphson method for boosting (instead of gradient descent)—it provides a direct route to the minimum/minima of the loss function.
    - XGBoost has an extra randomization parameter to reduce the correlation between the trees.
    - XGBoost combines Lasso (L1) and Ridge (L2) regularization to prevent overfitting.
    - It offers a different (more efficient) approach to tree pruning.
    - XGBoost has a feature called monotonic constraints (that other models, such as LightGBM, lack)—the algorithm sacrifices some accuracy, and increases the training time to improve model interpretability.
    - XGBoost does not take categorical features as input—we must use some kind of encoding.
    - The algorithm can handle missing values in the data.

### How to do it...
Execure the following steps to fit a decision tree classifier

1. Import the libraries:


```python
from xgboost import XGBClassifier
from sklearn import metrics
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from imblearn.metrics import specificity_score
```

2. Create an instance of the model, fit it to the training data, and create the prediction:


```python
xgb_model = XGBClassifier(random_state=42)
xgb_model.fit(X_train_ros, y_train_ros)
y_pred = xgb_model.predict(X_test)
```

3. Evaluate the results:


```python
accuracy = accuracy_score(y_test, y_pred)
roc_score = roc_auc_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='macro')
recall = recall_score(y_test, y_pred, average='macro')
f1 = f1_score(y_test, y_pred, average='macro')
kappa = specificity_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("ROC Score:", roc_score)
print("Precision:", precision)
print("Recall:", recall)
print("F1-Score:", f1)
print("Specificity Score", kappa)
```

    Accuracy: 0.9518914879517223
    ROC Score: 0.9466626727047515
    Precision: 0.6414053088347277
    Recall: 0.9466626727047515
    F1-Score: 0.7056395089417349
    Specificity Score 0.9521069627946116


### How it works...
- In Step 1, we import library
- In Step 2, we used the typical scikit-learn approach to train a machine learning model. First, we created the object of the XGBClassifier class (using all the default settings). Then, we fitted the model to the training data (we needed to pass both the features and the target), using the fit method. Lastly, we obtained the predictions by using the predict method.
- In Step 3, we evaluated the performance of the model. We used a custom function to display all the results. We will not go deeper into its specifics, as it is quite standard and is built using functions from the metrics module of scikit-learn. For a detailed description of the function, please refer to the accompanying GitHub repository.
- The confusion matrix summarizes all possible combinations of the predicted values as opposed to the actual target. It has a structure that looks like the following:

TN | FP

FN | TP
- The values are as follows:
   - True positive (TP): The model predicts a default, and the client defaulted.
   - False positive (FP): The model predicts a default, but the client did not default.
   - True negative (TN): The model predicts a good customer, and the client did not default.
   - False negative (FN): The model predicts a good customer, but the client defaulted.
- Using these values, we can further build multiple evaluation criteria:
   - Accuracy ((TP + TN) / (TP + FP + TN + FN))—Measures the model's overall ability to correctly predict the class of the observation.
   - Precision (TP / (TP + FP))—Out of all predictions of the positive class (in our case, the default), how many observations indeed defaulted.
   - Recall (TP /(TP + FN))—Out of all positive cases, how many were predicted correctly. Also called sensitivity or the true positive rate. 
   - F-1 Score—A harmonic average of precision and recall. The reason for a harmonic mean instead of a standard mean is that it punishes extreme outcomes, such as precision = 1 and recall = 0, or vice versa. 
   - Specificity (TN / (TN + FP))—Measures what fraction of negative cases (clients without a default) actually did not default.
- Understanding the subtleties behind these metrics is very important for the correct evaluation of the model's performance. Accuracy can be highly misleading in the case of class imbalance. Imagine a case when 99% of data is not fraudulent and only 1% is fraudulent. Then, a naïve model classifying each observation as non-fraudulent achieves 99% accuracy, while it is actually worthless. That is why, in such cases, we should refer to precision or recall. When we try to achieve as high precision as possible, we will get fewer false positives, at the cost of more false negatives. When optimizing for recall, we will achieve fewer false negatives, at the cost of more false positives. The metric on which we try to optimize should be selected based on the use case.


### There's more...
- The ROC curve loses its credibility when it comes to evaluating the performance of the model when we are dealing with class imbalance. That is why, in such cases, we should use another curve—the Precision-Recall curve. That is because, for calculating both precision and recall, we do not use the true negatives, and only consider the correct prediction of the minority class (the positive one).


```python
# Calculate precision and recall for different thresholds:
y_pred_prob = xgb_model.predict_proba(X_test)[:, 1]
precision, recall, thresholds = metrics.precision_recall_curve(y_test, y_pred_prob)
# Having calculated the required elements, we can plot the curve:
ax = plt.subplot()
ax.plot(recall, precision, label=f'PR-AUC = {metrics.auc(recall, precision):.2f}')
ax.set(title='Precision-Recall Curve', xlabel='Recall', ylabel='Precision')
ax.legend()
```




    <matplotlib.legend.Legend at 0x2a6641190>




    
![png](model_recipes_files/model_recipes_115_1.png)
    


- As a summary metric, we can approximate the area under the Precision- Recall curve by calling metrics.auc(recall, precision). In contrast to the ROC- AUC, the PR-AUC ranges from 0 to 1, where 1 indicates the perfect model. A model with a PR-AUC of 1 can identify all the positive observations (perfect recall), while not wrongly labeling a single negative observation as a positive one (perfect precision). We can consider models that bow towards the (1, 1) point as skillful.

# 9. Implementing scikit-learn's piplines

- In the previous recipes, we showed all the steps required to build a machine learning model —starting with loading data, splitting it into a training and a test set, imputing missing values, encoding categorical features, and—lastly —fitting a XG Boosting classifier.
- The process requires multiple steps to be executed in a certain order, which can sometimes be tricky with a lot of modifications to the pipeline mid- work. That is why scikit-learn introduced Pipelines. By using Pipelines, we can sequentially apply a list of transformations to the data, and then train a given estimator (model).
- One important point to be aware of is that the intermediate steps of the Pipeline must have the fit and transform methods (the final estimator only needs the fit method, though). Using Pipelines has several benefits:
    - The flow is much easier to read and understand—the chain of operations to be executed on given columns is clear
    - The order of steps is enforced by the Pipeline
    - Increased reproducibility
- In this recipe, we show how to create the entire project's pipeline, from loading the data to training the classifier.

### How to do it...
Execute the following steps to build the project's pipeline.

1. Import the libraries:


```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from xgboost import XGBClassifier
from sklearn.pipeline import Pipeline
from imblearn.over_sampling import RandomOverSampler
```


```python
class OutlierRemover(BaseEstimator, TransformerMixin):
               def __init__(self, n_std=3):
                   self.n_std = n_std
               def fit(self, X, y = None):
                   if np.isnan(X).any(axis=None):
                       raise ValueError('''There are missing values in the
                                           array! Please remove them.''')
                   mean_vec = np.mean(X, axis=0)
                   std_vec = np.std(X, axis=0)
                   self.upper_band_ = mean_vec + self.n_std * std_vec
                   self.lower_band_ = mean_vec - self.n_std * std_vec
                   self.n_features_ = len(self.upper_band_)
                   return self
               def transform(self, X, y = None):
                   X_copy = pd.DataFrame(X.copy())
                   upper_band = np.repeat(
                       self.upper_band_.reshape(self.n_features_, -1),
                       len(X_copy),
                       axis=1).transpose()
                   lower_band = np.repeat(
                       self.lower_band_.reshape(self.n_features_, -1),
                       len(X_copy),
                       axis=1).transpose()
                   X_copy[X_copy >= upper_band] = upper_band
                   X_copy[X_copy <= lower_band] = lower_band
                   return X_copy.values
```


```python
class RandomOverSamplerTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, random_state=42):
        self.random_state = random_state
        self.ros = RandomOverSampler(random_state=self.random_state)
    
    def fit(self, X, y=None):
        # The RandomOverSampler's fit method expects X and y, but it doesn't actually use y.
        # Hence, we only pass X to it.
        _, _ = self.ros.fit_resample(X, y)
        return self
    
    def transform(self, X):
        # Since we've already oversampled in the fit method, transform can simply return X.
        # The transformation has already been applied during the fit method.
        return X
```

2. Load the data, separate the target, and create the stratified train-test split:


```python
df = pd.read_csv('/Users/minhdang/Documents/Minh_U/Portfolio/US_consumer_loan/cookbook.csv', low_memory=False, index_col=0, na_values='')
X = df.copy()
y = X.pop('target')
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)
```

3. Store lists of numerical/categorical features:


```python
num_features = X_train.select_dtypes(include='number').columns.to_list()
cat_features = X_train.select_dtypes(include='object').columns.to_list()
```

4. Define the numerical Pipeline:


```python
num_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),  # Filling missing values with median
    ('outliers', OutlierRemover()),  # Custom transformer for outlier removal
    ('imbalance', RandomOverSamplerTransformer(random_state=42))  # Oversampling to handle class imbalance
])
```

5. Define the categorical Pipeline:


```python
cat_list = [list(X_train[col].dropna().unique()) for col in cat_features]
cat_pipeline = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(categories=cat_list, sparse=False, handle_unknown='error', drop='first')),
    ('imbalance', RandomOverSamplerTransformer(random_state=42))
])
```

6. Define the column transformer object:


```python
preprocessor = ColumnTransformer(transformers=[
    ('numerical', num_pipeline, num_features),
    ('categorical', cat_pipeline, cat_features)],
            remainder='drop')
```

7. Create a joint Pipeline:


```python
xgb = XGBClassifier(random_state=42)
xgb_pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', xgb)])
```

8. Fit the Pipeline to the data:


```python
xgb_pipeline.fit(X_train, y_train)
```

    /Users/minhdang/anaconda3/envs/Python_3_11_4/lib/python3.11/site-packages/sklearn/preprocessing/_encoders.py:972: FutureWarning: `sparse` was renamed to `sparse_output` in version 1.2 and will be removed in 1.4. `sparse_output` is ignored unless you leave `sparse` to its default value.
      warnings.warn(





<style>#sk-container-id-14 {color: black;}#sk-container-id-14 pre{padding: 0;}#sk-container-id-14 div.sk-toggleable {background-color: white;}#sk-container-id-14 label.sk-toggleable__label {cursor: pointer;display: block;width: 100%;margin-bottom: 0;padding: 0.3em;box-sizing: border-box;text-align: center;}#sk-container-id-14 label.sk-toggleable__label-arrow:before {content: "▸";float: left;margin-right: 0.25em;color: #696969;}#sk-container-id-14 label.sk-toggleable__label-arrow:hover:before {color: black;}#sk-container-id-14 div.sk-estimator:hover label.sk-toggleable__label-arrow:before {color: black;}#sk-container-id-14 div.sk-toggleable__content {max-height: 0;max-width: 0;overflow: hidden;text-align: left;background-color: #f0f8ff;}#sk-container-id-14 div.sk-toggleable__content pre {margin: 0.2em;color: black;border-radius: 0.25em;background-color: #f0f8ff;}#sk-container-id-14 input.sk-toggleable__control:checked~div.sk-toggleable__content {max-height: 200px;max-width: 100%;overflow: auto;}#sk-container-id-14 input.sk-toggleable__control:checked~label.sk-toggleable__label-arrow:before {content: "▾";}#sk-container-id-14 div.sk-estimator input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-14 div.sk-label input.sk-toggleable__control:checked~label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-14 input.sk-hidden--visually {border: 0;clip: rect(1px 1px 1px 1px);clip: rect(1px, 1px, 1px, 1px);height: 1px;margin: -1px;overflow: hidden;padding: 0;position: absolute;width: 1px;}#sk-container-id-14 div.sk-estimator {font-family: monospace;background-color: #f0f8ff;border: 1px dotted black;border-radius: 0.25em;box-sizing: border-box;margin-bottom: 0.5em;}#sk-container-id-14 div.sk-estimator:hover {background-color: #d4ebff;}#sk-container-id-14 div.sk-parallel-item::after {content: "";width: 100%;border-bottom: 1px solid gray;flex-grow: 1;}#sk-container-id-14 div.sk-label:hover label.sk-toggleable__label {background-color: #d4ebff;}#sk-container-id-14 div.sk-serial::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: 0;}#sk-container-id-14 div.sk-serial {display: flex;flex-direction: column;align-items: center;background-color: white;padding-right: 0.2em;padding-left: 0.2em;position: relative;}#sk-container-id-14 div.sk-item {position: relative;z-index: 1;}#sk-container-id-14 div.sk-parallel {display: flex;align-items: stretch;justify-content: center;background-color: white;position: relative;}#sk-container-id-14 div.sk-item::before, #sk-container-id-14 div.sk-parallel-item::before {content: "";position: absolute;border-left: 1px solid gray;box-sizing: border-box;top: 0;bottom: 0;left: 50%;z-index: -1;}#sk-container-id-14 div.sk-parallel-item {display: flex;flex-direction: column;z-index: 1;position: relative;background-color: white;}#sk-container-id-14 div.sk-parallel-item:first-child::after {align-self: flex-end;width: 50%;}#sk-container-id-14 div.sk-parallel-item:last-child::after {align-self: flex-start;width: 50%;}#sk-container-id-14 div.sk-parallel-item:only-child::after {width: 0;}#sk-container-id-14 div.sk-dashed-wrapped {border: 1px dashed gray;margin: 0 0.4em 0.5em 0.4em;box-sizing: border-box;padding-bottom: 0.4em;background-color: white;}#sk-container-id-14 div.sk-label label {font-family: monospace;font-weight: bold;display: inline-block;line-height: 1.2em;}#sk-container-id-14 div.sk-label-container {text-align: center;}#sk-container-id-14 div.sk-container {/* jupyter's `normalize.less` sets `[hidden] { display: none; }` but bootstrap.min.css set `[hidden] { display: none !important; }` so we also need the `!important` here to be able to override the default hidden behavior on the sphinx rendered scikit-learn.org. See: https://github.com/scikit-learn/scikit-learn/issues/21755 */display: inline-block !important;position: relative;}#sk-container-id-14 div.sk-text-repr-fallback {display: none;}</style><div id="sk-container-id-14" class="sk-top-container"><div class="sk-text-repr-fallback"><pre>Pipeline(steps=[(&#x27;preprocessor&#x27;,
                 ColumnTransformer(transformers=[(&#x27;numerical&#x27;,
                                                  Pipeline(steps=[(&#x27;imputer&#x27;,
                                                                   SimpleImputer(strategy=&#x27;median&#x27;)),
                                                                  (&#x27;outliers&#x27;,
                                                                   OutlierRemover()),
                                                                  (&#x27;imbalance&#x27;,
                                                                   RandomOverSamplerTransformer())]),
                                                  [&#x27;apr&#x27;,
                                                   &#x27;contractual_payment_amount&#x27;,
                                                   &#x27;dti&#x27;, &#x27;dti_incl_mortgage&#x27;,
                                                   &#x27;fico_range_high&#x27;,
                                                   &#x27;inquires_6mo&#x27;,
                                                   &#x27;interest_rate_adj&#x27;,
                                                   &#x27;interest_rate_exp&#x27;,...
                               feature_types=None, gamma=None, grow_policy=None,
                               importance_type=None,
                               interaction_constraints=None, learning_rate=None,
                               max_bin=None, max_cat_threshold=None,
                               max_cat_to_onehot=None, max_delta_step=None,
                               max_depth=None, max_leaves=None,
                               min_child_weight=None, missing=nan,
                               monotone_constraints=None, multi_strategy=None,
                               n_estimators=None, n_jobs=None,
                               num_parallel_tree=None, random_state=42, ...))])</pre><b>In a Jupyter environment, please rerun this cell to show the HTML representation or trust the notebook. <br />On GitHub, the HTML representation is unable to render, please try loading this page with nbviewer.org.</b></div><div class="sk-container" hidden><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-52" type="checkbox" ><label for="sk-estimator-id-52" class="sk-toggleable__label sk-toggleable__label-arrow">Pipeline</label><div class="sk-toggleable__content"><pre>Pipeline(steps=[(&#x27;preprocessor&#x27;,
                 ColumnTransformer(transformers=[(&#x27;numerical&#x27;,
                                                  Pipeline(steps=[(&#x27;imputer&#x27;,
                                                                   SimpleImputer(strategy=&#x27;median&#x27;)),
                                                                  (&#x27;outliers&#x27;,
                                                                   OutlierRemover()),
                                                                  (&#x27;imbalance&#x27;,
                                                                   RandomOverSamplerTransformer())]),
                                                  [&#x27;apr&#x27;,
                                                   &#x27;contractual_payment_amount&#x27;,
                                                   &#x27;dti&#x27;, &#x27;dti_incl_mortgage&#x27;,
                                                   &#x27;fico_range_high&#x27;,
                                                   &#x27;inquires_6mo&#x27;,
                                                   &#x27;interest_rate_adj&#x27;,
                                                   &#x27;interest_rate_exp&#x27;,...
                               feature_types=None, gamma=None, grow_policy=None,
                               importance_type=None,
                               interaction_constraints=None, learning_rate=None,
                               max_bin=None, max_cat_threshold=None,
                               max_cat_to_onehot=None, max_delta_step=None,
                               max_depth=None, max_leaves=None,
                               min_child_weight=None, missing=nan,
                               monotone_constraints=None, multi_strategy=None,
                               n_estimators=None, n_jobs=None,
                               num_parallel_tree=None, random_state=42, ...))])</pre></div></div></div><div class="sk-serial"><div class="sk-item sk-dashed-wrapped"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-53" type="checkbox" ><label for="sk-estimator-id-53" class="sk-toggleable__label sk-toggleable__label-arrow">preprocessor: ColumnTransformer</label><div class="sk-toggleable__content"><pre>ColumnTransformer(transformers=[(&#x27;numerical&#x27;,
                                 Pipeline(steps=[(&#x27;imputer&#x27;,
                                                  SimpleImputer(strategy=&#x27;median&#x27;)),
                                                 (&#x27;outliers&#x27;, OutlierRemover()),
                                                 (&#x27;imbalance&#x27;,
                                                  RandomOverSamplerTransformer())]),
                                 [&#x27;apr&#x27;, &#x27;contractual_payment_amount&#x27;, &#x27;dti&#x27;,
                                  &#x27;dti_incl_mortgage&#x27;, &#x27;fico_range_high&#x27;,
                                  &#x27;inquires_6mo&#x27;, &#x27;interest_rate_adj&#x27;,
                                  &#x27;interest_rate_exp&#x27;, &#x27;mo_sin_old_rev_tl_op&#x27;,
                                  &#x27;mo_sin_r...
                                                                             &#x27;D2&#x27;,
                                                                             &#x27;C3&#x27;,
                                                                             &#x27;D1&#x27;,
                                                                             &#x27;B2&#x27;,
                                                                             &#x27;A3&#x27;,
                                                                             &#x27;B1&#x27;,
                                                                             &#x27;AAA&#x27;,
                                                                             &#x27;A2&#x27;,
                                                                             &#x27;C2&#x27;,
                                                                             &#x27;B3&#x27;,
                                                                             &#x27;B4&#x27;,
                                                                             &#x27;A4&#x27;,
                                                                             &#x27;C4&#x27;,
                                                                             &#x27;D4&#x27;,
                                                                             &#x27;E1&#x27;, ...],
                                                                            [&#x27;OR&#x27;,
                                                                             &#x27;NY&#x27;,
                                                                             &#x27;CA&#x27;,
                                                                             &#x27;GA&#x27;,
                                                                             &#x27;TX&#x27;,
                                                                             &#x27;MN&#x27;,
                                                                             &#x27;IN&#x27;,
                                                                             &#x27;TN&#x27;,
                                                                             &#x27;IL&#x27;,
                                                                             &#x27;PA&#x27;,
                                                                             &#x27;KY&#x27;,
                                                                             &#x27;NV&#x27;,
                                                                             &#x27;UT&#x27;,
                                                                             &#x27;NJ&#x27;,
                                                                             &#x27;CT&#x27;,
                                                                             &#x27;OH&#x27;,
                                                                             &#x27;FL&#x27;,
                                                                             &#x27;AL&#x27;,
                                                                             &#x27;AZ&#x27;,
                                                                             &#x27;MI&#x27;,
                                                                             &#x27;NM&#x27;,
                                                                             &#x27;ME&#x27;,
                                                                             &#x27;NC&#x27;,
                                                                             &#x27;VA&#x27;,
                                                                             &#x27;MA&#x27;,
                                                                             &#x27;OK&#x27;,
                                                                             &#x27;NE&#x27;,
                                                                             &#x27;WA&#x27;,
                                                                             &#x27;SC&#x27;,
                                                                             &#x27;WI&#x27;, ...]],
                                                                drop=&#x27;first&#x27;,
                                                                sparse=False)),
                                                 (&#x27;imbalance&#x27;,
                                                  RandomOverSamplerTransformer())]),
                                 [&#x27;current_rating&#x27;, &#x27;region_or_state&#x27;])])</pre></div></div></div><div class="sk-parallel"><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-54" type="checkbox" ><label for="sk-estimator-id-54" class="sk-toggleable__label sk-toggleable__label-arrow">numerical</label><div class="sk-toggleable__content"><pre>[&#x27;apr&#x27;, &#x27;contractual_payment_amount&#x27;, &#x27;dti&#x27;, &#x27;dti_incl_mortgage&#x27;, &#x27;fico_range_high&#x27;, &#x27;inquires_6mo&#x27;, &#x27;interest_rate_adj&#x27;, &#x27;interest_rate_exp&#x27;, &#x27;mo_sin_old_rev_tl_op&#x27;, &#x27;mo_sin_rcnt_rev_tl_op&#x27;, &#x27;months_since_credit_inquiry&#x27;, &#x27;months_since_recent_bankcard_acc_open&#x27;, &#x27;num_accounts_open_12m&#x27;, &#x27;num_bankcards&#x27;, &#x27;num_bankcards_good_standing&#x27;, &#x27;num_delinq_2years&#x27;, &#x27;num_mortgage_accounts&#x27;, &#x27;num_open_accounts&#x27;, &#x27;num_public_records&#x27;, &#x27;original_contractual_due_day&#x27;, &#x27;original_principal_balance&#x27;, &#x27;outstanding_principal_balance&#x27;, &#x27;pct_trades_never_delinquent&#x27;, &#x27;percent_bc_gt_75&#x27;, &#x27;primary_income&#x27;, &#x27;purchase_interest&#x27;, &#x27;purchase_price&#x27;, &#x27;recovery_amount&#x27;, &#x27;recovery_collection_fee&#x27;, &#x27;remaining_term&#x27;, &#x27;revolving_utilization&#x27;, &#x27;term&#x27;, &#x27;tot_accounts&#x27;, &#x27;tot_cred_bal_ex_mort&#x27;, &#x27;tot_cred_rev_bal&#x27;, &#x27;total_public_records_bankruptcy&#x27;, &#x27;accrued_interest&#x27;, &#x27;Month_on_book&#x27;, &#x27;dff&#x27;, &#x27;cpi&#x27;, &#x27;unrate&#x27;]</pre></div></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-55" type="checkbox" ><label for="sk-estimator-id-55" class="sk-toggleable__label sk-toggleable__label-arrow">SimpleImputer</label><div class="sk-toggleable__content"><pre>SimpleImputer(strategy=&#x27;median&#x27;)</pre></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-56" type="checkbox" ><label for="sk-estimator-id-56" class="sk-toggleable__label sk-toggleable__label-arrow">OutlierRemover</label><div class="sk-toggleable__content"><pre>OutlierRemover()</pre></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-57" type="checkbox" ><label for="sk-estimator-id-57" class="sk-toggleable__label sk-toggleable__label-arrow">RandomOverSamplerTransformer</label><div class="sk-toggleable__content"><pre>RandomOverSamplerTransformer()</pre></div></div></div></div></div></div></div></div><div class="sk-parallel-item"><div class="sk-item"><div class="sk-label-container"><div class="sk-label sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-58" type="checkbox" ><label for="sk-estimator-id-58" class="sk-toggleable__label sk-toggleable__label-arrow">categorical</label><div class="sk-toggleable__content"><pre>[&#x27;current_rating&#x27;, &#x27;region_or_state&#x27;]</pre></div></div></div><div class="sk-serial"><div class="sk-item"><div class="sk-serial"><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-59" type="checkbox" ><label for="sk-estimator-id-59" class="sk-toggleable__label sk-toggleable__label-arrow">SimpleImputer</label><div class="sk-toggleable__content"><pre>SimpleImputer(strategy=&#x27;most_frequent&#x27;)</pre></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-60" type="checkbox" ><label for="sk-estimator-id-60" class="sk-toggleable__label sk-toggleable__label-arrow">OneHotEncoder</label><div class="sk-toggleable__content"><pre>OneHotEncoder(categories=[[&#x27;E&#x27;, &#x27;P3&#x27;, &#x27;NEAR_PRIME&#x27;, &#x27;P4&#x27;, &#x27;D&#x27;, &#x27;P2&#x27;, &#x27;P1&#x27;, &#x27;A&#x27;,
                           &#x27;PRIME&#x27;, &#x27;C&#x27;, &#x27;B&#x27;, &#x27;AA&#x27;, &#x27;HR&#x27;, &#x27;F&#x27;, &#x27;C1&#x27;, &#x27;D2&#x27;, &#x27;C3&#x27;,
                           &#x27;D1&#x27;, &#x27;B2&#x27;, &#x27;A3&#x27;, &#x27;B1&#x27;, &#x27;AAA&#x27;, &#x27;A2&#x27;, &#x27;C2&#x27;, &#x27;B3&#x27;,
                           &#x27;B4&#x27;, &#x27;A4&#x27;, &#x27;C4&#x27;, &#x27;D4&#x27;, &#x27;E1&#x27;, ...],
                          [&#x27;OR&#x27;, &#x27;NY&#x27;, &#x27;CA&#x27;, &#x27;GA&#x27;, &#x27;TX&#x27;, &#x27;MN&#x27;, &#x27;IN&#x27;, &#x27;TN&#x27;, &#x27;IL&#x27;,
                           &#x27;PA&#x27;, &#x27;KY&#x27;, &#x27;NV&#x27;, &#x27;UT&#x27;, &#x27;NJ&#x27;, &#x27;CT&#x27;, &#x27;OH&#x27;, &#x27;FL&#x27;, &#x27;AL&#x27;,
                           &#x27;AZ&#x27;, &#x27;MI&#x27;, &#x27;NM&#x27;, &#x27;ME&#x27;, &#x27;NC&#x27;, &#x27;VA&#x27;, &#x27;MA&#x27;, &#x27;OK&#x27;, &#x27;NE&#x27;,
                           &#x27;WA&#x27;, &#x27;SC&#x27;, &#x27;WI&#x27;, ...]],
              drop=&#x27;first&#x27;, sparse=False)</pre></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-61" type="checkbox" ><label for="sk-estimator-id-61" class="sk-toggleable__label sk-toggleable__label-arrow">RandomOverSamplerTransformer</label><div class="sk-toggleable__content"><pre>RandomOverSamplerTransformer()</pre></div></div></div></div></div></div></div></div></div></div><div class="sk-item"><div class="sk-estimator sk-toggleable"><input class="sk-toggleable__control sk-hidden--visually" id="sk-estimator-id-62" type="checkbox" ><label for="sk-estimator-id-62" class="sk-toggleable__label sk-toggleable__label-arrow">XGBClassifier</label><div class="sk-toggleable__content"><pre>XGBClassifier(base_score=None, booster=None, callbacks=None,
              colsample_bylevel=None, colsample_bynode=None,
              colsample_bytree=None, device=None, early_stopping_rounds=None,
              enable_categorical=False, eval_metric=None, feature_types=None,
              gamma=None, grow_policy=None, importance_type=None,
              interaction_constraints=None, learning_rate=None, max_bin=None,
              max_cat_threshold=None, max_cat_to_onehot=None,
              max_delta_step=None, max_depth=None, max_leaves=None,
              min_child_weight=None, missing=nan, monotone_constraints=None,
              multi_strategy=None, n_estimators=None, n_jobs=None,
              num_parallel_tree=None, random_state=42, ...)</pre></div></div></div></div></div></div></div>



9. Evaluate the performance of the entire Pipeline:


```python
accuracy = accuracy_score(y_test, xgb_pipeline.predict(X_test))
roc_score = roc_auc_score(y_test, xgb_pipeline.predict(X_test))
precision = precision_score(y_test, xgb_pipeline.predict(X_test), average='macro')
recall = recall_score(y_test, xgb_pipeline.predict(X_test), average='macro')
f1 = f1_score(y_test, xgb_pipeline.predict(X_test), average='macro')
kappa = specificity_score(y_test, xgb_pipeline.predict(X_test))
print("Accuracy:", accuracy)
print("ROC Score:", roc_score)
print("Precision:", precision)
print("Recall:", recall)
print("F1-Score:", f1)
print("Specificity Score", kappa)
```

    Accuracy: 0.9879409659980587
    ROC Score: 0.7454754896745986
    Precision: 0.9089346816804076
    Recall: 0.7454754896745985
    F1-Score: 0.8059584316331239
    Specificity Score 0.997932719413644


### How it works...
- In Step 1, we imported the required libraries. The list can look a bit daunting, but that is due to the fact that we need to combine multiple functions/classes used in the previous recipes.
- In Step 2, we loaded the data from a CSV file, separated the target variable and created the stratified train-test split. 
- Next, we also created two lists containing the names of the numerical/categorical features—we will apply different transformations depending on the type of the feature. To select the appropriate columns, we used the select_dtypes method.
- In Step 4, we started preparing the separate Pipelines. For the numerical one, we only wanted to impute the missing values of the features using the column median. For the Pipeline, we provided a list of tuples containing the steps, each of the tuples containing the name of the step (for easier identification) and the class we wanted to use, in this case, it was the SimpleImputer.
- In Step 5, we prepared a similar Pipeline for categorical features. This time, however, we chained two different operations—the imputer (using the most frequent value), and the one-hot encoder. For the encoder, we also specified a list of lists called cat_list, in which we listed all the possible categories, based on X_train. We did so mostly for the sake of the next recipe, in which we introduce cross-validation, and it can happen that some of the random draws will not contain all the categories.
- In Step 6, we defined the ColumnTransformer object, which we used to manipulate the data in the columns. Again, we passed a list of tuples, where each tuple contained a name, one of the Pipelines we defined before, and a list of columns to which the transformations should be applied. We also specified remainder='drop', to drop any extra columns to which no transformations were applied. In this case, the transformations were applied to all features, so no columns were dropped.
- In Step 7, we once again used Pipeline to chain the preprocessor (the previously defined ColumnTransformer object) with the decision tree classifier (for comparability, we set the random state to 42). 
- The last two steps involved fitting the entire Pipeline to the data and using the custom function to measure the performance of the model.

### There's more..
- In this recipe, we showed how to create the entire pipeline for a data science project. However, there are many other transformations we can apply to data as preprocessing steps. Some of them include:
    - Scaling numerical features: In other words, changing the range of the features due to the fact that different features are measured on different scales; and this can introduce bias to the model. We should mostly be concerned with feature scaling when dealing with models that calculate some kind of distance between features (such as K-Nearest Neighbors). In general, methods based on decision trees do not require any scaling. Some popular options from scikit-learn include StandardScaler and MinMaxScaler.
    - Discretizing continuous variables: We can transform a continuous variable (such as age) into a finite number of bins (such as below 25, between 25 and 50, and older than 50). When we want to create specific bins, we can use the pd.cut function, while pd.qcut is used for splitting based on quantiles.

- We designed the class similarly to the ones in scikit-learn, meaning we can train it on the training set, and only use the transformation on the test set.
- In the __init__ method, we stored the number of standard deviations that determines whether observations will be treated as outliers (the default is 3). In the fit method, we stored the upper and lower thresholds for being considered an outlier, as well as the number of features in general. In the transform method, we capped all the values, according to the 3σ symbol rule.
- One known limitation of this class is that it does not handle missing values. That is why we raise a ValueError when there are any missing values. In the Pipeline, we use the OutlierRemover after the imputation in order to avoid the issue. We could, of course, account for the missing values in the transformer, however, this would make the code longer and less readable. Please refer to the definition of SimpleImputer in scikit-learn for an example of how to mask missing values while building transformers.

# 10. Using model to predict probability of default of active loans

- When we've already trained model, we use this model to predict probability of default of active loans

### How to do it...
