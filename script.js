document.addEventListener('DOMContentLoaded',function(){
    req=new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json',true);
    req.send();
    req.onload=function(){

      const dataset=JSON.parse(req.responseText);
      const bestTime = new Date(2017,0,1,0,0,dataset[0].Seconds);
      const w = 800;
      const h = 450;
      const padding = 60;
      minTime = new Date(2017,0,1,0,0,d3.min(dataset, (d) => d.Seconds));
      maxTime = new Date(2017,0,1,0,0,d3.max(dataset, (d) => d.Seconds+10));




      const xScale = d3.scaleTime()
                   .domain([minTime-bestTime, maxTime-bestTime])
                   .range([w - padding, padding]);
      const yScale = d3.scaleLinear()
                   .domain([dataset.length+1, 1])
                   .range([h-padding, padding]);
      const svg = d3.select("div")
                .append("svg")
                .attr("width", w+padding)
                .attr("height", h);

            svg.selectAll("circle")
                 .data(dataset)
                 .enter()
                 .append("circle")
                 .attr("cx", (d, i) => {
                    let t=new Date(2017,0,1,0,0,d.Seconds);
                   return xScale(t-bestTime);
                 })
                 .attr("cy", (d, i) => yScale(d.Place))
                 .attr("r", 4)
                 .attr("class", (d) => {
                   if(d.Doping) {
                     return "positive";
                   } else {
                     return "negative";
                   }
                 })
                 .append("title")
                 .text((d) => d.Name + ", Country: " + d.Nationality + ", Year: " + d.Year + ", Time: " + d.Time + ", Doping: " + d.Doping);

              svg.selectAll("text")
                 .data(dataset)
                 .enter()
                 .append("text")
                 .attr("x", (d) => {
                     let t=new Date(2017,0,1,0,0,d.Seconds);
                   return xScale(t-bestTime)+10;
                 })
                 .attr("y", (d) => yScale(d.Place)+5)
                 .text((d) => d.Name);


      const formatCount = d3.format(",.0f");
      const formatTime= d3.timeFormat("%M:%S");
      const formatMinutes = function(d) {


            return formatTime(xScale(d));
          };
const xAxis = d3.axisBottom(xScale).tickFormat(formatTime);

      svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);
      svg.append('g')
        .attr('transform', 'translate(' + w/2 + ', ' + (h-25) + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr("class", "axislabel")
        .text('Minutes behind fastest time');
      const yAxis = d3.axisLeft(yScale);
      svg.append("g")
        .attr("transform", "translate(0" + padding + ")")
        .call(yAxis);
      svg.append('g')
        .attr('transform', 'translate(' + 30 + ', ' + h/2 + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .attr("class", "axislabel")
        .text('Ranking');
   };
});
