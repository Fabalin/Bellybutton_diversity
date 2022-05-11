# Bellybutton_diversity
Using Javascript and Plotly to create an interactive webpage for data visualization. 

## Overview
To visualize a dataset containing 661 subjects' belly button microbiome diversity, Plotly integration in Javascript was used to create an interactive webpage. The data consists of NGS sequence data that has been taxonomically assigned using sequence simialrity threshold of 97%. The data presented includes:
- ID of subject 
- Demographic Data
  - Ethnicity
  - Gender
  - Age
  - Location
  - Belly button type 
  - Belly button wash frequency per week 
- Bar graph of top 10 bacterial species 
- A gauge of wash frequency 
- A scatterplot of the relative abundance of all bacterial species in subject's sample. 

HTML5 and CSS styling with Bootstrap 3 were used to build the webpage. Additioanlly, the datapoints in scatter plot displaying relative abundance has been normalized to facilitate ease of viewing samples containing low relative abundance. This was done since the area of each datapoint scales with the sample's values which range between 200 to 2.  

## Software
- JavaScript - ES6
- HTML5
- CSS - 2.1
- Bootstrap - 3.7
- Plotly - V2
- D3 - 7.4.4

## Results Showcase: 
![page1](https://github.com/Fabalin/Bellybutton_diversity/blob/main/Resources/page_1.PNG)
![page2](https://github.com/Fabalin/Bellybutton_diversity/blob/main/Resources/pg_2.PNG)
![page3](https://github.com/Fabalin/Bellybutton_diversity/blob/main/Resources/pg_3.PNG)
