function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Edit the keys to capture more detailed information and print each value
    PANEL.append("h6").text(`SUBJECT ID: ${result.id}`);
    PANEL.append("h6").text(`ETHNICITY: ${result.ethnicity}`);
    PANEL.append("h6").text(`GENDER: ${result.gender}`);
    PANEL.append("h6").text(`AGE: ${result.age}`);
    PANEL.append("h6").text(`LOCATION: ${result.location}`);
    PANEL.append("h6").text(`BELLY BUTTON TYPE: ${result.bbtype}`);
    PANEL.append("h6").text(`WASH FREQUENCY: ${result.wfreq}`);

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    let samples = data.samples
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    let result = resultArray[0];
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10).reverse().map((id)=> "OTU "+ id);
    var xvals = sample_values.slice(0,10).reverse();
    var labels = otu_labels.slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: xvals,
      y: yticks,
      text: labels,
      orientation: "h",
      type:"bar"
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacterial Species Found</b>",
      xaxis: {title: "Number of Sequences Observed"},
      yaxis: {title: "Operational Taxonomic Unit"}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        color: otu_ids,
        size: sample_values,
        sizeref: 0.2,
        sizemode: "area"
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Relative Abundance of Bacterial Species</b>",
      showlegend: false,
      xaxis: {title: "Operational Taxonomic Unit (OTU)"},
      yaxis: {title: "Number of Sequences Observed"},
      height: 800,
      width: 1150
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // 4. Create a variable that holds the washing frequency.
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var filteredMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    var metaResult = filteredMetadata[0];
    var wfreqint = metaResult.wfreq
    var wfreq = parseFloat(wfreqint).toFixed(2);

    // 5. Create the trace for the gauge chart.
    var gaugeData = [
    	{
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: ""},
        title: { text: "<b>Belly Button Wash Frequency</b><br>Scrubs per Week</br>" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] }, 
          bar: { color: "black" },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" },

          ],
        }
      } 
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 450,
      height: 450,
      margin: { t: 0, b: 0 },
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  
  });
}
